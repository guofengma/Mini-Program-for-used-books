const DB = require('../tools/connectdb')

/**
 * 增
 * @param {String} ctx.query.author 卖家的微信
 * @param {String} ctx.query.title 书名
 * @param {String} ctx.query.bookList 书单
 * @param {String} ctx.query.description 描述
 * @param {String} ctx.query.price 价钱
 * @returns {String} 'add success'
 */
async function addBook(ctx) {
  let query = ctx.query
  await DB('cBook')
    .insert({
      // 卖家填写的
      title: query.title || '',
      bookList: query.bookList || '0',
      description: query.description || '',
      cover: query.cover || '',
      price: query.price || '0',
      // 微信登录时得到的
      author: query.author || '',
      buyer: query.buyer || '',
      nickName: query.nickName || '',
      avatarUrl: query.avatarUrl || '',
      // 来自storage
      college: query.college || '0',
      wechat: query.wechat || '0',
      // 来自卖家
      confirm: query.confirm || '0'
    }).then(res => {
      console.log('success', res)
      ctx.body = '服务端：add success' + res
    }, err => {
      console.log('error', err)
      ctx.body = '服务端：add error' + err
    })
  // ctx.body = ctx || 'add success'
}

/**
 * 删除指定id的书籍
 * @param {Number} ctx.query.id
 * @returns {String} 'delete success'
 */
async function deleteBook(ctx) {
  let id = parseInt(ctx.query.id)
  await DB('cBook')
    .where('id', id)
    .del()
    .then(res => {
      console.log(res)
    })
  ctx.body = 'delete success'
}

/**
 * 获取指定id的所有书籍
 * @param {Number} ctx.query.idStart 开始位置
 * @param {Number} ctx.query.idEnd 结束位置
 * @returns {Array} 每个小json项为指定数量的书籍信息
 */
async function getAllBook(ctx) {
  let idStart = parseInt(ctx.query.idStart) || 0
  let idEnd = parseInt(ctx.query.idEnd) || 20
  let resData = {}
  await DB('cBook')
    .where('id', '>=', idStart)
    .andWhere('id', '<=', idEnd)
    .select()
    .then(res => {
      console.log(res)
      resData = res
    })
  ctx.body = resData
}

/**
 * 获取某个卖家的所有书
 * @param {String} ctx.query.author
 * @returns {Array} 每个小json项为指定作者具体的书籍信息
 */
async function getPublishBook(ctx) {
  let author = ctx.query.author
  let resData = {}
  await DB('cBook')
    .where('author', author)
    .select()
    .then(res => {
      console.log(res)
      resData = res
    })
  ctx.body = resData
}

/**
 * 获取某个卖家的所有书
 * @param {String} ctx.query.author
 * @returns {Array} 每个小json项为指定作者具体的书籍信息
 */
async function getSaleBook(ctx) {
  let author = ctx.query.author
  let resData = {}
  await DB('cBook')
    .where('author', author)
    .andWhere('confirm', '>=', 1)
    .select()
    .then(res => {
      console.log(res)
      resData = res
    })
  ctx.body = resData
}

/**
 * 获取某个卖家的所有书
 * @param {String} ctx.query.buyer
 * @returns {Array} 每个小json项为指定作者具体的书籍信息
 */
async function getBuyerBook(ctx) {
  let buyer = ctx.query.buyer
  let resData = {}
  await DB('cBook')
    .where('buyer', buyer)
    .select()
    .then(res => {
      console.log(res)
      resData = res
    })
  ctx.body = resData
}

/**
 * 更新某id书籍的信息
 * @param {Object} ctx.query
 * @returns {String} 'update success'
 */
async function updateBook(ctx) {
  let query = ctx.query
  let id = parseInt(query.id)
  await DB('cBook')
    .where('id', id)
    .update({
      // 卖家填写的
      title: query.title || '',
      bookList: query.bookList || '0',
      description: query.description || '',
      cover: query.cover || '',
      price: query.price || '0',
      // 微信登录时得到的
      author: query.author || '',
      buyer: query.buyer || '',
      nickName: query.nickName || '',
      avatarUrl: query.avatarUrl || '',
      // 来自storage
      college: query.college || '0',
      wechat: query.wechat || '0',
      // 来自卖家
      confirm: query.confirm || '0'
    }).then(res => {
      console.log('success', res)
    }, err => {
      console.log('error', err)
    })
  ctx.body = 'update success'
}

// let ctx = {
//   query: {
//     id: 2,
//     idStart: 0,
//     idEnd: 10,
//     author: 'o0vdn5EziRBqspl7eQ3_MotS0560',
//     buyer: 'o0vdn5EziRBqspl7eQ3_MotS0560'
//   }
// }

// let ctx2 = {
//   query: {
//     id: 4,
//     author: 'perhaps',
//     title: 'update',
//     bookList: '3',
//     description: 'update book',
//     price: 3
//   }
// }

// getList(ctx)
// getUserBook(ctx)
// deleteBook(ctx)
// updateBook(ctx2)
// getPublishBook(ctx)
// getSaleBook(ctx)
// getBuyerBook(ctx)

module.exports = {
  addBook,
  deleteBook,
  getPublishBook,
  getSaleBook,
  getBuyerBook,
  getAllBook,
  updateBook
}
