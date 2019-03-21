// pages/roomselect/roomselect.js
// @需要字段:三种教室的json数据，包含：roomname名字  roomplace位置  容纳人数roompeople 图片roomimg 是否有：wifi ty投影 jsj教室机 key门禁锁 network有线网络 tv触屏电视 studentcomputer学生电脑 desk活动书桌 ytj一体机 hy会议系统 kt空调 gddesk固定桌椅
//
// 
var app = getApp();
var API_URL = app.appServlet.servlet2 + 'IndexServlet';
// var API_URL = app.appServlet.servlet + 'IndexServlet';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab切换
    currentTab: 0,
    screenheight: wx.getSystemInfoSync().windowHeight,
    bgheight1:"",
    bgheight2: "",
    bgheight3: "",
    searchType:null,
    roomtypename: ["", "大数据学院", "多媒体教室", "普通教室"],
    // array: [{
    //   roomname: " 大数据学院119", roomplace: "3号实训楼1层北侧", roompeople: 40, roomimg: "../../images/room3.png", wifi: false, ty: true, jsj: true, key: true, network: false, tv: true, studentcomputer: false, desk: false, ytj: false, hy: true, kt: false, gddesk: true}, { roomname: " 大数据学院119", roomplace: "3号实训楼1层北侧", roompeople: 20, roomimg: "../../images/room2.png", wifi: true, ty: false, jsj:true, key: false, network: false, tv: true, studentcomputer: true, desk: true, ytj: true, hy: false, kt: false, gddesk:true }, {roomname: " 大数据学院119", roomplace: "3号实训楼1层北侧", roompeople: 40, roomimg: "../../images/room3.png", wifi: false, ty: false, jsj: true, key: true, network: true, tv: true, studentcomputer: false, desk: true, ytj: false, hy: false, kt: true, gddesk: true}],
    // array2: [{
    //   roomname: "3s北305", roomplace: "3号实训楼3层北侧", roompeople: 40, roomimg: "../../images/room3.png", wifi: false, ty: true, jsj: true, key: true, network: false, tv: true, studentcomputer: false, desk: false, ytj: false, hy: true, kt: false, gddesk: true}, { roomname: "3s北306", roomplace: "3号实训楼3层北侧", roompeople: 20, roomimg: "../../images/room2.png", wifi: true, ty: false, jsj: true, key: false, network: false, tv: true, studentcomputer: true, desk: true, ytj: true, hy: false, kt: false, gddesk: true }],

    // array3: [{roomname: "3s南201", roomplace: "3号实训楼3层北侧", roompeople: 40, roomimg: "../../images/room3.png", wifi: false, ty: true, jsj: true, key: true, network: false, tv: true, studentcomputer: false, desk: false, ytj: false, hy: true, kt: false, gddesk: true
    // }],
    flag1:true,
    flag2:false,
    selectjson:null,
    array1:null,
    array2:null,
    array3:null,
    imgs: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("这是：roomselect");
      var that = this;
      wx.request({
        url: API_URL,
          data: {
            type:1
          },
          header: {
              'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              array1: res.data,
              bgheight1: Object.keys(res.data).length,
            })
            console.log("that.data.array1");
          }
      })
      wx.request({
        url: API_URL,
          data: {
              type: 2
          },
          header: {
              'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              array2: res.data,
              bgheight2: Object.keys(res.data).length
            })
            console.log("that.data.array2");
            console.log(that.data.array2);
          }
      })
      wx.request({
         url: API_URL,
          data: {
            type: 3
          },
          header: {
              'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              array3: res.data,
              bgheight3: Object.keys(res.data).length
            })
            console.log("that.data.array3");
            console.log(that.data.array3);
            console.log(that.data.bgheight3);
          }
      })
  },
  /**
     * 滑动切换tab
     */
  bindChange: function (e) {
    var that = this;
    app.Appuserinfo.searchtype = e.detail.current+1;
    that.setData({ 
      currentTab: e.detail.current,
      searchType: e.detail.current+1,
    });
  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  go:function(e){
    console.log(e.currentTarget.dataset.item);
    let selectitem = JSON.stringify(e.currentTarget.dataset.item)
    console.log(selectitem)
    console.log("点击的selection")
    app.Appuserinfo.selectroomid=e.target.dataset.roomid;
    wx.redirectTo({
      url: '../secondselect/secondselect?selectitem=' + selectitem,
    })
  },
  //弹出层
  show:function(e){
    this.setData({ 
      flag1:false,
      flag2: true,
      selectjson: e.currentTarget.dataset.item,
      })
    // var name = e.currentTarget.dataset.item;
    console.log("a", this.data.selectjson);
  },
  hide:function(){
    this.setData({ 
      flag1:true,
      flag2:false,
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})