const CONF = {
  // 本地开发其他配置 ...
  serverHost: 'localhost',
  tunnelServerUrl: '',
  tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
  port: '5757',
  rootPathname: '',
  // 微信小程序 App ID
  appId: 'wx84244788da375016',
  // 微信小程序 App Secret
  appSecret: '',
  // 是否使用腾讯云代理登录小程序
  qcloudAppId: '1258250998',
  qcloudSecretId: 'AKIDmpkV6mcgfbRXda46nU7SMDweEh4Yex9D',
  qcloudSecretKey: 'hMzSwIX3dFjWJBzFEB2fOgsEQOG0bxqf',
  wxMessageToken: 'weixinmsgtoken',
  networkTimeout: 30000,
  // 远程
   useQcloudLogin: true,
  // 本地开发
  //useQcloudLogin: false,

  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'cAuth',
    pass: 'wx84244788da375016',
    char: 'utf8mb4'
  },
  cos: {
    /**
     * 区域
     * 华北：cn-north
     * 华东：cn-east
     * 华南：cn-south
     * 西南：cn-southwest
     * 新加坡：sg
     * @see https://www.qcloud.com/document/product/436/6224
     */
    region: 'ap-guangzhou',
    // Bucket 名称
    fileBucket: 'wximg',
    // 文件夹
    uploadFolder: ''
  },
  // 微信登录态有效期
  wxLoginExpires: 7200
}
module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF
