
#软件架构文档


中大零饭是一款微信小程序，其整体的架构与一般的微信小程序类型：

前端：微信小程序前端框架
后端：Node.js Koa2 框架

##微信小程序前端框架
小程序开发框架的目标是通过尽可能简单、高效的方式让开发者可以在微信中开发具有原生 APP 体验的服务。

框架提供了自己的视图层描述语言 WXML 和 WXSS，以及基于 JavaScript 的逻辑层框架，并在视图层与逻辑层间提供了数据传输和事件系统，可以让开发者可以方便的聚焦于数据与逻辑上。

响应的数据绑定
框架的核心是一个响应的数据绑定系统。

整个系统分为两块视图层（View）和逻辑层（App Service）

框架可以让数据与视图非常简单地保持同步。当做数据修改的时候，只需要在逻辑层修改数据，视图层就会做相应的更新。

页面管理
框架 管理了整个小程序的页面路由，可以做到页面间的无缝切换，并给以页面完整的生命周期。开发者需要做的只是将页面的数据，方法，生命周期函数注册进 框架 中，其他的一切复杂的操作都交由 框架 处理。

基础组件
框架 提供了一套基础的组件，这些组件自带微信风格的样式以及特殊的逻辑，开发者可以通过组合基础组件，创建出强大的微信小程序 。

丰富的 API
框架 提供丰富的微信原生 API，可以方便的调起微信提供的能力，如获取用户信息，本地存储，支付功能等。


##Wafer框架

Wafer 是腾讯云面向广大开发者提供的小程序开发全栈资源套件，套件赋予小程序会话鉴权、信道服务、云资源整合等能力，在扩展性和安全性上能满足企业级的要求，同时具备低开发门槛。


###Wafer 解决方案架构

 
![image](https://github.com/resisterdkdk/Mini-Program-for-used-books/raw/master/7_design/7_4_Architecture/wafer.jpg)


###逻辑视图


![image](https://github.com/resisterdkdk/Mini-Program-for-used-books/raw/master/7_design/7_4_Architecture/7_4luojishitu.png)


###物理视图


![image](https://github.com/resisterdkdk/Mini-Program-for-used-books/raw/master/7_design/7_4_Architecture/7_4wulishitu.png)












