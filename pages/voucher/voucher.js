////获取应用实例
var app = getApp()
var Functions = require('../template/Functions.js');

Page({
  data: {
    // motto: 'Hello World',
    userInfo: {},
    Customer: {},
    LinkShow: {
      iconsize: "80px",
      parameter:"Product_ID",
      imgpreUrl:'../../img/prod/loading.jpg',
      list: [
        // {
        //   title:'长沙酒店自助餐双免',
        //   desc:'共3次，已使用2次，未使用1次',
        //   icon:"../../img/prod/1.jpg",
        //   page:'product',
        //   id:'1',
        //   type:"navigate"
        // },
        // {
        //   title: '长沙酒店自助餐2免1',
        //   desc:'共6次，已使用2次，未使用4次',
        //   icon: "../../img/prod/2.jpg",
        //   page: 'product',
        //   id: '2',
        //   type: "navigate"
        // }
      ],
      button:[
        {
          label:'查看抵用券',
          tap:'voucher_detail',
          type:'primary',
          color:'#0061b0'
        },
        {
          label: '权益详情',
          tap: 'product_detail',
          type: 'default'
        }

      ]
    }
  },

  onLoad: function (option) {
    console.log(option);
    var PIN_Code = option.PIN_Code;
    var Product_ID = option.Product_ID;
    // this.data.PIN_Code = PIN_Code;
    var that = this;
    Functions.InitUserInfo({
      that: this ,
      success:function () {

        
        Functions.SearchVoucher(that, Product_ID, PIN_Code)
        // console.log("Campain" + Campain)
        }
      });
       Functions.LoadImg(that);



  },
  onShow: function () {

  },
  onReady: function () {
      // Do something when page ready. 

  },
  product_detail:function(e){
    console.log(e.currentTarget.dataset.id);
    var Product_ID = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../product/product?Product_ID=' + Product_ID
    });
  },
  voucher_detail: function (e) {
    var Product_ID = e.currentTarget.dataset.id;
    var PIN_Code = this.data.PIN_Code;
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../voucher/voucher?Product_ID=' + Product_ID + '&PIN_Code=' + PIN_Code
    });
  },
  _ImgListLoaded: function (e) { Functions._ImgListLoaded(e, this); },
  _ImgLoaded: function (e) { Functions._ImgLoaded(e, this); }
 
})
