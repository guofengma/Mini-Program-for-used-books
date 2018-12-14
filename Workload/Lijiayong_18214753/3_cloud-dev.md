# 云开发功能
开发者可以使用云开发开发微信小程序、小游戏，无需搭建服务器，即可使用云端能力。  

云开发为开发者提供完整的云端支持，弱化后端和运维概念，无需搭建服务器，使用平台提供的 API 进行核心业务开发，即可实现快速上线和迭代，同时这一能力，同开发者已经使用的云服务相互兼容，并不互斥。

目前提供三大基础能力支持：

*  云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写自身业务逻辑代码

*  数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 数据库

*  存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理

具体可以参考官方文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html

##配置过程：
*  创建了第一个云开发小程序后，在使用云开发能力之前需要先开通云开发。在开发者工具工具栏左侧，点击 “云开发” 按钮即可开通云开发。云开发开通后自动获得一套云开发环境，各个环境相互隔离，每个环境都包含独立的数据库实例、存储空间、云函数配置等资源。每个环境都有唯一的环境 ID 标识，初始创建的环境自动成为默认环境。
 ![pic](https://github.com/resisterdkdk/Mini-Program-for-used-books/blob/master/Workload/Lijiayong_18214753/images/3.png)
 我的环境名为test
*   腾讯云开发环境开通，可参考以下链接https://cloud.tencent.com/document/product/619/11447
，在开通和配置过程中出现过各种bug，需要耐心。注意，按照官方文档的做法，在最后测试登录的时候会出现登录失败error的情况需要参考文档https://github.com/tencentyun/wafer2-quickstart/issues/13
