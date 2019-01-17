/**
 * @fileOverview 微信小程序的入口文件
 */

var qcloud = require('./vendor/wafer2-client-sdk/index');
var config = require('./config');
var model = require('./utils/model')

App({
  // 用户信息作为全局数据
  userInfo: {
    nickName: '',
    avatarUrl: '',
    openId: '',
    campus:''
  },
  logged: false,
  // 声明周期函数
  onLaunch() {
    qcloud.setLoginUrl(config.service.loginUrl);
  },
  onShow() {
    // 判断是否能进行自登录
    var that = this
    wx.getStorage({
      key: 'auth',
      success: function (res) {
        if (that.userInfo.openId === '' && res.data === 'true') {
          that.doLogin()
          console.log('auth获取成功，auth值为', res.data)
        }
      },
      fail: function (err) {
        model.showModel('请先登录', '到我的界面点击登录')
        console.log('auth获取失败，原因：', err.errMsg)
      }
    })
  },
  // 微信用户登录
  doLogin() {
    var that = this;
    model.showBusy('正在登录');
    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      success(result) {
        model.showSuccess('登录成功')
        result = result.data.data
        that.userInfo.nickName = result.nickName
        that.userInfo.avatarUrl = result.avatarUrl
        if (result.openId) that.userInfo.openId = result.openId
        that.logged = true
        console.log('request登录成功', result);
      },
      fail(error) {
        model.showModel('请求失败', error.message)
        console.log('request fail', error)
      }
    })
  },
});
