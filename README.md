# 教室借用小程序
已经基本开发完成，后续会进行代码优化。也想把其中的一部分抽离出来单独封装。
<br>预览网址：http://www.istuadmission.com/Portfolio/index.html
## 登录限制
- 需要在app.js中将全局变量islogin 设置为true
<br> ![image](https://github.com/daibawang/Rmoom-Management/blob/master/images/login.gif)
## 自定义navigationBar
- 在app.json内增加选项："navigationStyle": "custom",去掉顶部栏navigationBar
- 利用自定义组件实现顶部栏
- 在需要引用顶部栏组件的页面<br>
  1、在页面的 json 文件中进行引用声明
  ```shell
   {
    "usingComponents": {
      "backbar": "/components/backbar/backbar"
    },
   }
  ```
  2、在wxml文件中引用，传入相关参数
  ```shell
    <backbar gohref="../timeselect/timeselect" paddingtop="" margintop="" imgcolor="back-grey"></backbar>
  ```
## 日期、时间选择说明
- 只能选择七天内的日期，选择单个或连续的时间段。
<br> ![image](https://github.com/daibawang/Rmoom-Management/blob/master/images/timeselect.gif)
## 节次选择说明
- 在选定的教师日期内，只能选择未被借用的时间段，选择的连续时间段内也不能包含不可借用时间
<br> ![image](https://github.com/daibawang/Rmoom-Management/blob/master/images/sectionselect.gif)
