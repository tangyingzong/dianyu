// pages/myphone/myphone.js
var app = getApp();
var Functions = require('../template/Functions.js');
Page({
  data:{
    Phone:'',
    ListForm:[[
      {
        label:"手机号码",
        placeholder:"手机号码",
        inputtype:"number",
        confirmtype:"done",
        formname:"Phone",
        bindinput:"PhoneInput"
      },
      {
        label: "验证码",
        placeholder: "验证码",
        inputtype: "number",
        confirmtype: "done",
        button: "获取验证码",
        formname: "Auth_Code",
        buttonbind:"getAuthcode"

      }
      ],
    ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    
    Functions.IsNetConnected();

    app.getUserInfo({
      cb: function (userInfo) {
        // 更新数据
        that.setData({
          userInfo: userInfo
        });
      },
      cust: function (Customer) {
        //更新数据
        that.setData({
          Customer: Customer
        })
      },
      success: function () {
        // IsUserBinded(that.data.Customer);

      },
      LogInFail: function () {
        console.log('LogInFail');
        NetReconnect();
      },
      UsrInfoFail: function () {
        console.log('UsrInfoFail');
        IsUserAuth();
      },
      OpenIdFail: function () {
        console.log('OpenIdFail');
        NetReconnect();
      },
      RequestCustFail: function () {
        console.log('UsrInfoFail');
        NetReconnect();
      }

    });

    Functions.LoadImg(that);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  phoneSubmit:function(e){
    console.log(e.detail.value);
  },
  getAuthcode:function(){
    Functions._AuthCodeGen(this.data.Phone);
  },
  loginSubmit:function(e){
    // console.log(e.detail.value);
    Functions.LoginRequest(e.detail.value);
    // wx.request({
    //   url: 'https://dev.mbeta.pw/bvwebapi/BVSP_CUSTOMER_LOGIN',
    //   data: {
    //     WeChartOpenID: app.globalData.wxopenid,
    //     Phone: e.detail.value.Phone,
    //     Auth_Code:e.detail.value.Auth_Code
    //   },
    //   success: function (data) {
    //     var callback = data.ResultSets[0][0]
    //     if (!callback.ERROR_CODE) {
    //       wx.redirectTo({
    //         url: '../main/main',
    //       })
    //     }
    //     else{
    //       wx.showModal({
    //         content: callback.ERROR_DESC ,
    //         showCancel:false,
    //         confirmText:"确定"
    //       })
    //     }
    //   }
    // });
  },
  RedirectRegister:function(){
    wx.redirectTo({
      url: '../register/register'
    })
  },
  RedirectLoginPWD: function () {
    wx.redirectTo({
      url: '../loginPWD/loginPWD'
    })
  },
  PhoneInput: function (e) {
    this.setData({
      Phone: e.detail.value
    })
  },
  _ImgLoaded: function (e) { Functions._ImgLoaded(e, this); }
})