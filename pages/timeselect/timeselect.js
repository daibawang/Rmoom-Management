// pages/yan/yan.js
var app = getApp();
var API_URL = app.appServlet.servlet2 + 'ClassTimeServlet';
var API_URL_datalist = app.appServlet.servlet2 + 'IndexServlet';
// var API_URL = app.appServlet.servlet + 'ClassTimeServlet';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgtype: 0,
    cimg: ["data:image/png;base64,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", "data:image/png;base64,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"],
    flag: false,
    flag2: true,
    // flagmonth: false,
    weekArr: ['日', '一', '二', '三', '四', '五', '六'],
    arr: [],
    sysW: null,
    lastDay: null,
    firstDay: null,
    nextfirst: null, //下个月第一天周几
    nextlastDay: null,
    prefirst: null, //上个月第一天周几
    pretlastDay: null,
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
      end: "08:45"
    },
    {
      time: 2,
      classz: '',
      timetext: 2,
      start: "08:45",
      end: "09:30"
    }, {
      time: 3,
      classz: '',
      timetext: 3,
      start: "09:45",
      end: "10:30"
    }, {
      time: 4,
      classz: '',
      timetext: 4,
      start: "10:30",
      end: "11:15"
    }, {
      time: 5,
      classz: '',
      timetext: '午1',
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
      classz: '',
      timetext: 5,
      start: "13:05",
      end: "13:50"
    }, {
      time: 8,
      classz: '',
      timetext: 6,
      start: "13:50",
      end: "14:35"
    }, {
      time: 9,
      classz: '',
      timetext: 7,
      start: "14:50",
      end: "15:35"
    }, {
      time: 10,
      classz: '',
      timetext: 8,
      start: "15:35",
      end: "16:40"
    }, {
      time: 11,
      classz: '',
      timetext: "晚1",
      start: "16:30",
      end: "17:15"
    }, {
      time: 12,
      classz: '',
      timetext: "晚2",
      start: "17:15",
      end: "18:00"
    }, {
      time: 13,
      classz: '',
      timetext: "晚3",
      start: "18:10",
      end: "18:55"
    }, {
      time: 14,
      classz: '',
      timetext: "晚4",
      start: "18:55",
      end: "19:40"
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
    roomjson: null,
    //   roomjson: [{
    //   roomid:"112",roomname: " 大数据学院119", roomplace: "3号实训楼1层北侧", roompeople: 40, roomimg: "../../images/room1.png", wifi: false, ty: true, jsj: true, key: true, network: false, tv: true, studentcomputer: false, desk: false, ytj: false, hy: true, kt: false, gddesk: true
    // }],
    roomtypename: ["", "大数据学院", "多媒体教室", "普通教室"],
    flagshow1: true,
    flagshow2: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("这是：timeselect");
    this.dataTime();
    this.showdataTime();
    var thisday = this.data.getDate;
    // console.log(this.data.timeList)
    if(options.backtab==2){
      this.setData({
        flag: true,
        flag2: false,
        imgtype: 1
      })
    }
    this.setData({
      roomtype: app.Appuserinfo.searchtype,
      selectDday: thisday,
    })
    var that = this;
    wx.request({
      url: API_URL_datalist,
      data: {
        type: app.Appuserinfo.searchtype
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          roomjson: res.data,
        })
        console.log(that.data.roomjson);
      }
    })
  },
  changeimg: function () {
    this.setData({
      flag: false,
      flag2: true,
      imgtype: 0
    })
  },
  changeimg2: function () {
    this.setData({
      flag: true,
      flag2: false,
      imgtype: 1
    })
  },
  //日历相关
  dataTime: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var months = date.getMonth() + 1;
    //获取现今年份
    this.data.year = year;
    //获取现今月份
    this.data.month = months;
    //获取今日日期
    this.data.getDate = date.getDate();
    //最后一天是几号
    var d = new Date(year, months, 0);
    this.data.lastDay = d.getDate();
    //第一天星期几
    let firstDay = new Date(year, month, 1);
    this.data.firstDay = firstDay.getDay();
    //下个月第一天周几
    var nextmothday = new Date(year, month + 1, 1);
    this.data.nextfirst = nextmothday.getDay();
    //下个月最后一天
    var nd = new Date(year, months + 1, 0);
    this.data.nextlastDay = nd.getDate();
    //上个月第一天周几
    var premothday = new Date(year, month - 1, 1);
    this.data.prefirst = premothday.getDay();
    //下个月最后一天
    var pd = new Date(year, months - 1, 0);
    this.data.pretlastDay = pd.getDate();
  },
  showdataTime: function () {
    this.data.arr.splice(0, 40)
    for (var j = 0; j < this.data.firstDay; j++) {
      this.data.arr.push(0);
    }
    //根据得到今月的最后一天日期遍历 得到所有日期
    for (var i = 1; i < this.data.lastDay + 1; i++) {
      this.data.arr.push(i);
    }
    var res = wx.getSystemInfoSync();
    this.setData({
      arr: this.data.arr,
      year: this.data.year,
      getDate: this.data.getDate,
      month: this.data.month,
    })
  },
  preMonth: function () {
    // var flagmonth = this.data.flagmonth;
    var date = new Date();
    // var year = date.getFullYear();
    var months = date.getMonth() + 1;
    if (this.data.month == months + 1) {
      this.setData({
        // flagmonth: !this.data.flagmonth,
        firstDay: this.data.firstT,
        lastDay: this.data.lastT,
        getDate: this.data.ThisT,
        getcha: 7,
        month: this.data.month - 1,
      })
      this.showdataTime();
      console.log(this.data.firstDay)
    } else if (this.data.month == months) {
      this.setData({
        firstT: this.data.firstDay,
        lastT: this.data.lastDay,
        ThisT: this.data.getDate,
        firstDay: this.data.prefirst,
        lastDay: this.data.pretlastDay,
        getDate: null,
        getcha: 0,
        month: this.data.month - 1,
      })
      this.showdataTime();
      console.log(this.data.firstDay + "this.data.prefirst")
    }
  },
  nextMonth: function () {
    // var flagmonth = this.data.flagmonth;
    var cha = 7 - (this.data.lastDay - this.data.getDate);
    var date = new Date();
    // var year = date.getFullYear();
    var months = date.getMonth() + 1;
    if (this.data.month == months) {
      this.setData({
        // flagmonth: !this.data.flagmonth,
        firstT: this.data.firstDay,
        lastT: this.data.lastDay,
        ThisT: this.data.getDate,
        firstDay: this.data.nextfirst,
        lastDay: this.data.nextlastDay,
        getDate: null,
        getcha: cha,
        month: this.data.month + 1,
      })
      this.showdataTime();
      // console.log(this.data.firstDay)
      // console.log("getDate" + this.data.getcha)
    } else if (this.data.month == months - 1) {
      this.setData({
        // flagmonth: !this.data.flagmonth,
        firstDay: this.data.firstT,
        lastDay: this.data.lastT,
        getDate: this.data.ThisT,
        getcha: 7,
        month: this.data.month + 1
      })
      this.showdataTime();
    } else {
      return;
    }
  },
  selectDay: function (e) {
    var montn = this.data.month;
    this.setData({
      selectDday: e.currentTarget.dataset.day,
      selectMontn: montn
    })
    if (e.currentTarget.dataset.day < this.data.getDate || e.currentTarget.dataset.day > (this.data.getDate + this.data.getcha)) {
      wx.showModal({
        title: '',
        content: '您选择的日期不在可预约范围内，请重新选择',
        showCancel: false,
        confirmText: '确定',
        confirmColor: "#77a9fb"
      })
      this.setData({
        flagtime: true,
        submitT: 200,
        Timebegin: '',
        Timeend: '',
        checkBegin: false,
        checkEnd: false,
        selectDday: "",
      })
      this.renderStyle();
    } else {
      this.setData({
        flagtime: false,
        submitT: 100,
        Timebegin: '',
        Timeend: '',
        checkBegin: false,
        checkEnd: false,
      })
      this.renderStyle();
      // console.log(this.data.selectMontn +"selectMontn: montn")
    }
    console.log(this.data.selectDday)
  },
  selectTime: function (e) {
    var timeList = this.data.timeList;
    if (this.data.checkBegin && this.data.Timebegin > e.currentTarget.dataset.stime) {
      this.setData({
        Timebegin: e.currentTarget.dataset.stime,
        checkEnd: false,
        Timeend: ''
      })
      console.log(this.data.Timebegin + "-" + this.data.Timeend + "一");
    } else if (this.data.checkBegin && this.data.checkEnd == false) {
      this.setData({
        Timeend: e.currentTarget.dataset.stime,
        checkEnd: true,
      })
      console.log(this.data.Timebegin + "-" + this.data.Timeend + "二");
    } else if (this.data.checkBegin == false || this.data.checkEnd == true) {
      this.setData({
        Timebegin: e.currentTarget.dataset.stime,
        Timeend: '',
        timeList: timeList,
        checkBegin: true,
        checkEnd: false
      })
      console.log(this.data.Timebegin + "-" + this.data.Timeend + "三");
    }
    for (var j = 0; j < this.data.timeList.length; j++) {
      this.data.timeList[j].classz = '';
    }
    this.renderStyle();
  },
  //渲染
  renderStyle: function () {
    var timeList = this.data.timeList;
    console.log(timeList.length + "this.data.checkEnd" + this.data.checkEnd);
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
      
        let todaymonths = this.data.month + "";
        todaymonths = todaymonths.padStart(2, "0");
        let todayday = this.data.selectDday + "";
        todayday = todayday.padStart(2, "0");
      var Daydata = this.data.year + "" + todaymonths + "" + todayday;
      var Ddata = this.data.year + "-" + todaymonths + "-" + todayday;
      console.log("选择时间" + Daydata + "长度")
      var sinfonia = new Array();
      sinfonia.push(Ddata);
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
      console.log("传递的时间" + Classtime + Daydata);
      var roomtype = this.data.roomtype+" ";
      wx.request({
        //url: '',
        url: API_URL,
        data: {
          type: "'" + roomtype + "'" ,
          Daydata: Daydata,
          time: Classtime
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          let roomjson = JSON.stringify(res.data);
          console.log("这是返回列表");
          console.log(res)
          let urlgo = '../oneroomlist/oneroomlist?roomjson=' + roomjson + "&Daydata=" + Daydata + "&Classtime=" + Classtime + "&sinfonia=" + sinfonia;
          wx.redirectTo({
            url: urlgo
          })
        },
        fail: function (e) {
          // wx.showModal({
          //   title: '提示',
          //   content: '连接服务器失败，请稍后再试！',
          //   showCancel: false,
          //   confirmText: '确定',
          //   confirmColor: "#77a9fb"
          // })
        },
      })
    }
  },
  //弹出层
  show: function (e) {
    this.setData({
      flagshow1: false,
      flagshow2: true,
      selectjson: e.currentTarget.dataset.item,
    })
    // var name = e.currentTarget.dataset.item;
    console.log("a", this.data.selectjson);
  },
  hide: function () {
    this.setData({
      flagshow1: true,
      flagshow2: false,
    })
  },
  go: function (e) {
    console.log(e.currentTarget.dataset.item);
    let selectitem = JSON.stringify(e.currentTarget.dataset.item)
    console.log(e.currentTarget.dataset.item)
    console.log("点击的selection")
    app.Appuserinfo.selectroomid = e.target.dataset.roomid;
    wx.redirectTo({
      url: '../second1select/second1select?selectitem=' + selectitem,
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