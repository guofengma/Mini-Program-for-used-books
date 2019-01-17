// pages/first/first.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //轮播图
      imgUrls: [
        '../../image/9.jpg',
        '../../image/8.jpg',
        '../../image/7.png'
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  info:function(){
    wx.navigateTo({
      url: '../real/real'
    })
  },
  release:function(){
    wx.navigateTo({
      url: '../add/add'
    })
  },
  golist: function () {
    wx.navigateTo({
      url: '../choose/choose'
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