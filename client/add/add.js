var model = require('../../utils/model')
var config = require('../../config');
var app = getApp()

Page({
  data: {
    imageSrc: '../../utils/initImage.png',
    cover: '',
    mode: 'aspectFill',
    priceTab: 1,
    pickerIndex: 0,
    pickerArray: ['大一教材', '大二教材', '大三教材', '大四教材', '非教材'],
    college: '0',
    collegeArray: ['电气信息学院', '国际商学院', '翻译学院', '人文学院'],
    wechat: ''
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
    formData['college'] = that.data.college // 学院
    formData['wechat'] = that.data.wechat // 微信号
    formData['cover'] = that.data.cover // 封面
    formData['author'] = app.userInfo.openId // 作者
    formData['nickName'] = app.userInfo.nickName // 昵称
    formData['avatarUrl'] = app.userInfo.avatarUrl // 头像
    // 表单提交
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
        // 图片上传到服务器
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
                cover: "https://wximg-1256448206.cos.cn-south.myqcloud.com/1526466145788-r19vUYFRz.jpg"
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
      pickerIndex: e.detail.value
    })
  }
})
