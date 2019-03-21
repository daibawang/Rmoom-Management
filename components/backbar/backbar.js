// components/backbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    gohref:{
      type: String,
      value: 'null'
    },
    margintop:{
      type: Number,
      value:70
    },
    paddingtop:{
      type: Number,
      value: 0
    },
    imgcolor:{
      type:String,
      value:'back'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    go: function (event) {
      wx.redirectTo({
        url: event.currentTarget.dataset.href
      })
    },
  }
})
