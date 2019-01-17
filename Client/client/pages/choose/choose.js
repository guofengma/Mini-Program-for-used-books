// pages/choose/choose.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    allStore: [{
      
    }]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllStore({
      refresh: false
    })
  },
  getAllStore(options) {
    var that = this
    if (options.refresh) {
      model.showBusy('正在刷新')
    }
    wx.cloud.init()
    const testDB = wx.cloud.database({
      env: 'test-0c6ee6'
    })
    testDB.collection('cStore').get({
      success(res) {
        // res.data 包含该记录的数据
        console.log('查询成功：', res.data)
        var allStore = res.data 
        that.allStore = allStore // 为了检索
        that.setData({
          allStore: allStore,
        })
        if (options.refresh) {
          model.showSuccess('刷新成功')
          wx.stopPullDownRefresh()
        }
      },
      fail(res) {
        wx.showToast({
          title: '查询失败',
        })
        console.log('查询失败：', res)
      }
    })
  },
  golist: function () {
    wx.setStorageSync('openid', 'all')
    wx.navigateTo({
      url: '../home/home'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 到达详情页
  toStore(e) {
    let id = e.target.dataset.id;
    var detail = this.data.allStore[id].openId;

    wx.setStorageSync('openid', detail)

    console.log('跳转到书籍详情页，成功', detail)
    //let url = `../bookDetail/bookDetail?detail=${detail}`
    let url = `../home/home`
    wx.navigateTo({
      url: url,
      success(res) {
        console.log('跳转到书籍详情页，成功', res)
      },
      fail(err) {
        console.log('跳转到书籍详情页，失败', err.errMsg)
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