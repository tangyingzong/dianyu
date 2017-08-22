//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function ({ cb, cust, success, LogInFail, UsrInfoFail, OpenIdFail, RequestCustFail }) {
    var that = this;
    if (that.globalData.userInfo && that.globalData.wxopenid && that.globalData.Customer.status == "true") {
      typeof cb == "function" && cb(that.globalData.userInfo);
      typeof cust == "function" && cust(that.globalData.Customer);
      typeof success == "function" && success();
      console.log("No need request");
    }
    else if (that.globalData.userInfo && that.globalData.wxopenid) {
      typeof cb == "function" && cb(that.globalData.userInfo);
      console.log("Just requewt customer");
      if (that.globalData.Customer.status != "true") {

        wx.request({
          url: 'https://dev.mbeta.pw/bvwebapi/BVSP_CUSTOMER_SEARCH',
          data: {
            WeChartOpenID: that.globalData.wxopenid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log('request customer');
            if (res.data.ResultSets[0].length == 1) {

              that.globalData.Customer = res.data.ResultSets[0][0]
              that.globalData.Customer.status = "true"
              console.log("=1");
            }
            else if (res.data.ResultSets[0].length == 0) {
              that.globalData.Customer = { status: "false" }
              console.log("=0");
            }
            else if (res.data.ResultSets[0].length > 1) {
              that.globalData.Customer = { status: "error" }
              console.log(">1");
            }
            console.log(that.globalData.Customer);
            typeof cust == "function" && cust(that.globalData.Customer);
            typeof success == "function" && success();
          },
          fali: function () {
            typeof RequestCustFail == "function" && RequestCustFail();
          }
        });

      }
    }
    else {
      console.log("init all");
      //调用登录接口
      wx.login({
        success: function (ss) {
        console.log("request wx login")
          wx.getUserInfo({
            success: function (res) {
              console.log("request wx getUserInfo")
              that.globalData.userInfo = res.userInfo;
              that.globalData.userInfo.imgpreUrl ="../../../img/usr.jpg";
              typeof cb == "function" && cb(that.globalData.userInfo);
              var appid = 'wxed35a7360298c7d7'; //填写微信小程序appid 
              var secret = 'd55f219cd68ded41a98787963b6d9103'; //填写微信小程序secret
              wx.request({
                url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + ss.code + "&grant_type=authorization_code",
                header: {
                  'content-type': 'application/json'
                },
                success: function (sss) {
                  that.globalData.wxopenid = sss.data.openid;
                  console.log('request wx getOpenid');
                  // console.log("setOpenID:"+that.globalData.wxopenid); //获取openid  
                  
                    wx.request({
                      url: 'https://dev.mbeta.pw/bvwebapi/BVSP_CUSTOMER_SEARCH',
                      data: {
                        WeChartOpenID: that.globalData.wxopenid
                      },
                      header: {
                        'content-type': 'application/json'
                      },
                      success: function (res) {
                        console.log('request customer');
                        if (res.data.ResultSets[0].length == 1) {

                          that.globalData.Customer = res.data.ResultSets[0][0]
                          that.globalData.Customer.status = "true"
                          console.log("=1");
                        }
                        else if (res.data.ResultSets[0].length == 0) {
                          that.globalData.Customer = { status: "false" }
                          console.log("=0");
                        }
                        else if (res.data.ResultSets[0].length > 1) {
                          that.globalData.Customer = { status: "error" }
                          console.log(">1");
                        }
                        console.log(that.globalData.Customer);
                        typeof cust == "function" && cust(that.globalData.Customer);
                        typeof success == "function" && success();
                      },
                      fali: function () {
                        typeof RequestCustFail == "function" && RequestCustFail();
                      }
                    });
                },
                fail: function () {

                  typeof OpenIdFail == "function" && OpenIdFail();
                }
              });
            },
            fail: function () {

              typeof UsrInfoFail == "function" && UsrInfoFail();
            }
          });
        },
        fail: function () {
          typeof LogInFail == "function" && LogInFail();
        }
      });
    }
  },



  globalData: {
    userInfo: null,
    Customer: { status: null }
  }


});
