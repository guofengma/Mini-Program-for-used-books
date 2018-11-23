# 扫码点餐小程序

[系统分析与设计项目模板](https://sysu-sasd-project.github.io/dashboard/)
## Markdown编写教程
   [链接](https://blog.csdn.net/ljc_563812704/article/details/53464039)
## Uml编辑软件下载链接
   [链接](https://pan.baidu.com/s/1tNIlWeT5h2yFyOjV-2NlMA)
## github使用方法：
   [链接](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
###  将本地项目或代码上传到别人GitHub（码云）的远程分支上
　　今天碰到了这样一个问题，折腾了半天，就是将自己本地代码上传到人家的远程分支上。

　　首先要做的就是先将人家的项目克隆到本地：git clone + 项目地址

　　然后进入项目目录：cd + 已克隆好的项目目录名

　　然后切换分支，git checkout + 分支名（必须与所要提交代码的远程分支同名）

　　然后将所要提交的代码复制到该分支下，然后依次执行

　　（1）git add .     （注意：add与句号间有空格，否则会报错）

　　（2）git commit -m "change log" 

　　（3）git push origin +远程分知名

　　如果你不是该项目的开发者，第一次执行该操作可能会要求输入用户名和密码，注意，此时要输入的是该项目管理员 码云的用户名和密码。当然，最简单的办法就是让该项目的管理员给予你开发者的权限，这样你就可以直接提交了。

　　第一次执行完后，在本地电脑控制面板>用户账户>凭据管理器>Windows凭据中，会保存有上传到GitHub或码云时的用户名和密码，可以更改为自己的用户名和密码，以后提交的时候就会是自己的账号，而不再是人家的账号。
###  提交方法二
 每次建立新的仓库，提交的时总会出现这样的错误，真是头疼，......

直接开始正题，git 提交的步骤：

1. git init //初始化仓库

2. git add .(文件name) //添加文件到本地仓库

3. git commit -m "first commit" //添加文件描述信息

4. git remote add origin + 远程仓库地址 //链接远程仓库，创建主分支
 
5. git push -u origin master //把本地仓库的文件推送到远程仓库
 
提交之后就会出现以下错误
![image](https://github.com/resisterdkdk/newhug/blob/master/img/error.png)<br>

正确步骤：
1. git init //初始化仓库

2. git add .(文件name) //添加文件到本地仓库

3. git commit -m "first commit" //添加文件描述信息

4. git remote add origin + 远程仓库地址 //链接远程仓库，创建主分支

5. git pull origin master // 把本地仓库的变化连接到远程仓库主分支

6. git push -u origin master //把本地仓库的文件推送到远程仓库


