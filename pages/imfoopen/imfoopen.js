// pages/imfoopen/imfoopen.js
var tool = require("../../utils/util.js");
var app = getApp();
var API_URL = app.appServlet.servlet2 + 'MageServlet';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: "信息公开",
    magelist:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      wx.request({
          url: API_URL,
          data: {
          },
          header: {
              'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              magelist:res.data
            })
          }
      })
  },
  show:function(e){
    console.log(e.currentTarget.dataset.item);
    let massage = JSON.stringify(e.currentTarget.dataset.item);
    wx.redirectTo({
      url: '../massage/massage?mage=' + massage,
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