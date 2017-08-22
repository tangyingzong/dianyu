// pages/myphone/myphone.js
var app = getApp();
var Functions = require('../template/Functions.js');
Page({
  data:{
    ListForm:[[
      {
        label:"手机号码",
        placeholder:"手机号码",
        inputtype:"number",
        confirmtype:"done",
        formname:"Phone"
      },
      {
        label: "密码",
        placeholder: "密码",
        inputtype: "text",
        confirmtype: "done",
        password:true,
        // button: "获取验证码",
        formname: "Password"
        // buttonbind:"getAuthcode"

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
    
  },
  loginSubmit:function(e){
    // console.log(e.detail.value);
    // wx.request({
    //   url: 'https://dev.mbeta.pw/bvwebapi/BVSP_CUSTOMER_LOGIN',
    //   data: {
    //     WeChartOpenID: app.globalData.wxopenid,
    //     Phone: e.detail.value.Phone,
    //     Password: e.detail.value.Password
    //   },
    //   success: function (data) {
    //     var callback=data.ResultSets[0][0]
    //     if (!callback.ERROR_CODE){
    //       wx.redirectTo({
    //         url: '../main/main',
    //       })
    //     }
    //   }
    // })
    Functions.LoginRequest(e.detail.value);
  },
  RedirectRegister:function(){
    wx.redirectTo({
      url: '../register/register'
    })
  },
  RedirectLogin: function () {
    wx.redirectTo({
      url: '../login/login'
    })
  },
  _ImgLoaded: function (e) { Functions._ImgLoaded(e, this); }
})