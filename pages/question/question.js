// pages/question/question.js
var app = getApp();
var API_URL = app.appServlet.servlet2 + 'AddQuestionServlet';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: "问题反馈",
    texts: "至少5个字",
    min: 5,
    max: 1000,
  },
  inputs: function (e) {
    // 获取输入框的内容  
    var value = e.detail.value;
    // 获取输入框内容的长度  
    var len = parseInt(value.length);
    //最多字数限制  
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行  
    this.setData({
      MaxdNumber: len //当前字数    
    });
  },
  searchBox: function (e) {
    if (e.detail.value.q_content==""){
      wx.showModal({
        title: '',
        content: '请填写问题后再提交',
        showCancel: false,
        confirmText: '确定',
        confirmColor: "#77a9fb"
      })
    }else{
      wx.request({
        url: API_URL,
        data: {
          qmassage: e.detail.value.q_content,
          quser: app.Appuserinfo.username
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data == true) {
            wx.showModal({
              title: '',
              content: '问题反馈成功',
              showCancel: false,
              confirmText: '确定',
              confirmColor: "#77a9fb",
              success: function () {
                wx.redirectTo({
                  url: '../index/index',
                })
              }
            })
          }
        }
      })
    }
    console.log(e.detail.value.q_content)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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