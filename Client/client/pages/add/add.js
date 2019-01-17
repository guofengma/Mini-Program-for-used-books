

var model = require('../../utils/model')
var config = require('../../config');
var app = getApp()

Page({
  data: {
    imageSrc: '../../image/initImage.png',
    cover: '',
    mode: 'aspectFill',
    priceTab: 1,
    pickerIndex: 0,
    pickerArray: ['大一教材', '大二教材', '大三教材', '大四教材', '非教材'],
    typeIndex: 0,
    typeArray: ['理工类', '人文社科类', '杂志', '小说', '经管类', '全部类别'],
    campusIndex:0,
    campusArray: ['东校区', '南校区', '北校区', '珠海校区', '深圳校区', '全校'],
    college: '0',
    wechat: '',
    testnum:''
  },
  onShow(options) {
    var that = this
    wx.getStorage({
      key: 'realData',
      success: function (res) {
        that.setData({
          college: res.data.college,
          wechat: res.data.wechat
        })
      },
      fail: function (err) {
        // college没有的话，提醒用户先实名认证
        model.showModel('未认证', '发布图书前，请先到个人中心进行实名认证')
        console.log(err.errMsg)
      }
    })
  },
  // 表单提交
  formSubmit(e) {
    model.showBusy('正在发布')
    var that = this
    var formData = e.detail.value
    // 数据校验。原则：不能为空
    if (formData.title === '') {
      model.showModel('', '请填写标题')
      return
    } else if (formData.description === '') {
      model.showModel('', '请填写描述')
      return
    } else if (that.data.cover === '') {
      model.showModel('', '请上传封面')
      return
    }
    
    // formData数据的完善
    formData['campus'] = that.data.campusArray[that.data.campusIndex] // 学院
    formData['wechat'] = that.data.wechat // 微信号
    formData['cover'] = that.data.cover // 封面
    //formData['author'] = app.userInfo.openId // 作者
    formData['name'] = app.userInfo.nickName // 昵称
    formData['avatarUrl'] = app.userInfo.avatarUrl // 头像
    formData['buyer'] = 'null'
    formData['confirm'] = '0'
    formData['done'] = '0'
    formData['grade'] = that.data.pickerArray[that.data.pickerIndex]
    formData['type'] = that.data.typeArray[that.data.typeIndex]

    // 表单提交
    //wx.cloud.init()
    const testDB = wx.cloud.database({
      env: 'test-0c6ee6'
    })
    testDB.collection('cBook').add({
      // data 字段表示需新增的 JSON 数据
      data: formData,
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })

    wx.request({
      url: config.service.addBookUrl,
      method: 'GET',
      data: formData,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        model.showSuccess('发布成功')
        console.log('res', res.data)
        setTimeout(() => {
          wx.navigateTo({
            url: "../operate/operate?title=publish",
            success(res) {
              console.log('跳转到发布界面', res)
            },
            fail(err) {
              console.log('跳转到发布界面失败', err.errMsg)
            }
          })
        }, 1000)
      },
      fail(err) {
        model.showModel('发布失败', err.errMsg)
        console.log('error', err)
      }
    })
    console.log('form发生了submit事件，携带数据为：', formData)
  },
  // 光标事件
  inputFocus(e) {
    console.log('inputFocus')
  },
  inputBlur(e) {
    console.log('inputBlur')
  },
  // 图片选择：可以当场拍照
  chooseImage(e) {
    var that = this
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        that.setData({
          imageSrc: res.tempFilePaths[0],
          mode: 'aspectFit'
        })
        console.log('选择图片的res', res.tempFilePaths[0])
        const filePath = res.tempFilePaths[0]
        const cloudPath = 'my-image1' + filePath.match(/\.[^.]+?$/)[0]
        // 图片上传到服务器
        wx.cloud.init()
        wx.cloud.uploadFile({
          cloudPath, // 上传至云端的路径
          filePath, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
          },
          fail: console.error
        })
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: res.tempFilePaths[0],
          name: 'file',
          // header: {}, // 设置请求的 header
          // formData: {}, // HTTP 请求中其他额外的 form data
          success: function (res) {
            res = JSON.parse(res.data)
            console.log('图片上传成功', res)
            if (res.data) {
              that.setData({
                cover: res.data.imgUrl
              })
            } else {
              that.setData({
                cover: 'https://7465-test-0c6ee6-1258250998.tcb.qcloud.la/upload.jpg?sign=476620102d1e4a11d26ebe754737e9ff&t=1547637977'
              })
            }
          },
          fail: function (err) {
            console.log('图片上传失败', err.errMsg)
          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  // 价格的切换
  choosePrice(e) {
    var targetTab = parseInt(e.target.dataset.current)
    if (this.data.priceTab === targetTab) {
      return false
    } else {
      this.setData({
        priceTab: targetTab
      })
    }
  },
  // 书单选择
  choosePicker(e) {
    this.setData({
      pickerIndex: e.detail.value,
    })
  },
  choosePicker1(e) {
    this.setData({      
      typeIndex: e.detail.value
    })
  },
  choosePicker2(e){
    this.setData(
      {
        campusIndex:e.detail.value
      }
    )
  }
})
