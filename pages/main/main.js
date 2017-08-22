var app = getApp();
var Functions = require('../template/Functions.js');
Page({
  data: {
    // text:"这是一个页面"
    userInfo: null,
    Customer: null,
    products: [],
    ItemShow: {
      productList: [],
      productBlock: [],
      MainItemList: [
        {
          MainItemID: 0,
          MainItemUrl: "myrights",
          MainItemImage: "../../img/main/rights_orange.png",
          MainItemName: "我的权益",
          type: "switchTab"
        },
        {
          MainItemID: 1,
          MainItemUrl: "mydetail",
          MainItemImage: "../../img/main/mydetail_gray.png",
          MainItemName: "个人资料",
          type: "navigate"
        },
        {
          MainItemID: 2,
          MainItemUrl: "active",
          MainItemImage: "../../img/main/active_blue.png",
          MainItemName: "激活电子券",
          type: "navigate"
        },
        {
          MainItemID: 3,
          MainItemUrl: "loginPWD",
          MainItemImage: "../../img/main/phone_green.png",
          MainItemName: "登录/切换账户",
          type: "navigate"
        }

      ]
    },
    imgUrls: [

      "../../img/swiper1.jpg",
      "../../img/swiper2.jpg",
      "../../img/swiper3.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    currentProduct: []
  },

  onLoad: function () {
    var that = this;
    Functions.InitUserInfo({that:this});
    


    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });


    //  app.SearchCustomer(function (Customer) {
    //    that.setData({
    //      Customer: Customer
    //    })
    //  });

  },
  onBack:function(){
    var that = this;
    Functions.InitUserInfo({ that: this });

  },
  /** 
    * 滑动切换tab 
    */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }



})

