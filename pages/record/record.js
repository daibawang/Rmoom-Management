// pages/record/record.js
var tool = require("../../utils/util.js");
var app = getApp();
var API_URL = app.appServlet.servlet2 + 'RecordServlet';
// var API_URL = app.appServlet.servlet + 'RecordServlet';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selecDetail:null,
    userid:null,
    username:null,
    recordlist:null,
    roomtypename: ["", "大数据学院", "多媒体教室", "普通教室"],
    typecolor: ["","linear-gradient(to right bottom, #D486FF 0%,#9666fe 100%)", "linear-gradient(to right bottom, #FFBA96 0%,#FF7A95 100%)", "linear-gradient(to right bottom, #33CAFF 0%,#2A85FC 100%)"],
    timeList: [{
      time: 1,
      start: "08:00",
      end: "08:45"
    },
    {
      time: 2,
      start: "08:45",
      end: "09:30"
    }, {
      time: 3,
      start: "09:45",
      end: "10:30"
    }, {
      time: 4,
      start: "10:30",
      end: "11:15"
    }, {
      time: 5,
      start: "11:25",
      end: "12:10"
    }, {
      time: 6,
      classz: '',
      timetext: "午2",
      start: "12:10",
      end: "12:55"
    }, {
      time: 7,
      start: "13:05",
      end: "13:50"
    }, {
      time: 8,
      start: "13:50",
      end: "14:35"
    }, {
      time: 9,
      start: "14:50",
      end: "15:35"
    }, {
      time: 10,
      start: "15:35",
      end: "16:40"
    }, {
      time: 11,
      start: "16:30",
      end: "17:15"
    }, {
      time: 12,
      start: "17:15",
      end: "18:00"
    }, {
      time: 13,
      start: "18:10",
      end: "18:55"
    }, {
      time: 14,
      start: "18:55",
      end: "19:40"
    }
    ],
    nowdata:null
  },
  godetail: function (e) {
      this.setData({
        selecDetail: this.data.recordlist[e.currentTarget.dataset.bindex],
      })
    
    let selecDetail = JSON.stringify(this.data.selecDetail);
    console.log("zzzzzzz" + typeof(selecDetail))
    //   console.log("zzzzzddddddddd" + typeof (this.data.selectjson))
    // let selectData = JSON.stringify(this.data.selectjson);
    wx.redirectTo({
      // url: '../oneroomsure/oneroomsure?selectData=' + selectData + "&Daydata=" + this.data.Daydata + "&Classtime=" + this.data.Classtime + "&sinfonia=" + this.data.sinfonia,
      url: '../roomdetail/roomdetail?roomdetails=' +selecDetail
    })
  },
  go: function (event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.href
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("这是：record");
    var that = this;
    var nowtime = Date.parse(new Date());
    let today = tool.toDate(nowtime);
    that.setData({
      userid: app.Appuserinfo.userid,
      nowdata: today
    })
      wx.request({
        url: API_URL, 
          data: {
            username: app.Appuserinfo.userid
          },
          header: {
              'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
              that.setData({
                recordlist:res.data
              })
              for (let i = 0; i < that.data.recordlist.length; i++) {
                let str = that.data.recordlist[i];
                let dateyear = str.data.substr(0, 4);
                let datemonth = str.data.substr(4, 2);
                let dateday = str.data.substr(6, 2);
                let suredata = str.data;
                console.log(str.data)
                let listdata = "recordlist[" + i + "].data"
                that.setData({
                  [listdata]: dateyear + "-" + datemonth + "-" + dateday
                })
                let timestring = JSON.stringify(that.data.recordlist[i]);
                console.log(timestring)
              }
            console.log(that.data.recordlist)
          }
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