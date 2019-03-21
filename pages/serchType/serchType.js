// pages/serchType/serchType.js
var app = getApp();
var API_URL = app.appServlet.servlet2 + 'IndexServlet';
// var API_URL = app.appServlet.servlet + 'IndexServlet';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      array: [
        { name: "大数据学院", type: 1, color: "linear-gradient(to right bottom, #D486FF 0%,#9666fe 100%)" },
         { name: "多媒体教室", type: 2, color: "linear-gradient(to right bottom, #FFBA96 0%,#FF7A95 100%)" },
          { name: "普通教室", type: 3, color:"linear-gradient(to right bottom, #33CAFF 0%,#2A85FC 100%)"}],
      searchtype:null,
    },
    go: function(event) {
      let roomtype = event.currentTarget.dataset.type;
      let typestr = JSON.stringify(roomtype);
      app.Appuserinfo.searchtype = typestr;
      let urlgo = event.currentTarget.dataset.href;
      wx.redirectTo({
        url: urlgo,
      });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      console.log("这是：searchType");
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})