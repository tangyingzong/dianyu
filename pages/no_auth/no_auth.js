// pages/no_auth/no_auth.js
var app = getApp();
var Functions = require('../template/Functions.js');
Page({


  /**
   * 页面的初始数据
   */
  data: {
  
  },
  get_auth:function(){
    var that=this
    wx.openSetting({
      scope: 'scope.userInfo',
      complete:function(){
        app.getUserInfo({
          success: function () {

            wx.reLaunch({
              url: '../main/main'
            })

          },
          UsrInfoFail: function () {
            Functions.IsUserAuth();
          }
        });
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})