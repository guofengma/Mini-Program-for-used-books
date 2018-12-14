/**
 * @description 实名认证页面
 */
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
    // 认证与否
    real: false,
    // 输入的信息
    realName: '',
    college: '0',
    major: '',
    phone: '',
    wechat: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 判断是否已经进行过认证，并获取认证信息
    wx.getStorage({
      key: 'realData',
      success: function (res) {
        if (res.data) {
          that.setData({
            real: res.data.real,
            realName: res.data.realName,
            college: res.data.college,
            major: res.data.major,
            phone: res.data.phone,
            wechat: res.data.wechat
          })
        }
        console.log('获取realData值成功，值为：', res.data)
      },
      fail: function (err) {
        console.log('获取realData值失败，理由：', err.errMsg)
      }
    })
  },
  onShow: function () {
    this.setData({
      userInfo: {
        nickName: app.userInfo.nickName,
        avatarUrl: app.userInfo.avatarUrl
      },
      logged: app.logged
    })
    console.log('登录初始化', app.userInfo)
  },
  // 表单提交
  formSubmit(e) {
    model.showBusy('正在提交')
    var that = this
    // 姓名和专业是否为空
    var realName = that.data.realName
    var major = that.data.major
    var wechat = that.data.wechat
    if (realName === '') {
      model.showModel('', '请输入你的姓名')
      return false
    }
    if (major === '') {
      model.showModel('', '请输入你的专业')
      return false
    }
    if (wechat === '') {
      model.showModel('', '请输入你的微信号')
      return false
    }
    // 电话号码校验
    var phoneNumber = that.data.phone
    var reg = /^((1[3-8][0-9])+\d{8})$/;
    if (!reg.test(phoneNumber)) {
      model.showModel('', '请输入正确的手机号码')
      return false
    }
    // 要保存的数据
    var formData = {
      real: true,
      realName: that.data.realName,
      college: that.data.college,
      major: that.data.major,
      phone: that.data.phone,
      wechat: that.data.wechat
    }
    // 保存到storage
    wx.setStorage({
      key: 'realData',
      data: formData,
      success(res) {
        console.log('认证成功')
        model.showSuccess('认证成功')
        that.setData({
          real: true
        })
      },
      fail(err) {
        console.log('认证失败：', err.errMsg)
        model.showModel('认证失败：', err.errMsg)
      }
    })
  },
  // 子组件向父组件通信
  valueChange(e) {
    var that = this
    var detail = e.detail
    if (detail.name === 'realName') {
      that.setData({
        realName: detail.value
      })
    } else if (detail.name === 'phone') {
      that.setData({
        phone: detail.value
      })
    } else if (detail.name === 'major') {
      that.setData({
        major: detail.value
      })
    } else if (detail.name === 'wechat') {
      that.setData({
        wechat: detail.value
      })
    }
    console.log('子组件向父组件通信，得到的e.detail值', e.detail)
  },
  // 子组件向父组件通信
  pickerChange(e) {
    var that = this
    var detail = e.detail
    if (detail.name === 'college') {
      that.setData({
        college: detail.value
      })
      console.log('子组件向父组件通信，得到的college值', e.detail)
    }
  }
})
