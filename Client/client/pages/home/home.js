/**
 * @description 主页模块
 */

var model = require('../../utils/model')
var config = require('../../config');
var app = getApp()

Page({
  data: {
    storeOpenid:'all',
    bookList: '5',
    bookListArray: ['大一教材', '大二教材', '大三教材', '大四教材', '非教材', '不限年级'],
    college: '5',
    collegeArray: ['东校区', '南校区', '北校区', '珠海校区', '深圳校区','全校'],
    type: '5',
    typename: ['理工类', '人文社科类', '杂志', '小说', '经管类', '全部类别'],
    allBook: [
    {
        "id": 3,
        "title": "xss跨站脚本攻击",
        "bookList": "4",
        "description": "这本书适合计算机专业的同学阅读，可以学到一些web攻击和防御的知识。书本5成新。",
        "cover": "https://7465-test-0c6ee6-1258250998.tcb.qcloud.la/book3.jpg?sign=da401e4a1c2526e22a18743aaa2a26c8&t=1544622581",
        "price": "5.00",
        "author": "o0vdn5EziRBqspl7eQ3_MotS0560",
        "buyer": "",
        "nickName": "^_^—",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ83gCnOYmTJKaiasUxJdOmeXgryop3MaXj881U0RFOQHG57eujzd4Gj3KaMwAdTWoprOsuCkc4zOg/132",
        "college": "0",
        "confirm": "0",
        "wechat": "a1728947130"
    }
    ]
  },
  // 选择校区
  chooseCollege(e) {
    var that = this;
    var temp = []
    this.allBook.forEach((val) => {
      console.log(e.detail.value)
      if (val.campus === that.data.collegeArray[e.detail.value] || e.detail.value === '5') {
        temp.push(val)
        
      }
    })
    this.setData({
      college: e.detail.value,
      allBook: temp
    })
  },
  // 选择书单
  chooseBookList(e) {
    var that = this;
    var temp = []
    this.allBook.forEach((val) => {
      if (val.grade === that.data.bookListArray[e.detail.value] || e.detail.value === '5') {
        temp.push(val)
      }
    })
    this.setData({
      bookList: e.detail.value,
      allBook: temp
    })
  },
  chooseBookType(e) {
    var that = this;
    var temp = []
    this.allBook.forEach((val) => {
      if (val.type === that.data.typename[e.detail.value] || e.detail.value === '5') {
        temp.push(val)
      }
    })
    this.setData({
      bookList: e.detail.value,
      allBook: temp
    })
  },
  // 搜索：e.detail = {value, cursor}
  search(e) {
    var temp = []
    var value = e.detail.value
    this.allBook.forEach((val) => {
      if (val.title.indexOf(value) !== -1) {
        temp.push(val)
      }
    })
    this.setData({
      allBook: temp
    })
  },
  // 到达详情页
  toDetailPage(e) {
    let id = e.target.dataset.id
    let detail = this.data.allBook[id]
   
    wx.setStorageSync('data', detail)
    
    console.log('跳转到书籍详情页，成功', detail)
    //let url = `../bookDetail/bookDetail?detail=${detail}`
    let url = `../bookDetail/bookDetail`
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
  // allBook数据请求
   getAllBook(options) {
    var that = this
    if (options.refresh) {
      model.showBusy('正在刷新')
    }
     wx.cloud.init()
     const testDB = wx.cloud.database({
       env: 'test-0c6ee6'
     })
     testDB.collection('cBook').get({
       success(res) {
         // res.data 包含该记录的数据
         console.log('查询成功：', res.data)
         console.log('查询成功：', that.storeOpenid)
         var temp = res.data // 原始书籍
         var allBook = [] // 非预定的书籍
         temp.forEach(val => {
           if (val.confirm === '0' && (that.data.storeOpenid === val._openid || that.data.storeOpenid === 'all')) {
             allBook.push(val)
           }
         })
         that.allBook = allBook // 为了检索
         that.setData({
           allBook: allBook,
           // 设为全校和全部教材
           college: '5',
           bookList: '5'
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
  onLoad: function (options) {
    var that = this;
    var num = wx.getStorageSync('openid')
    console.log(num)
    that.setData({
        storeOpenid: num
    })
    console.log('id:  ', that.data.storeOpenid);

    this.getAllBook({
      refresh: false
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
    this.getAllBook({
      refresh: true
    })
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
