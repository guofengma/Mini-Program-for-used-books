// pages/list/list.js
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
   */
  onLoad: function (options) {
    var that = this
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
    testDB.collection('cOrder').get({
      success(res) {
        // res.data 包含该记录的数据
        var temp = res.data // 原始书籍
        var allBook = [] // 非预定的书籍
        temp.forEach(val => {
          if ((that.data.title === 'order' && val._openid === app.userInfo.openId && val.confirm === '1' && val.done == '0')) {
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
  toDetailPage(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认完成订单吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.cloud.init()
          const testDB = wx.cloud.database({
            env: 'test-0c6ee6'
          })
          let id = e.target.dataset.id
          let detail = that.data.allBook[id]
          console.log(detail._id)
          testDB.collection('cBook').doc(detail._id). update({
            // data 传入需要局部更新的数据
            data: {
              // 表示将 done 字段置为 true
              done: '1'
            },
            success(res) {
              console.log(res.data)
            },
            fail(err){
              console.log(err)
            }
          })
          testDB.collection('cOrder').doc(detail._id).remove({
            success(res) {
              console.log(res.data)
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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