// pages/oneroomsure/oneroomsure.js
var app = getApp();
var API_URL = app.appServlet.servlet2 + 'SubmitServlet';
// var API_URL = app.appServlet.servlet + 'SubmitServlet';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        flag1: true,
        zindex: false,
        isexist: true,
        roomtypename: ["", "大数据学院", "多媒体教室", "普通教室"],
        uselist: ['班会', '补习', '讲座', '工作室活动','其他'],
        selectData: null,
        use: null,
        phone: null,
        bgcolor:null,
        page:null
    },
    getUse: function(e) {
      console.log("选择了" + e.detail.value)
        this.setData({
            use: e.detail.value
        })
    },
    getPhone: function(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            selectData: JSON.parse(options.selectData),
            Daydata: options.Daydata,
            Classtime: options.Classtime,
            sinfonia: options.sinfonia.split(","),
            userid: app.Appuserinfo.userid,
            bgcolor: options.bgcolor,
            bgcoloronly: options.bgcoloronly,
            backpage: options.backpage,
            backtab: options.backpage
        })
        if (options.backtab == 2) {
          this.setData({
            backtab: options.backpage + "?backtab=2"
          })
          console.log("backtabbacktabbacktab" + this.data.backpage)
          
        }
      console.log("这是：oneroomsure" + this.data.backpage);
        console.log(this.data.Daydata + "xxddddddxxx" + this.data.userid);
        console.log(this.data.selectData);

    },
    submitT: function() {
        console.log(this.data.use)
        if (this.data.use == null || this.data.phone == null) {
            wx.showModal({
                title: '',
                content: '请输入信息后确认',
                showCancel: false,
                confirmText: '确定',
                confirmColor: "#77a9fb"
            })
        } else {
            var sroomid = this.data.selectData.roomid;
            var sDaydata = this.data.Daydata;
            var sClasstime = this.data.Classtime;
            //时间戳
            var timestamp = Date.parse(new Date());
          console.log(timestamp + "sroomidzzzzzzzzzz")
            var username = this.data.userid;
            var use = this.data.use;
            var phone = this.data.phone;
            var that = this;
            
            wx.request({
                //ßurl: '',
                url: API_URL,
                data: {
                    sroomid: sroomid,
                    sDaydata: sDaydata,
                    sClasstime: sClasstime,
                    timestamp: timestamp,
                    username: username,
                    use: use,
                    phone: phone,
                  ftime: that.data.sinfonia[3],
                  ltime: that.data.sinfonia[4],
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                    // let roomjson = JSON.stringify(res.data);
                    // console.log(typeof (roomjson))
                    // let urlgo = '../oneroomlist/oneroomlist?roomjson=' + roomjson + "&Daydata=" + Daydata + "&Classtime=" + Classtime + "&sinfonia=" + sinfonia;
                    // wx.redirectTo({
                    //   url: urlgo
                    // })
                  if (res.data==true){
                    that.setData({
                      flag1: false,
                      zindex: true,
                    })
                  }
                },
                fail: function(e) {
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
    hide: function() {
        this.setData({
                flag1: true,
                zindex: false,
            }),
            wx.redirectTo({
                url: '../record/record',
            })
    },
    goindex: function() {
        this.setData({
                flag1: true,
                zindex: false,
            }),
            wx.redirectTo({
                url: '../index/index',
            })
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