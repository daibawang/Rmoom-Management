// pages/yan/yan.js
var app = getApp();
var API_URL = app.appServlet.servlet2 + 'ClassServlet';
// var API_URL = app.appServlet.servlet + 'ClassTimeServlet';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgtype: 0,
    firstT: null,
    lastT: null,
    ThisT: null,
    getcha: 7,
    selectDday: null,
    selectMontn: null,
    searchType: null,
    timeList: [{
        time: 1,
        classz: '',
        timetext: 1,
        start: "08:00",
        end: "08:45",
        isempty:0
      },
      {
        time: 2,
        classz: '',
        timetext: 2,
        start: "08:45",
        end: "09:30",
        isempty: 0
      }, {
        time: 3,
        classz: '',
        timetext: 3,
        start: "09:45",
        end: "10:30",
        isempty: 0
      }, {
        time: 4,
        classz: '',
        timetext: 4,
        start: "10:30",
        end: "11:15",
        isempty: 0
      }, {
        time: 5,
        classz: '',
        timetext: '午1',
        start: "11:25",
        end: "12:10",
        isempty: 0
      }, {
        time: 6,
        classz: '',
        timetext: "午2",
        start: "12:10",
        end: "12:55",
        isempty: 0
      }, {
        time: 7,
        classz: '',
        timetext: 5,
        start: "13:05",
        end: "13:50",
        isempty: 0
      }, {
        time: 8,
        classz: '',
        timetext: 6,
        start: "13:50",
        end: "14:35",
        isempty: 0
      }, {
        time: 9,
        classz: '',
        timetext: 7,
        start: "14:50",
        end: "15:35",
        isempty: 0
      }, {
        time: 10,
        classz: '',
        timetext: 8,
        start: "15:35",
        end: "16:40",
        isempty: 0
      }, {
        time: 11,
        classz: '',
        timetext: "晚1",
        start: "16:30",
        end: "17:15",
        isempty: 0
      }, {
        time: 12,
        classz: '',
        timetext: "晚2",
        start: "17:15",
        end: "18:00",
        isempty: 0
      }, {
        time: 13,
        classz: '',
        timetext: "晚3",
        start: "18:10",
        end: "18:55",
        isempty: 0
      }, {
        time: 14,
        classz: '',
        timetext: "晚4",
        start: "18:55",
        end: "19:40",
        isempty: 0
      }
    ],
    Timebegin: null,
    Timeend: null,
    //标记开始结束时间是否选择
    checkBegin: false,
    checkEnd: false,
    flagtime: false,
    submitT: 200,
    roomtype: null,
    roomid:null,
    cnselectTime:null,
    canselectList:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("这是：thirdselect");
    this.setData({
      roomid: options.roomid,
      roomtype: app.Appuserinfo.searchtype,
      selectDday: options.Daydata,
      cnselectTime: options.cnselectTime,
      selectitem: options.selectitem,
    })
    console.log(this.data.canselect)
    let canselect = this.data.cnselectTime.split(",").join("");
    for (let i = 0; i < canselect.length; i++) {
      if (canselect[i] == "1") {
          this.data.timeList[i].isempty = 1
        }
      }
    this.setData({
      timeList: this.data.timeList
    })
    // console.log(this.data.timeList);
    // console.log("selectDate" + this.data.selectDday + "selectroomid" + this.data.roomid);
  },
  //日历相关
  selectTime: function (e) {
    var timeList = this.data.timeList;
    // console.log(timeList);
    // console.log(e.currentTarget.dataset.stime)
    if (timeList[e.currentTarget.dataset.stime-1].isempty == 1) {
      wx.showModal({
        title: '',
        content: '该教室该时间段不可借用',
        showCancel: false,
        confirmText: '确定',
        confirmColor: "#77a9fb",
      })
    }else{
      if (this.data.checkBegin && this.data.Timebegin > e.currentTarget.dataset.stime) {
        // console.log("checkBegin:" + this.data.checkBegin + "Timebegin:" + this.data.Timebegin + "stime" + e.currentTarget.dataset.stime);
        this.setData({
          Timebegin: e.currentTarget.dataset.stime,
          checkEnd: false,
          Timeend: ''
        })
        // console.log(this.data.Timebegin + "-" + this.data.Timeend + "一");
      } else if (this.data.checkBegin && this.data.checkEnd == false) {
        this.setData({
          canselectList: true,
        })
        for (let i = this.data.Timebegin; i<e.currentTarget.dataset.stime;i++){
          if (timeList[i].isempty==1){
            this.setData({
              canselectList: false,
            })
          }
        }
        if (this.data.canselectList==false){
          wx.showModal({
            title: '',
            content: '该时间段内有不能借用的节次',
            showCancel: false,
            confirmText: '确定',
            confirmColor: "#77a9fb",
          })
        }else{
          this.setData({
            Timeend: e.currentTarget.dataset.stime,
            checkEnd: true,
          })
        }
        // console.log(this.data.Timebegin + "-" + this.data.Timeend + "二");
      } else if (this.data.checkBegin == false || this.data.checkEnd == true) {
        // console.log("checkBegin:" + this.data.checkBegin + "checkEnd:" + this.data.checkEnd);
          this.setData({
            Timebegin: e.currentTarget.dataset.stime,
            Timeend: '',
            timeList: timeList,
            checkBegin: true,
            checkEnd: false
          })
        // console.log(this.data.Timebegin + "-" + this.data.Timeend + "三");
      }
    }
    // console.log(this.data.checkBegin+"点击率");
    for (var j = 0; j < this.data.timeList.length; j++) {
      this.data.timeList[j].classz = '';
    }
    this.renderStyle();
  },
  //渲染
  renderStyle: function () {
    var timeList = this.data.timeList;
    // console.log(timeList.length + "this.data.checkEnd" + this.data.checkEnd);
    if (this.data.checkBegin) {
      timeList[this.data.Timebegin - 1].classz = ' active-first';
      for (var i = this.data.Timebegin; i < timeList.length; i++) {
        timeList[i].classz = '';
      }
    }
    if (this.data.checkEnd) {
      timeList[this.data.Timebegin - 1].classz = ' active-start';
      for (var j = this.data.Timebegin; j < this.data.Timeend; j++) {
        if (j == 5 || j == 11) {
          timeList[j].classz = 'active-end';
        } else if (j == 6 || j == 12) {
          timeList[j].classz = 'active-start';
        } else {
          timeList[j].classz = 'active';
        }
      }
      if (this.data.Timeend == 7 || this.data.Timeend == 13) {
        timeList[this.data.Timeend - 1].classz = ' active-first';

      } else {
        timeList[this.data.Timeend - 1].classz = ' active-end';
      }
      if (this.data.Timebegin == 6 || this.data.Timebegin == 12) {
        timeList[this.data.Timebegin - 1].classz = ' active-first';
      }
      if (this.data.Timebegin == this.data.Timeend) {
        timeList[this.data.Timebegin - 1].classz = ' active-first';
      }
    }
    if (!this.data.checkEnd && !this.data.checkBegin) {
      for (var i = 0; i < timeList.length; i++) {
        timeList[i].classz = '';
      }
    }

    this.setData({
      timeList: timeList
    })
  },
  submitT: function () {
    if (!this.data.checkBegin) {
      wx.showModal({
        title: '',
        content: '未选择时间，请选择后提交',
        showCancel: false,
        confirmText: '确定',
        confirmColor: "#77a9fb",
      })
    } else if (!this.data.checkEnd) {
      wx.showModal({
        title: '',
        content: '请选择结束时间后提交',
        showCancel: false,
        confirmText: '确定',
        confirmColor: "#77a9fb"
      })
    } else {
      // var Daydata = this.data.year + "" + this.data.month + "" + this.data.selectDday;
      let str = this.data.selectDday
      let dateyear = str.substr(0, 4);
      let datemonth = str.substr(4, 2);
      let dateday = str.substr(6, 2);
      let suredata = dateyear + "-" + datemonth + "-" + dateday
      var sinfonia = new Array();
      sinfonia.push(suredata);
      sinfonia.push(this.data.timeList[this.data.Timebegin - 1].start);
      sinfonia.push(this.data.timeList[this.data.Timeend - 1].end);
      sinfonia.push(this.data.Timebegin);
      sinfonia.push(this.data.Timeend);
      var Classtime = new Array(15);
      for (var j = 0; j < Classtime.length; j++) {
        Classtime[j] = 0;
      }
      for (var i = this.data.Timebegin; i <= this.data.Timeend; i++) {
        Classtime[i] = 1;
      }
      console.log("传递的时间" + Classtime + this.data.selectDday);
        var roomtype = this.data.roomtype;
        console.log("roomid" + this.data.roomid + "selectDday" + this.data.selectDday)
        // let roomjson = JSON.stringify(this.data.selectitem);
      console.log(this.data.selectitem);
        wx.redirectTo({
          url: '../oneroomsure/oneroomsure?selectData=' + this.data.selectitem + "&Daydata=" + this.data.selectDday + "&Classtime=" + Classtime + "&sinfonia=" + sinfonia + "&bgcolor=linear-gradient( to top  right, #ffbc5b 0%, #ff6739 100%)&bgcoloronly=#ffbc5b&backpage=roomselect"
        })
      // console.log(roomtype);
      // wx.request({
      //   //url: '',
      //   url: API_URL,
      //   data: {
      //     type: roomtype,
      //     Daydata: Daydata,
      //     ftime: this.data.Timebegin,
      //     ltime: this.data.Timeend
      //     // time: Classtime //改为开始和结束时间
      //   },
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   success: function (res) {
      //     let roomjson = JSON.stringify(res.data);
      //     let urlgo = '../oneroomlist/oneroomlist?roomjson=' + roomjson + "&Daydata=" + Daydata + "&Classtime=" + Classtime + "&sinfonia=" + sinfonia;
      //     wx.redirectTo({
      //       url: urlgo
      //     })
      //   },
      //   fail: function (e) {
      //     // wx.showModal({
      //     //   title: '提示',
      //     //   content: '连接服务器失败，请稍后再试！',
      //     //   showCancel: false,
      //     //   confirmText: '确定',
      //     //   confirmColor: "#77a9fb"
      //     // })
      //   },
      // })
    }
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