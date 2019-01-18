# JAVA代码规范
本Java代码规范以SUN的标准Java代码规范为基础，为适应我们公司的实际需要，可能会做一些修改。本文档中没有说明的地方，请参看SUN Java标准代码规范。如果两边有冲突，以本文档为准。

## 1. 标识符命名规范
### 1.1 概述
标识符的命名力求做到统一、达意和简洁。

#### 1.1.1 统一
统一是指，对于同一个概念，在程序中用同一种表示方法，比如对于供应商，既可以用supplier，也可以用provider，但是我们只能选定一个使用，至少在一个Java项目中保持统一。统一是作为重要的，如果对同一概念有不同的表示方法，会使代码混乱难以理解。即使不能取得好的名称，但是只要统一，阅读起来也不会太困难，因为阅读者只要理解一次。

#### 1.1.2 达意
达意是指，标识符能准确的表达出它所代表的意义，比如： newSupplier, OrderPaymentGatewayService等；而 supplier1, service2，idtts等则不是好的命名方式。准确有两成含义，一是正确，而是丰富。如果给一个代表供应商的变量起名是 order，显然没有正确表达。同样的，supplier1, 远没有targetSupplier意义丰富。

#### 1.1.3 简洁
简洁是指，在统一和达意的前提下，用尽量少的标识符。如果不能达意，宁愿不要简洁。比如：theOrderNameOfTheTargetSupplierWhichIsTransfered 太长， transferedTargetSupplierOrderName则较好，但是transTgtSplOrdNm就不好了。省略元音的缩写方式不要使用，我们的英语往往还没有好到看得懂奇怪的缩写。

#### 1.1.4 骆驼法则
Java中，除了包名，静态常量等特殊情况，大部分情况下标识符使用骆驼法则，即单词之间不使用特殊符号分割，而是通过首字母大写来分割。比如: SupplierName, addNewContract，而不是 supplier_name, add_new_contract。

#### 1.1.5 英文 vs 拼音
尽量使用通俗易懂的英文单词，如果不会可以向队友求助，实在不行则使用汉语拼音，避免拼音与英文混用。比如表示归档，用archive比较好, 用pigeonhole则不好，用guiDang尚可接受。

### 1.2 包名
使用小写字母如 com.xxx.settlment，不要 com.xxx.Settlement
单词间不要用字符隔开，比如 com.xxx.settlment.jsfutil，而不要com.xxx.settlement.jsf_util

### 1.3 类名
#### 1.3.1 首字母大写
类名要首字母大写，比如 SupplierService, PaymentOrderAction；不要 supplierService, paymentOrderAction.

#### 1.3.2 后缀
类名往往用不同的后缀表达额外的意思，如下表：
| 一个普通标题 | 一个普通标题 | 一个普通标题 |
| ------ | ------ | ------ |
| 短文本 | 中等文本 | 稍微长一点的文本 |
| 稍微长一点的文本 | 短文本 | 中等文本 |

| 后缀名 |	 意义 |	举例 |
| ------ | ------ | ------ |
|Service |	表明这个类是个服务类，里面包含了给其他类提同业务服务的方法|	PaymentOrderService|
|Impl	|这个类是一个实现类，而不是接口	|PaymentOrderServiceImpl|
|Inter|	这个类是一个接口	|LifeCycleInter|
|Dao|	这个类封装了数据访问方法	|PaymentOrderDao|
|Action	|直接处理页面请求，管理页面逻辑了类	|UpdateOrderListAction|
|Listener|	响应某种事件的类|	PaymentSuccessListener|
|Event	|这个类代表了某种事件|	PaymentSuccessEvent|
|Servlet|	一个Servlet|	PaymentCallbackServlet|
|Factory	|生成某种对象工厂的类|	PaymentOrderFactory|
|Adapter	|用来连接某种以前不被支持的对象的类|	DatabaseLogAdapter|
|Job	|某种按时间运行的任务|	PaymentOrderCancelJob|
|Wrapper	|这是一个包装类，为了给某个类提供没有的能力	|SelectableOrderListWrapper|
|Bean	|这是一个POJO|	MenuStateBean|
