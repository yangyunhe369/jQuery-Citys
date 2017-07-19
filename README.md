# jQuery-Citys
中国省市区三级联动的jQuery插件

该轮播图效果为切换轮播图时会产生视差效果，以及文字的一个缩放效果。

ps:由于本插件使用了ajax方式获取json数据，如果只引入资源文件中的 **jquery-citys.js** 和 **jquery-citys.json**在本地进行测试时，须通过服务器环境运行，类似这样：	http://127.0.0.1:8888/index.html。

**demo**：[线上地址](https://yangyunhe369.github.io/jQuery-Citys/)

## 下载源码

```
git clone https://github.com/yangyunhe369/jQuery-Citys.git
```
## 运行项目

本项目使用了vue.js的开发模板webpack-simple，可以利用nodeJS模拟线上环境，所以本地测试时，可以按照以下步骤运行项目。

``` bash
# 安装依赖
npm install

# 运行项目
npm run dev

# 项目打包
npm run build
```

## 目录结构
```
·
├─ index.html                     //入口html文件
├─ jquery-citys.json              //省市区数据json文件 
├─ dist								            //项目打包文件
│  ├─  build.js        
│  └─  build.js.map
│      
└─ src                            //源码目录
    ├─ App.vue                    //页面入口文件
    ├─ main.js                    //程序入口文件，加载各种公共组件         
    │  
    ├─ assets
    │  └─  logo.png
    │      
    ├─css
    │  └─  common.css             //基础样式文件
    │      
    └─ js
       ├─   jquery-citys.js       //插件源码
       └─   jquery-citys.min.js   //插件压缩源码
```

## 使用方法

``` javascript
调用轮播插件：
Html：
<div class="citys">
	<select class="city-select" name="province"></select>
	<select class="city-select" name="city"></select>
	<select class="city-select" name="area"></select>
</div>
Javascript：
$('.citys').citys(options);
```

## 说明

如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

## 个人简介
作者：弦云孤赫(David Yang)

职业：web前端开发工程师

爱好：网游、音乐（吉他）

## 联系方式
QQ：314786482

微信：yangyunhe_yyh

坐标：四川成都