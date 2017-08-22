// pages/detail/detail.js
var app = getApp();
var Functions = require('../template/Functions.js');
Page({
  data:{
    CampaignId:null,
    CampaignDetail:{},
    // CartList:[],
    // CartData:{
    //   CartList:[],
    //   Amt:0,
    //   sumQTY:0,
    //   },
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    winWidth: 0,  
    winHeight: 0, 
    currentTab:0,
    isFavorite:0    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var that=this;
    this.data.Product_ID =options.Product_ID;
    that.setData({ 
      imgUrls: ["../../img/prod/" + options.Product_ID+".jpg"]
      });
    Functions.InitUserInfo({
      that: that,
      success: function () {

        var Product_ID = options.Product_ID;
        Functions.SearchProductDetail(that,Product_ID)
        // console.log("Campain" + Campain)
      }
    });
   
    // console.log(that.data.ProductId);
     wx.getSystemInfo( {  
  
      success: function( res ) {  
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
      }  
    });




    //  wx.request({
    //   url:  'https://dev.mbeta.pw/api/WebAPI/ws_SearchProducts_ByID/json',      
    //   data: {
    //     prodid:that.data.ProductId
    //   },
    //   header: {
    //       'content-type': 'application/json'
    //   },
    //   success: function(res) {
    //     // console.log(res.data.ResultSets[0]);
    //      that.setData({
    //          ProductDetail:res.data.ResultSets[0][0],
    //          imgUrls:[res.data.ResultSets[0][0].ProductImage]
    //      });
        
    //     // that.setData({
    //     //   ItemShow:{
    //     //     productList:res.data.ResultSets[0],
    //     //     productBlock:res.data.ResultSets[0]
    //     //   }
    //     // });
 
    //   }
    // });

    // wx.request({
    //   url: 'https://dev.mbeta.pw/api/WebAPI/ws_SearchCustFavorite_ExistsOrNot/json',
    //   data: {
    //     CustCode:app.globalData.wxopenid,
    //     ProdID:that.data.ProductId
    //   },
    //   header: {
    //       'content-type': 'application/json'
    //   },
    //   success: function(res){
    //   //  console.log(res.data.ResultSets[0][0].FavoriteFlag)
    //     // success
    //      that.setData({
    //        isFavorite:res.data.ResultSets[0][0].FavoriteFlag
    //      });
    //   }
   
    // });
    // Functions.searchCart(that,-1);

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
   /** 
     * 滑动切换tab 
     */  
  bindChange: function( e ) {  
  
    var that = this;  
    that.setData( { currentTab: e.detail.current });  
  
  },  
  /** 
   * 点击tab切换 
   */  
  swichNav: function( e ) {  
  
    var that = this;  
  
    if( that.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current  
      })  
    }  
  }
});


