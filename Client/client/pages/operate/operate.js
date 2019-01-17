/**
 * @description 图书操作页面
 */

var model = require('../../utils/model')
var config = require('../../config');
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'order',
    naviTitle: '订单',
    allBook: []
  },

  /**
   * 生命周期函数--监听页面加载
   * options = {title: 'publish'}
   */
  onLoad: function (options) {
    var that = this
    var title = options.title
    this.setData({
      title: title
    })

    if (title === 'publish') {
      this.setData({
        naviTitle: '我发布的'
      })
    } else if (title === 'sale') {
      this.setData({
        naviTitle: '我卖出的'
      })
    } else if (title === 'buyer') {
      this.setData({
        naviTitle: '我买到的'
      })
    } 

    // 设置标题
    wx.setNavigationBarTitle({
      title: that.data.naviTitle,
      success: function (res) {
        console.log('navi标题设置成功', res)
      },
      fail: function (err) {
        console.log('navi标题设置失败', err.errMsg)
      }
    })
    console.log('页面加载时onLoad，query值', options)


    wx.cloud.init()
    const testDB = wx.cloud.database({
      env: 'test-0c6ee6'
    })
    testDB.collection('cBook').get({
      success(res) {
        // res.data 包含该记录的数据
        console.log('查询成功：', res.data)
        console.log('查询成功：', app.userInfo.openId)
        console.log('查询成功：', that.data.title)
        console.log('查询成功：', res.data[1])
        console.log('查询成功：', res.data[1].confirm)
        var temp = res.data // 原始书籍
        var allBook = [] // 非预定的书籍
        
        temp.forEach(val => {
          if ((that.data.title === 'publish' && val._openid === app.userInfo.openId && val.confirm === '0') || (that.data.title === 'sale' && val._openid === app.userInfo.openId && val.confirm === '1' && val.done == '1') || (that.data.title === 'buy' && val._openid === app.userInfo.openId) ) {
            allBook.push(val)
            console.log('查询成功：', val)
          }
        })
        that.allBook = allBook // 为了检索
        that.setData({
          allBook: allBook,
        })
        if (options.refresh) {
          model.showSuccess('刷新成功')
          wx.stopPullDownRefresh()
        }
        console.log('allBook数据获取成功，只留下非预定图书', allBook)
      },
      fail(res) {
        wx.showToast({
          title: '查询失败',
        })
        console.log('查询失败：', res)
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
