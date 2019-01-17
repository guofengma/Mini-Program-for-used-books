
var model = require('../../utils/model')
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var app = getApp()
Page({
  data: {
    userInfo: {
      nickName: '',
      avatarUrl: '',
    },
    logged: false,
    real: false
  },
  onReady(options) {
    this.setData({
      userInfo: {
        nickName: app.userInfo.nickName,
        avatarUrl: app.userInfo.avatarUrl
      },
      logged: app.logged
    })
    console.log(app.userInfo)
  },
  onShow() {
    var that = this
    wx.getStorage({
      key: 'realData',
      success: function (res) {
        if (res.data) {
          that.setData({
            real: res.data.real
          })
        }
        console.log('成功获取realData:', res.data)
      },
      fail(err) {
        console.log('获取realData失败：', err.errMsg)
      }
    })
  },

  // 用户登录
  doLogin() {
    var that = this;
    model.showBusy('正在登录');
    // 登录
    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      success(result) {
        model.showSuccess('登录成功')
        result = result.data.data
        that.setData({
          userInfo: {
            nickName: result.nickName,
            avatarUrl: result.avatarUrl
          },
          logged: true
        })
        app.userInfo.nickName = result.nickName
        app.userInfo.avatarUrl = result.avatarUrl
        app.userInfo.openId = result.openId
        app.logged = true
        console.log('登录成功', result);
        console.log(result.nickName, result.avatarUrl, result.openId)
      },
      fail(error) {
        model.showModel('登录失败', error.message)
        console.log('登录失败', error)
      }
    })
    // auth授权
    wx.setStorage({
      key: 'auth',
      data: 'true',
      success: function (res) {
        console.log('auth授权成功，auth值为true')
      },
      fail: function (err) {
        console.log('auth授权失败，原因：', err.errMsg)
      }
    })
  },

  // 授权认证
  doReal() {
    wx.navigateTo({
      url: '../real/real',
      success: function (res) {
        console.log('跳转到real页面成功，返回值为：', res)
      },
      fail: function () {
        console.log('跳转到real页面失败')
      }
    })
    console.log('身份认证')
  },

  // 点击跳转到详细页面
  toDetailPage(e) {
    let dataset = e.target.dataset // {title: 'publish'}
    let title = dataset.title
    let url = `../operate/operate?title=${title}`
    wx.navigateTo({
      url: url,
      success: function (res) {
        console.log('navigateTo跳转成功', res)
      },
      fail: function (err) {
        console.log('navigateTo跳转失败', err.errMsg)
      }
    })
    console.log('跳转到详细页面', dataset)
  },

  // 问题反馈
  problem() {
    // wx.navigateTo({
    //   url: '../problem/problem',
    //   success: function (res) {
    //     console.log('navigateTo跳转成功', res)
    //   },
    //   fail: function (err) {
    //     console.log('navigateTo跳转失败', err.errMsg)
    //   }
    // })
  },

  // 关于about
  about() {
    wx.navigateTo({
      url: '../about/about',
      success: function (res) {
        console.log('navigateTo跳转成功', res)
      },
      fail: function (err) {
        console.log('navigateTo跳转失败', err.errMsg)
      }
    })
  }
})
