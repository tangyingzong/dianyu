// pages/active/active.js
var app = getApp();
var Functions = require('../template/Functions.js');

Page({
  data: {
    ListForm: [
      [
        {
          label: "手机号码",
          formname: "Phone",
          inputtype: "number",
          confirmtype: "done",
          disabled: true
        },
        {
          label: "激活码",
          inputtype: "text",
          confirmtype: "done",
          formname: "PIN_Code"
        }
        ]
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    Functions.InitUserInfo(
      {that:this,
        success:function(){
          var NewList = that.data.ListForm;
          NewList[0][0].value = that.data.Customer.Phone;
          that.setData({
            ListForm: NewList
          });
        }
      }
      );
    
    Functions.LoadImg(that);
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  activeSubmit: function (e) {
    console.log(e.detail.value);
    Functions.ActivePinCode(e.detail.value);
  },
  searchRights:function(){
    wx.switchTab({
      url: '../myrights/myrights'
    })
  },
  _ImgLoaded: function(e){Functions._ImgLoaded(e,this);}
})