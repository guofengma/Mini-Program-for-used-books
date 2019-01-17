/**
 * @description 书籍具体信息
 */

var model = require('../../utils/model')
var config = require('../../config');
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {
    
    },
    collegeArray: ['东校区', '南校区', '北校区', '珠海校区', '深圳校区'],
    contactOrNot: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.detail)
    let detail = options.detail // 书籍具体信息
    wx.getStorage({//获取本地缓存
      key: "data",
      success: function (res) {
        that.setData({
          detail: res.data })
    },
    })
    console.log('这里是书籍信息页面, 得到的detail值为：', detail)
    
  },
  // 联系卖家
  contact() {
    var contactOrNot = !this.data.contactOrNot
    this.setData({
      contactOrNot: contactOrNot
    })
  },
  // 预定图书
  buy() {
    // 表单提交，预定图书
    var that = this
    var formData = that.data.detail
    console.log(formData)
    if (that.data.detail.confirm !== '0') return false
    formData['confirm'] = '1'
    formData['buyer'] = app.userInfo.nickName
    delete formData['_openid']
    wx.cloud.init()
    const testDB = wx.cloud.database({
      env: 'test-0c6ee6'
    })
    const data = formData
    console.log(data)
    testDB.collection('cOrder').add({
      // data 字段表示需新增的 JSON 数据
      data,
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      },
      fail (err) {
        console.log(err)
      }
    })
    wx.request({
      url: config.service.updateBookUrl,
      method: 'GET',
      data: formData,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        model.showModel('预定成功', '请尽快联系卖家进行线下交易')
        that.setData({
          detail: formData
        })
        console.log('res', res.data)
      },
      fail: function (err) {
        model.showModel('预定失败', err.errMsg)
        console.log('error', err)
      }
    })
  }
})
