// pages/mydetail/mydetail.js
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
          disabled: true,
          // button: "修改绑定",
          // buttonbind: "exchangePhone"
        },
        {
          label: "姓名",
          inputtype: "text",
          confirmtype: "done",
          formname: "Customer_Name"
        },
        {
          label: "邮箱",
          inputtype: "text",
          confirmtype: "done",
          formname: "Email"
        },
        {
          label: "地址",
          inputtype: "text",
          confirmtype: "done",
          formname: "Address"
        }

      ]
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    Functions.InitUserInfo({
      that:this,
      success:function(){
        var NewList = that.data.ListForm;
        NewList[0][0].value = that.data.Customer.Phone;
        NewList[0][1].value = that.data.Customer.Customer_Name;
        // NewList[0][2].value = that.data.Customer.Email;
        NewList[0][3].value = that.data.Customer.Address;
        that.setData({
          ListForm: NewList
        });
      }
    });
    
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
  // exchangePhone: function () {
  //   wx.navigateTo({
  //     url: '../myphone/myphone'
  //   })
  // },
  mydetailSubmit:function(e){
    // console.log(e.detail.value);
    Functions.SaveCustomerDetail(e.detail.value);
  },
  _ImgLoaded: function (e) { Functions._ImgLoaded(e, this); }
})