/**
 * 小程序配置文件
 */
// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://5wy8do6r.qcloud.la'; // 远程开发
// var host = 'https://997609312.jnuexchange.xyz'; // 正式上线
//var host = 'http://localhost:5757'; // 本地开发


var config = {
  // 下面的地址配合云端 Demo 工作
  service: {
    host,
    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,
    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,
    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,
    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,

    // === 表单的增删查改 ===
    // 增
    addBookUrl: `${host}/weapp/addbook`,
    // 删除某id书籍
    deleteUrl: `${host}/weapp/deletebook`,
    // 获取指定id的书籍
    getAllBookUrl: `${host}/weapp/getallbook`,
    // 获取操作的书籍
    getPublishBookUrl: `${host}/weapp/getpublishbook`,
    getBuyerBookUrl: `${host}/weapp/getbuyerbook`,
    getSaleBookUrl: `${host}/weapp/getsalebook`,
    // 更新某id书籍
    updateBookUrl: `${host}/weapp/updatebook`
  }
};
module.exports = config;
