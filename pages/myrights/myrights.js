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
      parameter:"PIN_Code",
      imgpreUrl:'../../img/camp/loading.jpg',
      list: [
        // {
        //   title:'长沙酒店628元自助餐活动',
        //   desc:'双免3次，二免一6次',
        //   icon:"../../img/camp/1.jpg",
        //   page:'campaign',
        //   id:'1',
        //   type:"navigate"
        // },
        // {
        //   title: '上海万豪酒店酒店活动',
        //   desc:'房型升级1次，免早餐1次，住四付三1次',
        //   icon: "../../img/camp/2.jpg",
        //   page: 'campaign',
        //   id: '2',
        //   type: "navigate"
        // }
      ]
    }
  },

  onLoad: function () {
    // console.log('CustomerPageonLoad');
    var that = this;
    var Phone = this.data.Customer.Phone;
    var Campain;
    Functions.InitUserInfo(
      {
        that:this,
        success:function(){

          var Phone = that.data.Customer.Phone;
          Functions.SearchCustomerCampaign(that,Phone);
          console.log("Campain"+Campain)
        }
      }
    );
    // Functions.LoadImgList(that);
    Functions.LoadImg(that);



  },
  onBack:function(){
    var that = this;
    var Phone = this.data.Customer.Phone;
    var callback;
    Functions.InitUserInfo(
      {
        that: this,
        success: function () {

          var Phone = that.data.Customer.Phone;
          Functions.SearchCustomerCampaign(Phone, callback)
        }
      }
    );
    Functions.LoadImgList(that);
    Functions.LoadImg(that);
  },
  onShow: function () {

  },
  onReady: function () {
      // Do something when page ready. 

  },
  _ImgListLoaded: function (e) { Functions._ImgListLoaded(e, this); },
  _ImgLoaded: function (e) { Functions._ImgLoaded(e, this); }
 
})
