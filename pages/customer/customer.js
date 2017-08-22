////获取应用实例
var app = getApp()
var Functions = require('../template/Functions.js');
Page({
  data: {
    // motto: 'Hello World',
    userInfo: {},
    Customer:{},
    LinkShow:{
    iconsize:"20px",
    list:[
     {
        title:'我的权益',
        icon:"../../img/customer/rights_gray.png",
        page:'myrights',
        type:"switchTab"
      },
     {
       title: '激活电子券',
       icon: "../../img/customer/active_gray.png",
       page: 'active',
       type: "navigate"
     },
      {
        title:'个人资料',
        icon:"../../img/customer/mydetail_gray.png",
        page:'mydetail',
        type:"navigate"
        },
      {
        title:'切换账户',
        icon:"../../img/customer/phone_gray.png",
        page:'loginPWD',
        type:"navigate"}
    ]
    }
  },

  onLoad: function () {
    // console.log('CustomerPageonLoad');
     var that = this;
     Functions.InitUserInfo({that:this});
     Functions.LoadImg(that);
      
  },
  onShow: function () {
   
  },
   onReady: function() { 
  // Do something when page ready. 
    
  },
  onBack:function(){
    var that = this;
    Functions.InitUserInfo({ that: this });

  },
  _ImgLoaded: function (e) { Functions._ImgLoaded(e, this); }
})
