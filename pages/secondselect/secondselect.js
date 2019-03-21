// pages/yan/yan.js
var app = getApp();
var API_URL_time = app.appServlet.servlet2 + 'ClassServlet';
var API_URL = app.appServlet.servlet2 + 'ClassTimeServlet';
// var API_URL = app.appServlet.servlet + 'ClassTimeServlet';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgtype: 0,
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
    Timebegin: null,
    Timeend: null,
    //标记开始结束时间是否选择
    checkBegin: false,
    checkEnd: false,
    flagtime: false,
    submitT: 200,
    roomtype: null,
    roomid:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("这是：secondselect");
    this.dataTime();
    this.showdataTime();
    var thisday = this.data.getDate;
    // console.log(this.data.timeList)
    this.setData({
      roomid: app.Appuserinfo.selectroomid,
      roomtype: app.Appuserinfo.searchtype,
      selectDday: thisday,
      selectitem: options.selectitem,
    })
    console.log("roomtyperoomtyperoomtype" + this.data.roomid);
    // console.log(this.data.arr)
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
    } else {
      this.setData({
        flagtime: false,
        submitT: 100,
        Timebegin: '',
        Timeend: '',
        checkBegin: false,
        checkEnd: false,
      })
      // console.log(this.data.selectMontn +"selectMontn: montn")
    }
  },
  submitT: function () {
    let todaymonths = this.data.month+"";
    todaymonths = todaymonths.padStart(2,"0");
    let todayday = this.data.selectDday+"";
    todayday = todayday.padStart(2, "0");
    var Daydata = this.data.year + "" + todaymonths + "" + todayday;
    console.log("选择时间" + Daydata+ "长度")
      var that = this;
      wx.request({
        url: API_URL_time,
        data: {
          roomid: that.data.roomid,
          data: Daydata
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log("这是返回的数据")
          console.log(res.data)
          // let selectitem = JSON.stringify(that.data.selectitem)
          let urlgo = '../thirdselect/thirdselect?Daydata=' + Daydata + "&&roomid=" + that.data.roomid + "&&cnselectTime=" + res.data + "&&selectitem=" + that.data.selectitem;
          wx.redirectTo({
            url: urlgo
          })
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