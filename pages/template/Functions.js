var app = getApp();
var Md5=require('./Md5.js');
var barcode = require('./barcode');
var qrcode = require('./qrcode');

function convert_length(length) {
  return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
}

function barcodeShow(id, code, width, height) {
  barcode.code128(wx.createCanvasContext(id), code, convert_length(width), convert_length(height))
}

function qrcodeShow(id, code, width, height) {
  qrcode.api.draw(code, {
    ctx: wx.createCanvasContext(id),
    width: convert_length(width),
    height: convert_length(height)
  })
}



function IsUserAuth() {
  wx.getSetting({
    success: function (res) {
      if (!res.authSetting['scope.userInfo']) {

        wx.redirectTo({
          url: '../no_auth/no_auth'
        });
      }
    }

  });

}

function IsUserBinded(cust) {
  if (cust) {
    if (cust.status != 'true') {
      wx.redirectTo({
        url: '../login/login'
      });
    }
  }
  else {
    wx.redirectTo({
      url: '../login/login'
    });
  }
}
function NetReconnect() {
  wx.redirectTo({
    url: '../no_net/no_net'
  });
}

function IsNetConnected() {
  wx.getNetworkType({
    success: function (res) {
      if (res.networkType == 'none') {
        NetReconnect();
      }
      else {
        wx.onNetworkStatusChange(function (res) {
          if (!res.isConnected)
            NetReconnect();
        })
      }
    },
    fail: function () {
      NetReconnect();
    }
  });
}

function InitUserInfo({ that, success }) {
  wx.showLoading({
    title: 'loading...',
    mask: true

  });
  IsNetConnected();


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
      IsUserBinded(that.data.Customer);
      wx.hideLoading();
      typeof success == "function" && success();
    },
    LogInFail: function () {
      console.log('WXLogInFail');
      NetReconnect();
      wx.hideLoading();
    },
    UsrInfoFail: function () {
      console.log('UsrInfoFail');
      IsUserAuth();
      wx.hideLoading();
    },
    OpenIdFail: function () {
      console.log('OpenIdFail');
      NetReconnect();
      wx.hideLoading();
    },
    RequestCustFail: function () {
      console.log('UsrInfoFail');
      NetReconnect();
      wx.hideLoading();
    }

  });

}
function LoginRequest(data) {
  wx.showLoading({
    title: 'loading...',
    mask: true

  });
  if (data.hasOwnProperty('Phone')) {
    var phone_Format = /^1[0-9]{10}$/;
    if (!(phone_Format.test(data.Phone))) {
      wx.hideLoading();
      wx.showModal({
        content: '请输入正确的11位手机号码',
        showCancel: false,
        confirmText: "确定"
      });
    }
    else if (data.Password == ""){
      wx.hideLoading();
      wx.showModal({
        content: '密码不能为空',
        showCancel: false,
        confirmText: "确定"
      });
    }
    else {
      if (!data.hasOwnProperty('Auth_Code') && data.hasOwnProperty('Password')) {
        var send = {
          WeChartOpenID: app.globalData.wxopenid,
          Phone: data.Phone,
          Password: Md5.hexMD5(data.Password)
        }
      }
      else if (data.hasOwnProperty('Auth_Code') && !data.hasOwnProperty('Password')) {
        var send = {
          WeChartOpenID: app.globalData.wxopenid,
          Phone: data.Phone,
          Auth_Code: data.Auth_Code
        }
      }
      else {
        console.log('登录参数request错误');
        wx.hideLoading();
        return
      }
      // console.log(send);
      wx.request({
        url: 'https://dev.mbeta.pw/bvwebapi/BVSP_CUSTOMER_LOGIN',
        data: send,
        success: function (result) {
          var callback = result.data.ResultSets[0][0]
          console.log(callback);
          if (!callback.ERROR_CODE) {
            app.globalData.Customer = { status: null };
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              mask: true
            });
            wx.reLaunch({
              url: '../customer/customer'
            });
          }
          else {
            wx.hideLoading();
            wx.showModal({
              content: callback.ERROR_DESC,
              showCancel: false,
              confirmText: "确定"
            });
          }
        },
        fail: function () {
          console.log('LogInFail');
          NetReconnect();
          wx.hideLoading();
        }
      });
    }
  }
  else {
    console.log('登录参数request错误');
    wx.hideLoading();
    return
  }
}


function RegisterRequest(data) {
  wx.showLoading({
    title: 'loading...',
    mask: true

  });
  if (data.hasOwnProperty('Phone')) {
    var phone_Format = /^1[0-9]{10}$/;
    if (!(phone_Format.test(data.Phone))) {
      wx.hideLoading();
      wx.showModal({
        content: '请输入正确的11位手机号码',
        showCancel: false,
        confirmText: "确定"
      });
    }
    else if (data.Password == "" || data.Password == null) {
      wx.hideLoading();
      wx.showModal({
        content: '密码不能为空',
        showCancel: false,
        confirmText: "确定"
      });
    }
    else {
      // console.log(send);
      wx.request({
        url: 'https://dev.mbeta.pw/bvwebapi/BVSP_CUSTOMER_REGISTER',
        data: {
          WeChartOpenID: app.globalData.wxopenid,
          Phone: data.Phone,
          Password: Md5.hexMD5(data.Password),
          Auth_Code: data.Auth_Code
        },
        success: function (result) {
          var callback = result.data.ResultSets[0][0]
          console.log(callback);
          if (!callback.ERROR_CODE) {
            app.globalData.Customer = { status: null };
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              mask: true
            });
            wx.reLaunch({
              url: '../customer/customer'
            });
          }
          else {
            wx.hideLoading();
            wx.showModal({
              content: callback.ERROR_DESC,
              showCancel: false,
              confirmText: "确定"
            });
          }
        },
        fail: function () {
          console.log('LogInFail');
          NetReconnect();
          wx.hideLoading();
        }
      });
    }
  }
  else {
    console.log('登录参数request错误');
    wx.hideLoading();
  }
}


function SaveCustomerDetail(data) {
  console.log(data);
  wx.showLoading({
    title: 'loading...',
    mask: true
  });
  wx.request({
    url: 'https://dev.mbeta.pw/bvwebapi/BVSP_CUSTOMER_UPDATE',
    data: {
      WeChartOpenID: app.globalData.wxopenid,
      Customer_Name: data.Customer_Name,
      Phone: data.Phone,
      Address: data.Address
    },
    success: function (result) {
      var callback = result.data.ResultSets[0][0]
      console.log(callback);
      if (!callback.ERROR_CODE) {
        app.globalData.Customer = { status: null };
        // app.globalData.Customer = callback;
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          mask: true
        });
        // InitUserInfo({that:this})
        wx.reLaunch
          ({
            url: '../customer/customer'
          });
      }
      else {
        wx.hideLoading();
        wx.showModal({
          content: callback.ERROR_DESC,
          showCancel: false,
          confirmText: "确定"
        });
      }
    },
    fail: function () {
      console.log('SaveCustomerFail');
      NetReconnect();
      wx.hideLoading();
    }
  });
}

function ActivePinCode(data) {

  console.log(data);
  wx.showLoading({
    title: 'loading...',
    mask: true
  });
  wx.request({
    url: 'https://dev.mbeta.pw/bvwebapi/BVSP_VOUCHER_GENERATE',
    data: {
      Phone: data.Phone,
      PIN_Code: data.PIN_Code
    },
    success: function (result) {
      var callback = result.data.ResultSets[0][0]
      console.log(callback);
      if (!callback.ERROR_CODE) {
        wx.showToast({
          title: '激活成功',
          icon: 'success',
          mask: true
        });
        wx.reLaunch({
          url: '../myrights/myrights'
        });
      }
      else {
        wx.hideLoading();
        wx.showModal({
          content: callback.ERROR_DESC,
          showCancel: false,
          confirmText: "确定"
        });
      }
    },
    fail: function () {
      console.log('ActiveFail');
      NetReconnect();
      wx.hideLoading();
    }
  });
}
function SearchCustomerCampaign(that, Phone) {
  wx.showLoading({
    title: 'loading...',
    mask: true
  });
  wx.request({
    url: 'https://dev.mbeta.pw/bvwebapi/BVSP_CUSTOMER_CAMPAIGN_SEARCH',
    data: {
      Phone: Phone
    },
    success: function (result) {
      var data = result.data.ResultSets;
      console.log(data)
      if (data.length > 0 && data != null) {
        if (!data[0][0].ERROR_CODE) {
          // callback = data;
          var LinkShow = that.data.LinkShow;
          var list=[];
          // var list = that.data.LinkShow.list;
           console.log(data[0][0].Campaign_Name);
          for (var campainrow in data) {
            var listrow={};
            listrow.title = data[campainrow][0].Campaign_Name;
            listrow.icon = "../../img/camp/" + data[campainrow][0].Campaign_ID + ".jpg";
            listrow.page = 'campaign';
            listrow.type = "navigate";
            listrow.id = data[campainrow][0].PIN_Code;
            var desc='';
            for (var productrow in data[campainrow]) {
              desc = desc+' ' + data[campainrow][productrow].Refernce_Name + data[campainrow][productrow].Quantity + '次';
              listrow.desc = desc;
            }
            listrow.desc = listrow.desc + '\n订单号/激活码：' + data[campainrow][0].PIN_Code;
            list.push(listrow);
          }
          LinkShow.list=list;
          that.setData({
            LinkShow: LinkShow
          });
          LoadImgList(that);
          wx.hideLoading();
          
        }
        else {
          wx.hideLoading();
          // callback = data;
          wx.showModal({
            content: result.data.ResultSets[0][0].ERROR_DESC,
            showCancel: false,
            confirmText: "确定"
          });

        }
      }
      else {
        wx.hideLoading();
        console.log('SearchCustomerCampainFail');
        // callback=[];
      }
    },
    fail: function () {
      console.log('SearchCustomerCampainFail');
      NetReconnect();
      wx.hideLoading();
    }
  });
}

function SearchCampaignProduct(that,Customer_ID,PIN_Code){

  wx.showLoading({
    title: 'loading...',
    mask: true
  });
  wx.request({
    url: 'https://dev.mbeta.pw/bvwebapi/BVSP_CUSTOMER_CAMPAIGN_PRODUCT_SEARCH',
    data: {
      Customer_ID: Customer_ID,
      PIN_Code: PIN_Code

    },
    success: function (result) {
      var data = result.data.ResultSets[0];
      console.log(data)
      if (data.length > 0 && data != null) {
        if (!data[0].ERROR_CODE) {
          // callback = data;
          var LinkShow = that.data.LinkShow;
          var list = [];
          // var list = that.data.LinkShow.list;
          console.log(data[0].Campaign_Name);
          for (var productrow in data) {
            var listrow = {};
            listrow.title = data[productrow].Campaign_Name;
            listrow.title = listrow.title + '·' + data[productrow].Refernce_Name;

            listrow.icon = "../../img/prod/" + data[productrow].Product_ID + ".jpg";
            listrow.page = 'product';
            listrow.type = "navigate";
            listrow.id = data[productrow].Product_ID
            listrow.desc = '共' + data[productrow].Quantity + '次，已消费' + data[productrow].QTY_Used + '次，未使用' + data[productrow].QTY_NotUsed +'次';            list.push(listrow);
          }
          LinkShow.list = list;
          that.setData({
            LinkShow: LinkShow
          });
          LoadImgList(that);
          wx.hideLoading();

        }
        else {
          wx.hideLoading();
          // callback = data;
          wx.showModal({
            content: result.data.ResultSets[0][0].ERROR_DESC,
            showCancel: false,
            confirmText: "确定"
          });

        }
      }
      else {
        wx.hideLoading();
        console.log('Campain_product search fail');
        // callback=[];
      }
    },
    fail: function () {
      console.log('Campain_product search fail');
      NetReconnect();
      wx.hideLoading();
    }
  });
}


function SearchProductDetail(that, Product_ID){

  wx.showLoading({
    title: 'loading...',
    mask: true
  });
  wx.request({
    url: 'https://dev.mbeta.pw/bvwebapi/BVSP_PRODUCT_SEARCH_ByID',
    data: {
      Product_ID: Product_ID

    },
    success: function (result) {
      var data = result.data.ResultSets[0][0];
      console.log(data);
      
        if (!data.ERROR_CODE) {
          wx.hideLoading();
         
          

        }
        else {
          wx.hideLoading();
          // callback = data;
          wx.showModal({
            content: result.data.ResultSets[0][0].ERROR_DESC,
            showCancel: false,
            confirmText: "确定"
          });

        }
      
    },
    fail: function () {
      console.log('product detail search fail');
      NetReconnect();
      wx.hideLoading();
    }
  });
}

function SearchVoucher(that, Product_ID, PIN_Code){
  wx.showLoading({
    title: 'loading...',
    mask: true
  });
  wx.request({
    url: 'https://dev.mbeta.pw/bvwebapi/BVSP_VOUCHER_SEARCH_ByCampProd',
    data: {
      Product_ID: Product_ID,
      PIN_Code: PIN_Code


    },
    success: function (result) {
      var data = result.data.ResultSets[0][0];
      // console.log(result);

      if (!data.ERROR_CODE) {
        wx.hideLoading();
        that.setData({
          Voucher_Code: data.Voucher_Code
        });
        barcodeShow('barcode', data.Voucher_Code, 680, 200);
        qrcodeShow('qrcode', data.Voucher_Code, 420, 420);


      }
      else {
        wx.hideLoading();
        // callback = data;
        wx.showModal({
          content: result.data.ResultSets[0][0].ERROR_DESC,
          showCancel: false,
          confirmText: "确定"
        });

      }

    },
    fail: function () {
      console.log('product detail search fail');
      NetReconnect();
      wx.hideLoading();
    }
  });
}


function _AuthCodeGen(Phone){
  wx.showLoading({
    title: 'loading...',
    mask: true
  });
  var phone_Format = /^1[0-9]{10}$/;
  if (!(phone_Format.test(Phone))) {
    wx.hideLoading();
    wx.showModal({
      content: '请输入正确的11位手机号码',
      showCancel: false,
      confirmText: "确定"
    });
  }else{
  wx.request({
    url: 'https://dev.mbeta.pw/bvwebapi/BVSP_AUTHCODE_GENERATE',
    data: {
      Phone: Phone
    },
    success: function (result) {
      var data = result.data.ResultSets[0][0];
      console.log(result);

      if (!data.ERROR_CODE) {
        wx.hideLoading();
        wx.showModal({
          content: '验证码发送成功',
          showCancel: false,
          confirmText: "确定"
        });

      }
      else {
        wx.hideLoading();
        // callback = data;
        wx.showModal({
          content: '验证码发送失败，请重新发送',
          showCancel: false,
          confirmText: "确定"
        });

      }

    },
    fail: function () {
      wx.showModal({
        content: '验证码发送失败，请重新发送',
        showCancel: false,
        confirmText: "确定"
      });
      console.log('Auth code fail');
      NetReconnect();
      wx.hideLoading();
    }
  });}
}

// function SearchList(list, key, value) {
//   for (var row in list) {
//     if (list[row][key] == value) {
//       return list[row];
//     }
//   }
//   return { result: -1 };
// }

function _ImgListLoaded(e, that) {
  var loadid = e.currentTarget.dataset.loadid;
  var LinkShow = that.data.LinkShow;
  for (var key in LinkShow.list) {
    if (LinkShow.list[key].id == loadid) {
      LinkShow.list[key].imgshowUrl = LinkShow.list[key].LoadItem;
      that.setData({
        LinkShow: LinkShow
      });
    }
  }
}

function LoadImgList(that) {
  // that.ImgLoader = new ImgLoader(that);
  var LinkShow = that.data.LinkShow
  for (var row in LinkShow.list) {
    LinkShow.list[row].imgshowUrl = LinkShow.imgpreUrl;
    LinkShow.list[row].LoadItem = LinkShow.list[row].icon;
  }
  that.setData(
    { LinkShow: LinkShow }
  );
}


function _ImgLoaded(e, that) {
  // var loadid = e.currentTarget.dataset.loadid;
  var userInfo = that.data.userInfo;
  userInfo.imgshowUrl = userInfo.LoadItem;
  that.setData({
    userInfo: userInfo
  });
}

function LoadImg(that) {
  // that.ImgLoader = new ImgLoader(that);
  var userInfo = that.data.userInfo;

  userInfo.imgshowUrl = userInfo.imgpreUrl;
  userInfo.LoadItem = userInfo.avatarUrl;

  that.setData(
    { userInfo: userInfo }
  );
}

module.exports = {
  IsUserAuth: IsUserAuth,
  IsUserBinded: IsUserBinded,
  IsNetConnected: IsNetConnected,
  NetReconnect: NetReconnect,
  InitUserInfo: InitUserInfo,
  LoginRequest: LoginRequest,
  RegisterRequest: RegisterRequest,
  SaveCustomerDetail: SaveCustomerDetail,
  ActivePinCode: ActivePinCode,
  SearchCustomerCampaign: SearchCustomerCampaign,
  SearchCampaignProduct:SearchCampaignProduct,
  SearchProductDetail: SearchProductDetail,
  SearchVoucher: SearchVoucher,
  // SearchList: SearchList,
  LoadImgList: LoadImgList,
  _ImgListLoaded: _ImgListLoaded,
  LoadImg: LoadImg,
  _ImgLoaded, _ImgLoaded,
  _AuthCodeGen:_AuthCodeGen,
  barcodeShow: barcodeShow,
  qrcodeShow: qrcodeShow

}