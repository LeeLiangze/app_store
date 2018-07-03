# cmos-dist使用文档

## 初始化项目命令行

````
依次执行如下命令
npm set registry http://192.168.100.10:20899
npm set @types:registry https://registry.npmjs.org/
npm install 

//启动nodeJs服务
npm run server
//启动web端服务
npm run dev
npm run start
````

## 目录结构
````
├─config # 存放配置文件
│   ├─config.default.js # 默认配置项
│   ├─config.local.js # 本地调试配置项
│   ├─config.prod.js # 服务端部署配置项
│   └─plugin.js # 插件管理
├─app # nodeJs开发文件
    ├─model # model层，负责定义mysql数据库中数据类型，从属关系 
    ├─service  # 针对对应数据表的操作，包括全部显示，增删改查五种方法
    ├─middleware # 中间件，处理安全和日志层，业务开发时不需要更改。（可选） 
    ├─extend # 扩展层，暂时只存放了jwt，业务开发不需要更改。（可选）
    ├─controller # 针对具有主从关系数据表的处理，包括全部显示，增删改查。 
    ├─router.js # 项目使用Rest API返回对应的数据接口 
    ├─public # 存储打包后的静态资源
    └─view # 存放打包后的静态页面
├─pages # 页面相关文件包括（html,css,img）
├─src #存放页面ts文件以及组件文件
	├─coms 组件根目录
    ├─页面入口ts文件，与html页面文件名称保持一致
````
## 前端代码开发说明

- web端框架公共方法  
    cookie // cookie 操作  
	date // 日期处理  
	dom // dom操作  
	domReady   
	lang // 常用基础方法，类型判断和对象合并以及clone  
	request // ajax  
	url // url处理  
	on // 事件绑定  
	Component // 组件开发基类，实际开发时集成此类重写方法  
- 通过 import {addClass} from '@cmos/web/dom';  方式引入模块
addClass(dom，'class1','class2')
- 示例代码见app-dist/src 目录

### 框架代码更新方式
	npm update @cmos/web@latest --save

## nodeJs开发说明
### 使用方法
本项目提供了post从model->service->controller->router.js的整个流程的例子，供参考。

### 连接数据库
- 打开navicat数据库可视化工具；
- 新建数据库，选择mysql；
- connect name:appdist  
  Host Name/IP Address:192.168.100.70  
  port:23306  
  User Name: appdist  
  Save password: sdz^J6%5uIFB
