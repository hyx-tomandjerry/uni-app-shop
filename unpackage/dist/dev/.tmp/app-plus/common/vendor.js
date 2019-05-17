(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ "../../../../../myapps/common/amap-wx.js":
/*!***********************************!*\
  !*** D:/myapps/common/amap-wx.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function AMapWX(a) {this.key = a.key, this.requestConfig = { key: a.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };}AMapWX.prototype.getWxLocation = function (a, b) {wx.getLocation({ type: "gcj02", success: function success(a) {var c = a.longitude + "," + a.latitude;wx.setStorage({ key: "userLocation", data: c }), b(c);}, fail: function fail(c) {wx.getStorage({ key: "userLocation", success: function success(a) {a.data && b(a.data);} }), a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });}, AMapWX.prototype.getRegeo = function (a) {function c(c) {var d = b.requestConfig;wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: c, extensions: "all", s: d.s, platform: d.platform, appname: b.key, sdkversion: d.sdkversion, logversion: d.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var d, e, f, g, h, i, j, k, l;b.data.status && "1" == b.data.status ? (d = b.data.regeocode, e = d.addressComponent, f = [], g = "", d && d.roads[0] && d.roads[0].name && (g = d.roads[0].name + "附近"), h = c.split(",")[0], i = c.split(",")[1], d.pois && d.pois[0] && (g = d.pois[0].name + "附近", j = d.pois[0].location, j && (h = parseFloat(j.split(",")[0]), i = parseFloat(j.split(",")[1]))), e.provice && f.push(e.provice), e.city && f.push(e.city), e.district && f.push(e.district), e.streetNumber && e.streetNumber.street && e.streetNumber.number ? (f.push(e.streetNumber.street), f.push(e.streetNumber.number)) : (k = "", d && d.roads[0] && d.roads[0].name && (k = d.roads[0].name), f.push(k)), f = f.join(""), l = [{ iconPath: a.iconPath, width: a.iconWidth, height: a.iconHeight, name: f, desc: g, longitude: h, latitude: i, id: 0, regeocodeData: d }], a.success(l)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this;a.location ? c(a.location) : b.getWxLocation(a, function (a) {c(a);});}, AMapWX.prototype.getWeather = function (a) {function d(d) {var e = "base";a.type && "forecast" == a.type && (e = "all"), wx.request({ url: "https://restapi.amap.com/v3/weather/weatherInfo", data: { key: b.key, city: d, extensions: e, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {function c(a) {var b = { city: { text: "城市", data: a.city }, weather: { text: "天气", data: a.weather }, temperature: { text: "温度", data: a.temperature }, winddirection: { text: "风向", data: a.winddirection + "风" }, windpower: { text: "风力", data: a.windpower + "级" }, humidity: { text: "湿度", data: a.humidity + "%" } };return b;}var d, e;b.data.status && "1" == b.data.status ? b.data.lives ? (d = b.data.lives, d && d.length > 0 && (d = d[0], e = c(d), e["liveData"] = d, a.success(e))) : b.data.forecasts && b.data.forecasts[0] && a.success({ forecast: b.data.forecasts[0] }) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}function e(e) {wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: e, extensions: "all", s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, e;b.data.status && "1" == b.data.status ? (e = b.data.regeocode, e.addressComponent ? c = e.addressComponent.adcode : e.aois && e.aois.length > 0 && (c = e.aois[0].adcode), d(c)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.city ? d(a.city) : b.getWxLocation(a, function (a) {e(a);});}, AMapWX.prototype.getPoiAround = function (a) {function d(d) {var e = { key: b.key, location: d, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.querytypes && (e["types"] = a.querytypes), a.querykeywords && (e["keywords"] = a.querykeywords), wx.request({ url: "https://restapi.amap.com/v3/place/around", data: e, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, d, e, f;if (b.data.status && "1" == b.data.status) {if (b = b.data, b && b.pois) {for (c = [], d = 0; d < b.pois.length; d++) {e = 0 == d ? a.iconPathSelected : a.iconPath, c.push({ latitude: parseFloat(b.pois[d].location.split(",")[1]), longitude: parseFloat(b.pois[d].location.split(",")[0]), iconPath: e, width: 22, height: 32, id: d, name: b.pois[d].name, address: b.pois[d].address });}f = { markers: c, poisData: b.pois }, a.success(f);}} else a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.location ? d(a.location) : b.getWxLocation(a, function (a) {d(a);});}, AMapWX.prototype.getStaticmap = function (a) {function f(b) {c.push("location=" + b), a.zoom && c.push("zoom=" + a.zoom), a.size && c.push("size=" + a.size), a.scale && c.push("scale=" + a.scale), a.markers && c.push("markers=" + a.markers), a.labels && c.push("labels=" + a.labels), a.paths && c.push("paths=" + a.paths), a.traffic && c.push("traffic=" + a.traffic);var e = d + c.join("&");a.success({ url: e });}var e,b = this,c = [],d = "https://restapi.amap.com/v3/staticmap?";c.push("key=" + b.key), e = b.requestConfig, c.push("s=" + e.s), c.push("platform=" + e.platform), c.push("appname=" + e.appname), c.push("sdkversion=" + e.sdkversion), c.push("logversion=" + e.logversion), a.location ? f(a.location) : b.getWxLocation(a, function (a) {f(a);});}, AMapWX.prototype.getInputtips = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.location && (d["location"] = a.location), a.keywords && (d["keywords"] = a.keywords), a.type && (d["type"] = a.type), a.city && (d["city"] = a.city), a.citylimit && (d["citylimit"] = a.citylimit), wx.request({ url: "https://restapi.amap.com/v3/assistant/inputtips", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.tips && a.success({ tips: b.data.tips });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getDrivingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.waypoints && (d["waypoints"] = a.waypoints), a.avoidpolygons && (d["avoidpolygons"] = a.avoidpolygons), a.avoidroad && (d["avoidroad"] = a.avoidroad), wx.request({ url: "https://restapi.amap.com/v3/direction/driving", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths, taxi_cost: b.data.route.taxi_cost || "" });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getWalkingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v3/direction/walking", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getTransitRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.city && (d["city"] = a.city), a.cityd && (d["cityd"] = a.cityd), wx.request({ url: "https://restapi.amap.com/v3/direction/transit/integrated", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {if (b && b.data && b.data.route) {var c = b.data.route;a.success({ distance: c.distance || "", taxi_cost: c.taxi_cost || "", transits: c.transits });}}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getRidingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v4/direction/bicycling", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.data && a.success({ paths: b.data.data.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, module.exports.AMapWX = AMapWX;

/***/ }),

/***/ "../../../../../myapps/common/http.js":
/*!********************************!*\
  !*** D:/myapps/common/http.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.ajax = void 0;var url = "http://192.168.10.22/services?f=";
// let url='http://192.168.10.58:8080/blade/services?f='
var ajax = function ajax(api, param, resp) {var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  if (a) {
    uni.getStorage({
      key: 'userInfo',
      success: function success(res) {
        if (!res.data.session) {
          uni.showToast({
            title: '没有本地记录，请重新登录',
            icon: 'none' });

          return;
        }
        var baseParam = {
          owner: res.data.owner,
          session: res.data.session,
          userId: res.data.id };

        httpMethod(api, param, baseParam, resp);
      },
      fail: function fail() {
        console.log('kkkkkkkkkk', " at common\\http.js:23");
      } });

  } else {
    var baseParam = {};
    httpMethod(api, param, baseParam, resp);
  }
};exports.ajax = ajax;
var httpMethod = function httpMethod(api, param, baseParam, resp) {
  uni.request({
    url: url + api,
    data: Object.assign(param, baseParam),
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' },

    success: function success(data) {
      if (data.statusCode == 200) {
        resp(data.data.data);
      } else {
        uni.showToast({
          title: '调用接口失败',
          icon: 'none' });

      }

    } });

};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["default"]))

/***/ }),

/***/ "../../../../../myapps/main.js":
/*!*************************!*\
  !*** D:/myapps/main.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ "../../../../../myapps/App.vue"));





var _index = _interopRequireDefault(__webpack_require__(/*! ./store/index.js */ "../../../../../myapps/store/index.js"));

var _onfire = _interopRequireDefault(__webpack_require__(/*! onfire.js */ "../../../../../myapps/node_modules/onfire.js/lib/index.js"));

var _webim = _interopRequireDefault(__webpack_require__(/*! ./static/js/webim.js */ "../../../../../myapps/static/js/webim.js"));
var _http = __webpack_require__(/*! ./common/http.js */ "../../../../../myapps/common/http.js");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}_vue.default.config.productionTip = false;var cuCustom = function cuCustom() {return __webpack_require__.e(/*! import() | colorui/components/cu-custom */ "colorui/components/cu-custom").then(__webpack_require__.bind(null, /*! ./colorui/components/cu-custom.vue */ "../../../../../myapps/colorui/components/cu-custom.vue"));};_vue.default.component('cu-custom', cuCustom);_App.default.mpType = 'app';_vue.default.prototype.$store = _index.default;_vue.default.prototype.$fire = new _onfire.default();
_vue.default.prototype.$ajax = _http.ajax;
//管道
_vue.default.filter('repairStatus', function (value) {
  if (!value) return '';
  return _index.default.state.repairStatusZn[value];
});
_vue.default.filter('repairStatusColor', function (value) {
  if (!value) return '';
  return _index.default.state.repairStatusColor[value];
});
_vue.default.filter('color', function (value) {
  return 'bg-gray';
});
_vue.default.prototype.format = function (value, type) {
  var dataTime = "";
  var data = new Date();
  data.setTime(value);
  var year = data.getFullYear();
  var month = data.getMonth() + 1 < 10 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
  var day = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
  var hour = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
  var minute = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
  var second = data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds();
  if (type == "YMD") {
    dataTime = year + "-" + month + "-" + day;
  } else if (type == "YMDHMS") {
    dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  } else if (type == "HMS") {
    dataTime = hour + ":" + minute + ":" + second;
  } else if (type == "YM") {
    dataTime = year + "-" + month;

  }
  return dataTime; //将格式化后的字符串输出到前端显示
};
_vue.default.filter('formatTime', function (value, type) {
  var dataTime = "";
  var data = new Date();
  data.setTime(value);
  var year = data.getFullYear();
  var month = data.getMonth() + 1 < 10 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
  var day = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
  var hour = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
  var minute = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
  var second = data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds();
  if (type == "YMD") {
    dataTime = year + "-" + month + "-" + day;
  } else if (type == "YMDHMS") {
    dataTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  } else if (type == "HMS") {
    dataTime = hour + ":" + minute + ":" + second;
  } else if (type == "YM") {
    dataTime = year + "-" + month;

  }
  return dataTime; //将格式化后的字符串输出到前端显示
});

//代办通知显示类型
_vue.default.filter('todoType', function (value) {
  return _index.default.state.noticeTypeZn[value];
});
//代办通知显示类型颜色
_vue.default.filter('todoTypeColor', function (value) {
  return _index.default.state.noticeTypeColor[value];
});
var app = new _vue.default(_objectSpread({},
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createApp"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Fall-item-content%2Fdetail-content%2Fdetail-content\"}":
/*!***********************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Fall-item-content%2Fdetail-content%2Fdetail-content"} ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _detailContent = _interopRequireDefault(__webpack_require__(/*! ./pages/all-item-content/detail-content/detail-content.vue */ "../../../../../myapps/pages/all-item-content/detail-content/detail-content.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_detailContent.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Fall-item-content%2Findex-more%2Findex-more\"}":
/*!***************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Fall-item-content%2Findex-more%2Findex-more"} ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _indexMore = _interopRequireDefault(__webpack_require__(/*! ./pages/all-item-content/index-more/index-more.vue */ "../../../../../myapps/pages/all-item-content/index-more/index-more.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_indexMore.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Flogin-design%2Fdesign%2Fdesign\"}":
/*!***************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Flogin-design%2Fdesign%2Fdesign"} ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _design = _interopRequireDefault(__webpack_require__(/*! ./pages/login-design/design/design.vue */ "../../../../../myapps/pages/login-design/design/design.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_design.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Flogin-design%2Ffind-password%2Ffind-password\"}":
/*!*****************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Flogin-design%2Ffind-password%2Ffind-password"} ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _findPassword = _interopRequireDefault(__webpack_require__(/*! ./pages/login-design/find-password/find-password.vue */ "../../../../../myapps/pages/login-design/find-password/find-password.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_findPassword.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Flogin-design%2Flogin%2Flogin\"}":
/*!*************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Flogin-design%2Flogin%2Flogin"} ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _login = _interopRequireDefault(__webpack_require__(/*! ./pages/login-design/login/login.vue */ "../../../../../myapps/pages/login-design/login/login.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_login.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Flogin-design%2Freset-password%2Freset-password\"}":
/*!*******************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Flogin-design%2Freset-password%2Freset-password"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _resetPassword = _interopRequireDefault(__webpack_require__(/*! ./pages/login-design/reset-password/reset-password.vue */ "../../../../../myapps/pages/login-design/reset-password/reset-password.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_resetPassword.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item%2Findex%2Findex\"}":
/*!*********************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item%2Findex%2Findex"} ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item/index/index.vue */ "../../../../../myapps/pages/tab-item/index/index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item%2Fmessage%2Fmessage\"}":
/*!*************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item%2Fmessage%2Fmessage"} ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _message = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item/message/message.vue */ "../../../../../myapps/pages/tab-item/message/message.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_message.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item%2Fmine%2Fmine\"}":
/*!*******************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item%2Fmine%2Fmine"} ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _mine = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item/mine/mine.vue */ "../../../../../myapps/pages/tab-item/mine/mine.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_mine.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item%2Fwork%2Fwork\"}":
/*!*******************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item%2Fwork%2Fwork"} ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _work = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item/work/work.vue */ "../../../../../myapps/pages/tab-item/work/work.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_work.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fmessage-center%2Fchat%2Fchat\"}":
/*!********************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fmessage-center%2Fchat%2Fchat"} ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _chat = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/message-center/chat/chat.vue */ "../../../../../myapps/pages/tab-item-content/message-center/chat/chat.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_chat.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fmessage-center%2Fgroup-list%2Fgroup-list\"}":
/*!********************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fmessage-center%2Fgroup-list%2Fgroup-list"} ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _groupList = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/message-center/group-list/group-list.vue */ "../../../../../myapps/pages/tab-item-content/message-center/group-list/group-list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_groupList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fmine-center%2Faccount-manager%2Faccount-manager\"}":
/*!***************************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fmine-center%2Faccount-manager%2Faccount-manager"} ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _accountManager = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/mine-center/account-manager/account-manager.vue */ "../../../../../myapps/pages/tab-item-content/mine-center/account-manager/account-manager.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_accountManager.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fmine-center%2Fbasic-setting%2Fbasic-setting\"}":
/*!***********************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fmine-center%2Fbasic-setting%2Fbasic-setting"} ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _basicSetting = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/mine-center/basic-setting/basic-setting.vue */ "../../../../../myapps/pages/tab-item-content/mine-center/basic-setting/basic-setting.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_basicSetting.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fmine-center%2Fchange-name%2Fchange-name\"}":
/*!*******************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fmine-center%2Fchange-name%2Fchange-name"} ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _changeName = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/mine-center/change-name/change-name.vue */ "../../../../../myapps/pages/tab-item-content/mine-center/change-name/change-name.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_changeName.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fmine-center%2Fchange-telephone%2Fchange-telephone\"}":
/*!*****************************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fmine-center%2Fchange-telephone%2Fchange-telephone"} ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _changeTelephone = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/mine-center/change-telephone/change-telephone.vue */ "../../../../../myapps/pages/tab-item-content/mine-center/change-telephone/change-telephone.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_changeTelephone.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fmine-center%2Fcreate-suggestion%2Fcreate-suggestion\"}":
/*!*******************************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fmine-center%2Fcreate-suggestion%2Fcreate-suggestion"} ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _createSuggestion = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/mine-center/create-suggestion/create-suggestion.vue */ "../../../../../myapps/pages/tab-item-content/mine-center/create-suggestion/create-suggestion.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_createSuggestion.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fmine-center%2Fcut-image%2Fcut-image\"}":
/*!***************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fmine-center%2Fcut-image%2Fcut-image"} ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _cutImage = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/mine-center/cut-image/cut-image.vue */ "../../../../../myapps/pages/tab-item-content/mine-center/cut-image/cut-image.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_cutImage.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fmine-center%2Fedit-password%2Fedit-password\"}":
/*!***********************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fmine-center%2Fedit-password%2Fedit-password"} ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _editPassword = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/mine-center/edit-password/edit-password.vue */ "../../../../../myapps/pages/tab-item-content/mine-center/edit-password/edit-password.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_editPassword.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fmine-center%2Finput-code%2Finput-code\"}":
/*!*****************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fmine-center%2Finput-code%2Finput-code"} ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _inputCode = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/mine-center/input-code/input-code.vue */ "../../../../../myapps/pages/tab-item-content/mine-center/input-code/input-code.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_inputCode.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fmine-center%2Fsuggestion-list%2Fsuggestion-list\"}":
/*!***************************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fmine-center%2Fsuggestion-list%2Fsuggestion-list"} ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _suggestionList = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/mine-center/suggestion-list/suggestion-list.vue */ "../../../../../myapps/pages/tab-item-content/mine-center/suggestion-list/suggestion-list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_suggestionList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fmine-center%2Fwrite-motto%2Fwrite-motto\"}":
/*!*******************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fmine-center%2Fwrite-motto%2Fwrite-motto"} ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _writeMotto = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/mine-center/write-motto/write-motto.vue */ "../../../../../myapps/pages/tab-item-content/mine-center/write-motto/write-motto.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_writeMotto.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fnotice-center%2Fnotice-center\"}":
/*!*********************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fnotice-center%2Fnotice-center"} ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _noticeCenter = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/notice-center/notice-center.vue */ "../../../../../myapps/pages/tab-item-content/notice-center/notice-center.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_noticeCenter.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fshop-center%2Fcategory-item%2Fcategory-item\"}":
/*!***********************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fshop-center%2Fcategory-item%2Fcategory-item"} ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _categoryItem = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/shop-center/category-item/category-item.vue */ "../../../../../myapps/pages/tab-item-content/shop-center/category-item/category-item.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_categoryItem.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fshop-center%2Fclerk-list%2Fclerk-list\"}":
/*!*****************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fshop-center%2Fclerk-list%2Fclerk-list"} ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _clerkList = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/shop-center/clerk-list/clerk-list.vue */ "../../../../../myapps/pages/tab-item-content/shop-center/clerk-list/clerk-list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_clerkList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fshop-center%2Fcreate-comment%2Fcreate-comment\"}":
/*!*************************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fshop-center%2Fcreate-comment%2Fcreate-comment"} ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _createComment = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/shop-center/create-comment/create-comment.vue */ "../../../../../myapps/pages/tab-item-content/shop-center/create-comment/create-comment.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_createComment.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fshop-center%2Fcreate-order%2Fcreate-order\"}":
/*!*********************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fshop-center%2Fcreate-order%2Fcreate-order"} ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _createOrder = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/shop-center/create-order/create-order.vue */ "../../../../../myapps/pages/tab-item-content/shop-center/create-order/create-order.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_createOrder.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fshop-center%2Finvite-join%2Finvite-join\"}":
/*!*******************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fshop-center%2Finvite-join%2Finvite-join"} ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _inviteJoin = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/shop-center/invite-join/invite-join.vue */ "../../../../../myapps/pages/tab-item-content/shop-center/invite-join/invite-join.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_inviteJoin.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fshop-center%2Fjoin-shop%2Fjoin-shop\"}":
/*!***************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fshop-center%2Fjoin-shop%2Fjoin-shop"} ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _joinShop = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/shop-center/join-shop/join-shop.vue */ "../../../../../myapps/pages/tab-item-content/shop-center/join-shop/join-shop.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_joinShop.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fshop-center%2Fnear-shop-list%2Fnear-shop-list\"}":
/*!*************************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fshop-center%2Fnear-shop-list%2Fnear-shop-list"} ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _nearShopList = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/shop-center/near-shop-list/near-shop-list.vue */ "../../../../../myapps/pages/tab-item-content/shop-center/near-shop-list/near-shop-list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_nearShopList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fshop-center%2Frecord-shop%2Frecord-shop\"}":
/*!*******************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fshop-center%2Frecord-shop%2Frecord-shop"} ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _recordShop = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/shop-center/record-shop/record-shop.vue */ "../../../../../myapps/pages/tab-item-content/shop-center/record-shop/record-shop.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_recordShop.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fshop-center%2Frepair-item%2Frepair-item\"}":
/*!*******************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fshop-center%2Frepair-item%2Frepair-item"} ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _repairItem = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/shop-center/repair-item/repair-item.vue */ "../../../../../myapps/pages/tab-item-content/shop-center/repair-item/repair-item.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_repairItem.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fshop-center%2Frepair-order-item%2Frepair-order-item\"}":
/*!*******************************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fshop-center%2Frepair-order-item%2Frepair-order-item"} ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _repairOrderItem = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/shop-center/repair-order-item/repair-order-item.vue */ "../../../../../myapps/pages/tab-item-content/shop-center/repair-order-item/repair-order-item.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_repairOrderItem.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fshop-center%2Fsearch-shop%2Fsearch-shop\"}":
/*!*******************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fshop-center%2Fsearch-shop%2Fsearch-shop"} ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _searchShop = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/shop-center/search-shop/search-shop.vue */ "../../../../../myapps/pages/tab-item-content/shop-center/search-shop/search-shop.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_searchShop.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fshop-center%2Fshop-center\"}":
/*!*****************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fshop-center%2Fshop-center"} ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _shopCenter = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/shop-center/shop-center.vue */ "../../../../../myapps/pages/tab-item-content/shop-center/shop-center.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_shopCenter.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fshop-center%2Fshop-list%2Fshop-list\"}":
/*!***************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fshop-center%2Fshop-list%2Fshop-list"} ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _shopList = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/shop-center/shop-list/shop-list.vue */ "../../../../../myapps/pages/tab-item-content/shop-center/shop-list/shop-list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_shopList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fwork-center%2Fchose-copy%2Fchose-copy\"}":
/*!*****************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fwork-center%2Fchose-copy%2Fchose-copy"} ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _choseCopy = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/work-center/chose-copy/chose-copy.vue */ "../../../../../myapps/pages/tab-item-content/work-center/chose-copy/chose-copy.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_choseCopy.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fwork-center%2Fcreate-log%2Fcreate-log\"}":
/*!*****************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fwork-center%2Fcreate-log%2Fcreate-log"} ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _createLog = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/work-center/create-log/create-log.vue */ "../../../../../myapps/pages/tab-item-content/work-center/create-log/create-log.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_createLog.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fwork-center%2Fexpress-center%2Fcreate-address%2Fcreate-address\"}":
/*!******************************************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fwork-center%2Fexpress-center%2Fcreate-address%2Fcreate-address"} ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _createAddress = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/work-center/express-center/create-address/create-address.vue */ "../../../../../myapps/pages/tab-item-content/work-center/express-center/create-address/create-address.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_createAddress.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fwork-center%2Fexpress-center%2Fcreate-express%2Fcreate-express\"}":
/*!******************************************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fwork-center%2Fexpress-center%2Fcreate-express%2Fcreate-express"} ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _createExpress = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/work-center/express-center/create-express/create-express.vue */ "../../../../../myapps/pages/tab-item-content/work-center/express-center/create-express/create-express.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_createExpress.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fwork-center%2Fexpress-center%2Fexpress-index%2Fexpress-index\"}":
/*!****************************************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fwork-center%2Fexpress-center%2Fexpress-index%2Fexpress-index"} ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _expressIndex = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/work-center/express-center/express-index/express-index.vue */ "../../../../../myapps/pages/tab-item-content/work-center/express-center/express-index/express-index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_expressIndex.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fwork-center%2Flog-detail%2Flog-detail\"}":
/*!*****************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fwork-center%2Flog-detail%2Flog-detail"} ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _logDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/work-center/log-detail/log-detail.vue */ "../../../../../myapps/pages/tab-item-content/work-center/log-detail/log-detail.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_logDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fwork-center%2Fwork-index%2Fwork-index\"}":
/*!*****************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fwork-center%2Fwork-index%2Fwork-index"} ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _workIndex = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/work-center/work-index/work-index.vue */ "../../../../../myapps/pages/tab-item-content/work-center/work-index/work-index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_workIndex.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/main.js?{\"page\":\"pages%2Ftab-item-content%2Fwork-center%2Fwork-log%2Fwork-log\"}":
/*!*************************************************************************************************!*\
  !*** D:/myapps/main.js?{"page":"pages%2Ftab-item-content%2Fwork-center%2Fwork-log%2Fwork-log"} ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../../../myapps/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _workLog = _interopRequireDefault(__webpack_require__(/*! ./pages/tab-item-content/work-center/work-log/work-log.vue */ "../../../../../myapps/pages/tab-item-content/work-center/work-log/work-log.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_workLog.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../../../myapps/node_modules/onfire.js/lib/index.js":
/*!*****************************************************!*\
  !*** D:/myapps/node_modules/onfire.js/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
               * mini (~500 b) version for event-emitter.
               *
               * Created by hustcc on 2018/12/31
               * Contract: vip@hust.edu.cn
               */

Object.defineProperty(exports, "__esModule", {
  value: true });

/**
                   * const ee = new OnFire();
                   *
                   * ee.on('click', (...values) => {});
                   *
                   * ee.on('mouseover', (...values) => {});
                   *
                   * ee.emit('click', 1, 2, 3);
                   * ee.fire('mouseover', {}); // same with emit
                   *
                   * ee.off();
                   */

var OnFire =
/** @class */
function () {
  function OnFire() {
    // 所有事件的监听器
    this.es = {};
  }

  OnFire.prototype.on = function (eventName, cb, once) {
    if (once === void 0) {
      once = false;
    }

    if (!this.es[eventName]) {
      this.es[eventName] = [];
    }

    this.es[eventName].push({
      cb: cb,
      once: once });

  };

  OnFire.prototype.once = function (eventName, cb) {
    this.on(eventName, cb, true);
  };

  OnFire.prototype.fire = function (eventName) {
    var params = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      params[_i - 1] = arguments[_i];
    }

    var listeners = this.es[eventName] || [];
    var l = listeners.length;

    for (var i = 0; i < l; i++) {
      var _a = listeners[i],
      cb = _a.cb,
      once = _a.once;
      cb.apply(this, params);

      if (once) {
        listeners.splice(i, 1);
        i--;
        l--;
      }
    }
  };

  OnFire.prototype.off = function (eventName, cb) {
    // clean all
    if (eventName === undefined) {
      this.es = {};
    } else {
      if (cb === undefined) {
        // clean the eventName's listeners
        delete this.es[eventName];
      } else {
        var listeners = this.es[eventName] || []; // clean the event and listener

        var l = listeners.length;

        for (var i = 0; i < l; i++) {
          if (listeners[i].cb === cb) {
            listeners.splice(i, 1);
            i--;
            l--;
          }
        }
      }
    }
  }; // cname of fire


  OnFire.prototype.emit = function (eventName) {
    var params = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      params[_i - 1] = arguments[_i];
    }

    this.fire.apply(this, [eventName].concat(params));
  };

  OnFire.ver = "2.0.1";
  return OnFire;
}();

exports.default = OnFire;

/***/ }),

/***/ "../../../../../myapps/node_modules/qiniu-js/dist/qiniu.min.js":
/*!*********************************************************!*\
  !*** D:/myapps/node_modules/qiniu-js/dist/qiniu.min.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
!function (t, e) { true ? module.exports = e() : undefined;}("undefined" != typeof self ? self : void 0, function () {return function (t) {function e(r) {if (n[r]) return n[r].exports;var o = n[r] = { i: r, l: !1, exports: {} };return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports;}var n = {};return e.m = t, e.c = n, e.d = function (t, n, r) {e.o(t, n) || Object.defineProperty(t, n, { configurable: !1, enumerable: !0, get: r });}, e.n = function (t) {var n = t && t.__esModule ? function () {return t.default;} : function () {return t;};return e.d(n, "a", n), n;}, e.o = function (t, e) {return Object.prototype.hasOwnProperty.call(t, e);}, e.p = "/dist/", e(e.s = 58);}([function (t, e) {var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = n);}, function (t, e) {var n = t.exports = { version: "2.6.5" };"number" == typeof __e && (__e = n);}, function (t, e, n) {var r = n(30)("wks"),o = n(22),i = n(0).Symbol,a = "function" == typeof i;(t.exports = function (t) {return r[t] || (r[t] = a && i[t] || (a ? i : o)("Symbol." + t));}).store = r;}, function (t, e, n) {var r = n(7);t.exports = function (t) {if (!r(t)) throw TypeError(t + " is not an object!");return t;};}, function (t, e, n) {var r = n(0),o = n(1),i = n(19),a = n(5),s = n(9),u = function u(t, e, n) {var c,f,l,h = t & u.F,p = t & u.G,d = t & u.S,g = t & u.P,m = t & u.B,v = t & u.W,y = p ? o : o[e] || (o[e] = {}),b = y.prototype,w = p ? r : d ? r[e] : (r[e] || {}).prototype;for (c in p && (n = e), n) {(f = !h && w && void 0 !== w[c]) && s(y, c) || (l = f ? w[c] : n[c], y[c] = p && "function" != typeof w[c] ? n[c] : m && f ? i(l, r) : v && w[c] == l ? function (t) {var e = function e(_e, n, r) {if (this instanceof t) {switch (arguments.length) {case 0:return new t();case 1:return new t(_e);case 2:return new t(_e, n);}return new t(_e, n, r);}return t.apply(this, arguments);};return e.prototype = t.prototype, e;}(l) : g && "function" == typeof l ? i(Function.call, l) : l, g && ((y.virtual || (y.virtual = {}))[c] = l, t & u.R && b && !b[c] && a(b, c, l)));}};u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, t.exports = u;}, function (t, e, n) {var r = n(6),o = n(21);t.exports = n(8) ? function (t, e, n) {return r.f(t, e, o(1, n));} : function (t, e, n) {return t[e] = n, t;};}, function (t, e, n) {var r = n(3),o = n(43),i = n(28),a = Object.defineProperty;e.f = n(8) ? Object.defineProperty : function (t, e, n) {if (r(t), e = i(e, !0), r(n), o) try {return a(t, e, n);} catch (t) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (t[e] = n.value), t;};}, function (t, e) {t.exports = function (t) {return "object" == typeof t ? null !== t : "function" == typeof t;};}, function (t, e, n) {t.exports = !n(10)(function () {return 7 != Object.defineProperty({}, "a", { get: function get() {return 7;} }).a;});}, function (t, e) {var n = {}.hasOwnProperty;t.exports = function (t, e) {return n.call(t, e);};}, function (t, e) {t.exports = function (t) {try {return !!t();} catch (t) {return !0;}};}, function (t, e, n) {var r = n(47),o = n(26);t.exports = function (t) {return r(o(t));};}, function (t, e, n) {"use strict";function r(t) {return t && t.__esModule ? t : { default: t };}function o(t) {var e = t + 864e5;return new Date().getTime() > e;}function i(t) {return (0, m.default)(t).filter(function (t) {return t.startsWith("x:");}).map(function (e) {return [e, t[e].toString()];});}function a(t) {return "qiniu_js_sdk_upload_file_" + t.name + "_size_" + t.size;}function s(t) {try {return JSON.parse(localStorage.getItem(a(t))) || [];} catch (t) {return window.console && window.console.warn && console.warn("getLocalFileInfo failed", " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), [];}}function u(t) {return { Authorization: "UpToken " + t };}function c() {return window.XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");}function f(t) {return new p.default(function (e, n) {var r = new FileReader();r.readAsArrayBuffer(t), r.onload = function (t) {var n = t.target.result;e(n);}, r.onerror = function () {n(new Error("fileReader 读取错误"));};});}function l(t, e) {return new p.default(function (n, r) {var o = c();o.open(e.method, t), e.onCreate && e.onCreate(o), e.headers && (0, m.default)(e.headers).forEach(function (t) {return o.setRequestHeader(t, e.headers[t]);}), o.upload.addEventListener("progress", function (t) {t.lengthComputable && e.onProgress && e.onProgress({ loaded: t.loaded, total: t.total });}), o.onreadystatechange = function () {var t = o.responseText;if (4 === o.readyState) {var e = o.getResponseHeader("x-reqId") || "";if (200 !== o.status) {var i = "xhr request failed, code: " + o.status + ";";return t && (i = i + " response: " + t), void r({ code: o.status, message: i, reqId: e, isRequestError: !0 });}try {n({ data: JSON.parse(t), reqId: e });} catch (t) {r(t);}}}, o.send(e.body);});}function h() {return "http:" === window.location.protocol ? "http:" : "https:";}e.__esModule = !0;var p = r(n(18)),d = r(n(34)),g = r(n(86)),m = r(n(36));e.isChunkExpired = o, e.getChunks = function (t, e) {for (var n = [], r = Math.ceil(t.size / e), o = 0; o < r; o++) {var i = t.slice(e * o, o === r - 1 ? t.size : e * (o + 1));n.push(i);}return n;}, e.filterParams = i, e.sum = function (t) {return t.reduce(function (t, e) {return t + e;}, 0);}, e.setLocalFileInfo = function (t, e) {try {localStorage.setItem(a(t), (0, g.default)(e));} catch (t) {window.console && window.console.warn && console.warn("setLocalFileInfo failed", " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1");}}, e.removeLocalFileInfo = function (t) {try {localStorage.removeItem(a(t));} catch (t) {window.console && window.console.warn && console.warn("removeLocalFileInfo failed", " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1");}}, e.getLocalFileInfo = s, e.getResumeUploadedSize = function (t) {return s(t).filter(function (t) {return t && !o(t.time);}).reduce(function (t, e) {return t + e.size;}, 0);}, e.createMkFileUrl = function (t, e, n, r) {var o = t + "/mkfile/" + e;null != n && (o += "/key/" + (0, v.urlSafeBase64Encode)(n)), r.mimeType && (o += "/mimeType/" + (0, v.urlSafeBase64Encode)(r.mimeType));var a = r.fname;return a && (o += "/fname/" + (0, v.urlSafeBase64Encode)(a)), r.params && i(r.params).forEach(function (t) {return o += "/" + encodeURIComponent(t[0]) + "/" + (0, v.urlSafeBase64Encode)(t[1]);}), o;}, e.getHeadersForChunkUpload = function (t) {var e = u(t);return (0, d.default)({ "content-type": "application/octet-stream" }, e);}, e.getHeadersForMkFile = function (t) {var e = u(t);return (0, d.default)({ "content-type": "text/plain" }, e);}, e.createXHR = c, e.computeMd5 = function (t) {return f(t).then(function (t) {var e = new b.default.ArrayBuffer();return e.append(t), e.end();});}, e.readAsArrayBuffer = f, e.request = l, e.getPortFromUrl = function (t) {if (t && t.match) {var e = t.match(/(^https?)/);if (!e) return "";var n = e[1];return (e = t.match(/^https?:\/\/([^:^\/]*):(\d*)/)) ? e[2] : "http" === n ? "80" : "443";}return "";}, e.getDomainFromUrl = function (t) {if (t && t.match) {var e = t.match(/^https?:\/\/([^:^\/]*)/);return e ? e[1] : "";}return "";}, e.getUploadUrl = function (t, e) {var n = h();if (null != t.uphost) return p.default.resolve(n + "//" + t.uphost);if (null != t.region) {var r = y.regionUphostMap[t.region],o = t.useCdnDomain ? r.cdnUphost : r.srcUphost;return p.default.resolve(n + "//" + o);}return function (t) {try {var e = function (t) {var e = t.split(":"),n = e[0],r = JSON.parse((0, v.urlSafeBase64Decode)(e[2]));return r.ak = n, r.bucket = r.scope.split(":")[0], r;}(t);return l(h() + "//api.qiniu.com/v2/query?ak=" + e.ak + "&bucket=" + e.bucket, { method: "GET" });} catch (t) {return p.default.reject(t);}}(e).then(function (t) {var e = t.data.up.acc.main;return n + "//" + e[0];});}, e.isContainFileMimeType = function (t, e) {return e.indexOf(t) > -1;}, e.createObjectURL = function (t) {return (window.URL || window.webkitURL || window.mozURL).createObjectURL(t);}, e.getTransform = function (t, e) {var n = t.width,r = t.height;switch (e) {case 1:return { width: n, height: r, matrix: [1, 0, 0, 1, 0, 0] };case 2:return { width: n, height: r, matrix: [-1, 0, 0, 1, n, 0] };case 3:return { width: n, height: r, matrix: [-1, 0, 0, -1, n, r] };case 4:return { width: n, height: r, matrix: [1, 0, 0, -1, 0, r] };case 5:return { width: r, height: n, matrix: [0, 1, 1, 0, 0, 0] };case 6:return { width: r, height: n, matrix: [0, 1, -1, 0, r, 0] };case 7:return { width: r, height: n, matrix: [0, -1, -1, 0, r, n] };case 8:return { width: r, height: n, matrix: [0, -1, 1, 0, 0, n] };}};var v = n(56),y = n(39),b = r(n(91));}, function (t, e) {t.exports = !0;}, function (t, e) {t.exports = {};}, function (t, e, n) {var r = n(46),o = n(31);t.exports = Object.keys || function (t) {return r(t, o);};}, function (t, e) {var n = {}.toString;t.exports = function (t) {return n.call(t).slice(8, -1);};}, function (t, e, n) {"use strict";e.__esModule = !0, e.default = function (t, e) {if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");};}, function (t, e, n) {t.exports = { default: n(59), __esModule: !0 };}, function (t, e, n) {var r = n(20);t.exports = function (t, e, n) {if (r(t), void 0 === e) return t;switch (n) {case 1:return function (n) {return t.call(e, n);};case 2:return function (n, r) {return t.call(e, n, r);};case 3:return function (n, r, o) {return t.call(e, n, r, o);};}return function () {return t.apply(e, arguments);};};}, function (t, e) {t.exports = function (t) {if ("function" != typeof t) throw TypeError(t + " is not a function!");return t;};}, function (t, e) {t.exports = function (t, e) {return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e };};}, function (t, e) {var n = 0,r = Math.random();t.exports = function (t) {return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + r).toString(36));};}, function (t, e, n) {var r = n(6).f,o = n(9),i = n(2)("toStringTag");t.exports = function (t, e, n) {t && !o(t = n ? t : t.prototype, i) && r(t, i, { configurable: !0, value: e });};}, function (t, e) {e.f = {}.propertyIsEnumerable;}, function (t, e) {var n = Math.ceil,r = Math.floor;t.exports = function (t) {return isNaN(t = +t) ? 0 : (t > 0 ? r : n)(t);};}, function (t, e) {t.exports = function (t) {if (void 0 == t) throw TypeError("Can't call method on  " + t);return t;};}, function (t, e, n) {var r = n(7),o = n(0).document,i = r(o) && r(o.createElement);t.exports = function (t) {return i ? o.createElement(t) : {};};}, function (t, e, n) {var r = n(7);t.exports = function (t, e) {if (!r(t)) return t;var n, o;if (e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o;if ("function" == typeof (n = t.valueOf) && !r(o = n.call(t))) return o;if (!e && "function" == typeof (n = t.toString) && !r(o = n.call(t))) return o;throw TypeError("Can't convert object to primitive value");};}, function (t, e, n) {var r = n(30)("keys"),o = n(22);t.exports = function (t) {return r[t] || (r[t] = o(t));};}, function (t, e, n) {var r = n(1),o = n(0),i = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});(t.exports = function (t, e) {return i[t] || (i[t] = void 0 !== e ? e : {});})("versions", []).push({ version: r.version, mode: n(13) ? "pure" : "global", copyright: "© 2019 Denis Pushkarev (zloirock.ru)" });}, function (t, e) {t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");}, function (t, e, n) {var r = n(26);t.exports = function (t) {return Object(r(t));};}, function (t, e, n) {"use strict";var r = n(20);t.exports.f = function (t) {return new function (t) {var e, n;this.promise = new t(function (t, r) {if (void 0 !== e || void 0 !== n) throw TypeError("Bad Promise constructor");e = t, n = r;}), this.resolve = r(e), this.reject = r(n);}(t);};}, function (t, e, n) {t.exports = { default: n(83), __esModule: !0 };}, function (t, e) {e.f = Object.getOwnPropertySymbols;}, function (t, e, n) {t.exports = { default: n(88), __esModule: !0 };}, function (t, e, n) {e.f = n(2);}, function (t, e, n) {var r = n(0),o = n(1),i = n(13),a = n(37),s = n(6).f;t.exports = function (t) {var e = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});"_" == t.charAt(0) || t in e || s(e, t, { value: a.f(t) });};}, function (t, e, n) {"use strict";e.__esModule = !0, e.regionUphostMap = { z0: { srcUphost: "up.qiniup.com", cdnUphost: "upload.qiniup.com" }, z1: { srcUphost: "up-z1.qiniup.com", cdnUphost: "upload-z1.qiniup.com" }, z2: { srcUphost: "up-z2.qiniup.com", cdnUphost: "upload-z2.qiniup.com" }, na0: { srcUphost: "up-na0.qiniup.com", cdnUphost: "upload-na0.qiniup.com" }, as0: { srcUphost: "up-as0.qiniup.com", cdnUphost: "upload-as0.qiniup.com" } }, e.region = { z0: "z0", z1: "z1", z2: "z2", na0: "na0", as0: "as0" };}, function (t, e) {}, function (t, e, n) {"use strict";var r = n(60)(!0);n(42)(String, "String", function (t) {this._t = String(t), this._i = 0;}, function () {var t,e = this._t,n = this._i;return n >= e.length ? { value: void 0, done: !0 } : (t = r(e, n), this._i += t.length, { value: t, done: !1 });});}, function (t, e, n) {"use strict";var r = n(13),o = n(4),i = n(44),a = n(5),s = n(14),u = n(61),c = n(23),f = n(65),l = n(2)("iterator"),h = !([].keys && "next" in [].keys()),p = function p() {return this;};t.exports = function (t, e, n, d, g, m, v) {u(n, e, d);var y,b,w,x = function x(t) {if (!h && t in C) return C[t];switch (t) {case "keys":case "values":return function () {return new n(this, t);};}return function () {return new n(this, t);};},S = e + " Iterator",_ = "values" == g,P = !1,C = t.prototype,U = C[l] || C["@@iterator"] || g && C[g],I = U || x(g),F = g ? _ ? x("entries") : I : void 0,k = "Array" == e && C.entries || U;if (k && (w = f(k.call(new t()))) !== Object.prototype && w.next && (c(w, S, !0), r || "function" == typeof w[l] || a(w, l, p)), _ && U && "values" !== U.name && (P = !0, I = function I() {return U.call(this);}), r && !v || !h && !P && C[l] || a(C, l, I), s[e] = I, s[S] = p, g) if (y = { values: _ ? I : x("values"), keys: m ? I : x("keys"), entries: F }, v) for (b in y) {b in C || i(C, b, y[b]);} else o(o.P + o.F * (h || P), e, y);return y;};}, function (t, e, n) {t.exports = !n(8) && !n(10)(function () {return 7 != Object.defineProperty(n(27)("div"), "a", { get: function get() {return 7;} }).a;});}, function (t, e, n) {t.exports = n(5);}, function (t, e, n) {var r = n(3),o = n(62),i = n(31),a = n(29)("IE_PROTO"),s = function s() {},_u = function u() {var t,e = n(27)("iframe"),r = i.length;for (e.style.display = "none", n(49).appendChild(e), e.src = "javascript:", (t = e.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), _u = t.F; r--;) {delete _u.prototype[i[r]];}return _u();};t.exports = Object.create || function (t, e) {var n;return null !== t ? (s.prototype = r(t), n = new s(), s.prototype = null, n[a] = t) : n = _u(), void 0 === e ? n : o(n, e);};}, function (t, e, n) {var r = n(9),o = n(11),i = n(63)(!1),a = n(29)("IE_PROTO");t.exports = function (t, e) {var n,s = o(t),u = 0,c = [];for (n in s) {n != a && r(s, n) && c.push(n);}for (; e.length > u;) {r(s, n = e[u++]) && (~i(c, n) || c.push(n));}return c;};}, function (t, e, n) {var r = n(16);t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {return "String" == r(t) ? t.split("") : Object(t);};}, function (t, e, n) {var r = n(25),o = Math.min;t.exports = function (t) {return t > 0 ? o(r(t), 9007199254740991) : 0;};}, function (t, e, n) {var r = n(0).document;t.exports = r && r.documentElement;}, function (t, e, n) {n(66);for (var r = n(0), o = n(5), i = n(14), a = n(2)("toStringTag"), s = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), u = 0; u < s.length; u++) {var c = s[u],f = r[c],l = f && f.prototype;l && !l[a] && o(l, a, c), i[c] = i.Array;}}, function (t, e, n) {var r = n(16),o = n(2)("toStringTag"),i = "Arguments" == r(function () {return arguments;}());t.exports = function (t) {var e, n, a;return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = function (t, e) {try {return t[e];} catch (t) {}}(e = Object(t), o)) ? n : i ? r(e) : "Object" == (a = r(e)) && "function" == typeof e.callee ? "Arguments" : a;};}, function (t, e, n) {var r = n(3),o = n(20),i = n(2)("species");t.exports = function (t, e) {var n,a = r(t).constructor;return void 0 === a || void 0 == (n = r(a)[i]) ? e : o(n);};}, function (t, e, n) {var r,o,i,a = n(19),s = n(75),u = n(49),c = n(27),f = n(0),l = f.process,h = f.setImmediate,p = f.clearImmediate,d = f.MessageChannel,g = f.Dispatch,m = 0,v = {},y = function y() {var t = +this;if (v.hasOwnProperty(t)) {var e = v[t];delete v[t], e();}},b = function b(t) {y.call(t.data);};h && p || (h = function h(t) {for (var e = [], n = 1; arguments.length > n;) {e.push(arguments[n++]);}return v[++m] = function () {s("function" == typeof t ? t : Function(t), e);}, r(m), m;}, p = function p(t) {delete v[t];}, "process" == n(16)(l) ? r = function r(t) {l.nextTick(a(y, t, 1));} : g && g.now ? r = function r(t) {g.now(a(y, t, 1));} : d ? (i = (o = new d()).port2, o.port1.onmessage = b, r = a(i.postMessage, i, 1)) : f.addEventListener && "function" == typeof postMessage && !f.importScripts ? (r = function r(t) {f.postMessage(t + "", "*");}, f.addEventListener("message", b, !1)) : r = "onreadystatechange" in c("script") ? function (t) {u.appendChild(c("script")).onreadystatechange = function () {u.removeChild(this), y.call(t);};} : function (t) {setTimeout(a(y, t, 1), 0);}), t.exports = { set: h, clear: p };}, function (t, e) {t.exports = function (t) {try {return { e: !1, v: t() };} catch (t) {return { e: !0, v: t };}};}, function (t, e, n) {var r = n(3),o = n(7),i = n(33);t.exports = function (t, e) {if (r(t), o(e) && e.constructor === t) return e;var n = i.f(t);return (0, n.resolve)(e), n.promise;};}, function (t, e, n) {"use strict";e.__esModule = !0, e.urlSafeBase64Encode = function (t) {return (t = function (t) {var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n = void 0,r = void 0,o = void 0,i = void 0,a = void 0,s = void 0,u = void 0,c = void 0,f = 0,l = 0,h = "",p = [];if (!t) return t;t = function (t) {if (null === t || void 0 === t) return "";var e = t + "",n = "",r = void 0,o = void 0,i = 0;r = o = 0, i = e.length;for (var a = 0; a < i; a++) {var s = e.charCodeAt(a),u = null;if (s < 128) o++;else if (s > 127 && s < 2048) u = String.fromCharCode(s >> 6 | 192, 63 & s | 128);else if (63488 & s ^ !0) u = String.fromCharCode(s >> 12 | 224, s >> 6 & 63 | 128, 63 & s | 128);else {if (64512 & s ^ !0) throw new RangeError("Unmatched trail surrogate at " + a);var c = e.charCodeAt(++a);if (64512 & c ^ !0) throw new RangeError("Unmatched lead surrogate at " + (a - 1));s = ((1023 & s) << 10) + (1023 & c) + 65536, u = String.fromCharCode(s >> 18 | 240, s >> 12 & 63 | 128, s >> 6 & 63 | 128, 63 & s | 128);}null !== u && (o > r && (n += e.slice(r, o)), n += u, r = o = a + 1);}return o > r && (n += e.slice(r, i)), n;}(t + "");do {n = t.charCodeAt(f++), r = t.charCodeAt(f++), o = t.charCodeAt(f++), i = (c = n << 16 | r << 8 | o) >> 18 & 63, a = c >> 12 & 63, s = c >> 6 & 63, u = 63 & c, p[l++] = e.charAt(i) + e.charAt(a) + e.charAt(s) + e.charAt(u);} while (f < t.length);switch (h = p.join(""), t.length % 3) {case 1:h = h.slice(0, -2) + "==";break;case 2:h = h.slice(0, -1) + "=";}return h;}(t)).replace(/\//g, "_").replace(/\+/g, "-");}, e.urlSafeBase64Decode = function (t) {return function (t) {var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n = void 0,r = void 0,o = void 0,i = void 0,a = void 0,s = void 0,u = void 0,c = void 0,f = 0,l = 0,h = [];if (!t) return t;t += "";do {i = e.indexOf(t.charAt(f++)), a = e.indexOf(t.charAt(f++)), s = e.indexOf(t.charAt(f++)), u = e.indexOf(t.charAt(f++)), n = (c = i << 18 | a << 12 | s << 6 | u) >> 16 & 255, r = c >> 8 & 255, o = 255 & c, h[l++] = 64 === s ? String.fromCharCode(n) : 64 === u ? String.fromCharCode(n, r) : String.fromCharCode(n, r, o);} while (f < t.length);return h.join("");}(t = t.replace(/_/g, "/").replace(/-/g, "+"));};}, function (t, e, n) {var r = n(46),o = n(31).concat("length", "prototype");e.f = Object.getOwnPropertyNames || function (t) {return r(t, o);};}, function (t, e, n) {"use strict";e.__esModule = !0, e.pipeline = e.compressImage = e.exif = e.imageInfo = e.watermark = e.imageMogr2 = e.getUploadUrl = e.filterParams = e.getHeadersForMkFile = e.getResumeUploadedSize = e.getHeadersForChunkUpload = e.createMkFileUrl = e.region = e.upload = void 0;var r = n(39),o = n(12),i = n(92),a = n(94),s = n(95),u = n(109),c = function (t) {return t && t.__esModule ? t : { default: t };}(n(110)),f = new u.StatisticsLogger();e.upload = function (t, e, n, r, o) {var a = { file: t, key: e, token: n, putExtra: r, config: o };return new s.Observable(function (t) {var e = new i.UploadManager(a, { onData: function onData(e) {return t.next(e);}, onError: function onError(e) {return t.error(e);}, onComplete: function onComplete(e) {return t.complete(e);} }, f);return e.putFile(), e.stop.bind(e);});}, e.region = r.region, e.createMkFileUrl = o.createMkFileUrl, e.getHeadersForChunkUpload = o.getHeadersForChunkUpload, e.getResumeUploadedSize = o.getResumeUploadedSize, e.getHeadersForMkFile = o.getHeadersForMkFile, e.filterParams = o.filterParams, e.getUploadUrl = o.getUploadUrl, e.imageMogr2 = a.imageMogr2, e.watermark = a.watermark, e.imageInfo = a.imageInfo, e.exif = a.exif, e.compressImage = c.default, e.pipeline = a.pipeline;}, function (t, e, n) {n(40), n(41), n(50), n(69), n(81), n(82), t.exports = n(1).Promise;}, function (t, e, n) {var r = n(25),o = n(26);t.exports = function (t) {return function (e, n) {var i,a,s = String(o(e)),u = r(n),c = s.length;return u < 0 || u >= c ? t ? "" : void 0 : (i = s.charCodeAt(u)) < 55296 || i > 56319 || u + 1 === c || (a = s.charCodeAt(u + 1)) < 56320 || a > 57343 ? t ? s.charAt(u) : i : t ? s.slice(u, u + 2) : a - 56320 + (i - 55296 << 10) + 65536;};};}, function (t, e, n) {"use strict";var r = n(45),o = n(21),i = n(23),a = {};n(5)(a, n(2)("iterator"), function () {return this;}), t.exports = function (t, e, n) {t.prototype = r(a, { next: o(1, n) }), i(t, e + " Iterator");};}, function (t, e, n) {var r = n(6),o = n(3),i = n(15);t.exports = n(8) ? Object.defineProperties : function (t, e) {o(t);for (var n, a = i(e), s = a.length, u = 0; s > u;) {r.f(t, n = a[u++], e[n]);}return t;};}, function (t, e, n) {var r = n(11),o = n(48),i = n(64);t.exports = function (t) {return function (e, n, a) {var s,u = r(e),c = o(u.length),f = i(a, c);if (t && n != n) {for (; c > f;) {if ((s = u[f++]) != s) return !0;}} else for (; c > f; f++) {if ((t || f in u) && u[f] === n) return t || f || 0;}return !t && -1;};};}, function (t, e, n) {var r = n(25),o = Math.max,i = Math.min;t.exports = function (t, e) {return (t = r(t)) < 0 ? o(t + e, 0) : i(t, e);};}, function (t, e, n) {var r = n(9),o = n(32),i = n(29)("IE_PROTO"),a = Object.prototype;t.exports = Object.getPrototypeOf || function (t) {return t = o(t), r(t, i) ? t[i] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? a : null;};}, function (t, e, n) {"use strict";var r = n(67),o = n(68),i = n(14),a = n(11);t.exports = n(42)(Array, "Array", function (t, e) {this._t = a(t), this._i = 0, this._k = e;}, function () {var t = this._t,e = this._k,n = this._i++;return !t || n >= t.length ? (this._t = void 0, o(1)) : o(0, "keys" == e ? n : "values" == e ? t[n] : [n, t[n]]);}, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries");}, function (t, e) {t.exports = function () {};}, function (t, e) {t.exports = function (t, e) {return { value: e, done: !!t };};}, function (t, e, n) {"use strict";var r,o,i,a,s = n(13),u = n(0),c = n(19),f = n(51),l = n(4),h = n(7),p = n(20),d = n(70),g = n(71),m = n(52),v = n(53).set,y = n(76)(),b = n(33),w = n(54),x = n(77),S = n(55),_ = u.TypeError,P = u.process,C = P && P.versions,U = C && C.v8 || "",_I = u.Promise,F = "process" == f(P),k = function k() {},E = o = b.f,M = !!function () {try {var t = _I.resolve(1),e = (t.constructor = {})[n(2)("species")] = function (t) {t(k, k);};return (F || "function" == typeof PromiseRejectionEvent) && t.then(k) instanceof e && 0 !== U.indexOf("6.6") && -1 === x.indexOf("Chrome/66");} catch (t) {}}(),O = function O(t) {var e;return !(!h(t) || "function" != typeof (e = t.then)) && e;},T = function T(t, e) {if (!t._n) {t._n = !0;var n = t._c;y(function () {for (var r = t._v, o = 1 == t._s, i = 0; n.length > i;) {!function (e) {var n,i,a,s = o ? e.ok : e.fail,u = e.resolve,c = e.reject,f = e.domain;try {s ? (o || (2 == t._h && L(t), t._h = 1), !0 === s ? n = r : (f && f.enter(), n = s(r), f && (f.exit(), a = !0)), n === e.promise ? c(_("Promise-chain cycle")) : (i = O(n)) ? i.call(n, u, c) : u(n)) : c(r);} catch (t) {f && !a && f.exit(), c(t);}}(n[i++]);}t._c = [], t._n = !1, e && !t._h && R(t);});}},R = function R(t) {v.call(u, function () {var e,n,r,o = t._v,i = A(t);if (i && (e = w(function () {F ? P.emit("unhandledRejection", o, t) : (n = u.onunhandledrejection) ? n({ promise: t, reason: o }) : (r = u.console) && r.error && r.error("Unhandled promise rejection", o);}), t._h = F || A(t) ? 2 : 1), t._a = void 0, i && e.e) throw e.v;});},A = function A(t) {return 1 !== t._h && 0 === (t._a || t._c).length;},L = function L(t) {v.call(u, function () {var e;F ? P.emit("rejectionHandled", t) : (e = u.onrejectionhandled) && e({ promise: t, reason: t._v });});},D = function D(t) {var e = this;e._d || (e._d = !0, (e = e._w || e)._v = t, e._s = 2, e._a || (e._a = e._c.slice()), T(e, !0));},j = function j(t) {var e,n = this;if (!n._d) {n._d = !0, n = n._w || n;try {if (n === t) throw _("Promise can't be resolved itself");(e = O(t)) ? y(function () {var r = { _w: n, _d: !1 };try {e.call(t, c(j, r, 1), c(D, r, 1));} catch (t) {D.call(r, t);}}) : (n._v = t, n._s = 1, T(n, !1));} catch (t) {D.call({ _w: n, _d: !1 }, t);}}};M || (_I = function I(t) {d(this, _I, "Promise", "_h"), p(t), r.call(this);try {t(c(j, this, 1), c(D, this, 1));} catch (t) {D.call(this, t);}}, (r = function r(t) {this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;}).prototype = n(78)(_I.prototype, { then: function then(t, e) {var n = E(m(this, _I));return n.ok = "function" != typeof t || t, n.fail = "function" == typeof e && e, n.domain = F ? P.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && T(this, !1), n.promise;}, catch: function _catch(t) {return this.then(void 0, t);} }), i = function i() {var t = new r();this.promise = t, this.resolve = c(j, t, 1), this.reject = c(D, t, 1);}, b.f = E = function E(t) {return t === _I || t === a ? new i(t) : o(t);}), l(l.G + l.W + l.F * !M, { Promise: _I }), n(23)(_I, "Promise"), n(79)("Promise"), a = n(1).Promise, l(l.S + l.F * !M, "Promise", { reject: function reject(t) {var e = E(this);return (0, e.reject)(t), e.promise;} }), l(l.S + l.F * (s || !M), "Promise", { resolve: function resolve(t) {return S(s && this === a ? _I : this, t);} }), l(l.S + l.F * !(M && n(80)(function (t) {_I.all(t).catch(k);})), "Promise", { all: function all(t) {var e = this,n = E(e),r = n.resolve,o = n.reject,i = w(function () {var n = [],i = 0,a = 1;g(t, !1, function (t) {var s = i++,u = !1;n.push(void 0), a++, e.resolve(t).then(function (t) {u || (u = !0, n[s] = t, --a || r(n));}, o);}), --a || r(n);});return i.e && o(i.v), n.promise;}, race: function race(t) {var e = this,n = E(e),r = n.reject,o = w(function () {g(t, !1, function (t) {e.resolve(t).then(n.resolve, r);});});return o.e && r(o.v), n.promise;} });}, function (t, e) {t.exports = function (t, e, n, r) {if (!(t instanceof e) || void 0 !== r && r in t) throw TypeError(n + ": incorrect invocation!");return t;};}, function (t, e, n) {var r = n(19),o = n(72),i = n(73),a = n(3),s = n(48),u = n(74),c = {},f = {};(e = t.exports = function (t, e, n, l, h) {var p,d,g,m,v = h ? function () {return t;} : u(t),y = r(n, l, e ? 2 : 1),b = 0;if ("function" != typeof v) throw TypeError(t + " is not iterable!");if (i(v)) {for (p = s(t.length); p > b; b++) {if ((m = e ? y(a(d = t[b])[0], d[1]) : y(t[b])) === c || m === f) return m;}} else for (g = v.call(t); !(d = g.next()).done;) {if ((m = o(g, y, d.value, e)) === c || m === f) return m;}}).BREAK = c, e.RETURN = f;}, function (t, e, n) {var r = n(3);t.exports = function (t, e, n, o) {try {return o ? e(r(n)[0], n[1]) : e(n);} catch (e) {var i = t.return;throw void 0 !== i && r(i.call(t)), e;}};}, function (t, e, n) {var r = n(14),o = n(2)("iterator"),i = Array.prototype;t.exports = function (t) {return void 0 !== t && (r.Array === t || i[o] === t);};}, function (t, e, n) {var r = n(51),o = n(2)("iterator"),i = n(14);t.exports = n(1).getIteratorMethod = function (t) {if (void 0 != t) return t[o] || t["@@iterator"] || i[r(t)];};}, function (t, e) {t.exports = function (t, e, n) {var r = void 0 === n;switch (e.length) {case 0:return r ? t() : t.call(n);case 1:return r ? t(e[0]) : t.call(n, e[0]);case 2:return r ? t(e[0], e[1]) : t.call(n, e[0], e[1]);case 3:return r ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);case 4:return r ? t(e[0], e[1], e[2], e[3]) : t.call(n, e[0], e[1], e[2], e[3]);}return t.apply(n, e);};}, function (t, e, n) {var r = n(0),o = n(53).set,i = r.MutationObserver || r.WebKitMutationObserver,a = r.process,s = r.Promise,u = "process" == n(16)(a);t.exports = function () {var t,e,n,c = function c() {var r, o;for (u && (r = a.domain) && r.exit(); t;) {o = t.fn, t = t.next;try {o();} catch (r) {throw t ? n() : e = void 0, r;}}e = void 0, r && r.enter();};if (u) n = function n() {a.nextTick(c);};else if (!i || r.navigator && r.navigator.standalone) {if (s && s.resolve) {var f = s.resolve(void 0);n = function n() {f.then(c);};} else n = function n() {o.call(r, c);};} else {var l = !0,h = document.createTextNode("");new i(c).observe(h, { characterData: !0 }), n = function n() {h.data = l = !l;};}return function (r) {var o = { fn: r, next: void 0 };e && (e.next = o), t || (t = o, n()), e = o;};};}, function (t, e, n) {var r = n(0).navigator;t.exports = r && r.userAgent || "";}, function (t, e, n) {var r = n(5);t.exports = function (t, e, n) {for (var o in e) {n && t[o] ? t[o] = e[o] : r(t, o, e[o]);}return t;};}, function (t, e, n) {"use strict";var r = n(0),o = n(1),i = n(6),a = n(8),s = n(2)("species");t.exports = function (t) {var e = "function" == typeof o[t] ? o[t] : r[t];a && e && !e[s] && i.f(e, s, { configurable: !0, get: function get() {return this;} });};}, function (t, e, n) {var r = n(2)("iterator"),o = !1;try {var i = [7][r]();i.return = function () {o = !0;}, Array.from(i, function () {throw 2;});} catch (t) {}t.exports = function (t, e) {if (!e && !o) return !1;var n = !1;try {var i = [7],a = i[r]();a.next = function () {return { done: n = !0 };}, i[r] = function () {return a;}, t(i);} catch (t) {}return n;};}, function (t, e, n) {"use strict";var r = n(4),o = n(1),i = n(0),a = n(52),s = n(55);r(r.P + r.R, "Promise", { finally: function _finally(t) {var e = a(this, o.Promise || i.Promise),n = "function" == typeof t;return this.then(n ? function (n) {return s(e, t()).then(function () {return n;});} : t, n ? function (n) {return s(e, t()).then(function () {throw n;});} : t);} });}, function (t, e, n) {"use strict";var r = n(4),o = n(33),i = n(54);r(r.S, "Promise", { try: function _try(t) {var e = o.f(this),n = i(t);return (n.e ? e.reject : e.resolve)(n.v), e.promise;} });}, function (t, e, n) {n(84), t.exports = n(1).Object.assign;}, function (t, e, n) {var r = n(4);r(r.S + r.F, "Object", { assign: n(85) });}, function (t, e, n) {"use strict";var r = n(15),o = n(35),i = n(24),a = n(32),s = n(47),u = Object.assign;t.exports = !u || n(10)(function () {var t = {},e = {},n = Symbol(),r = "abcdefghijklmnopqrst";return t[n] = 7, r.split("").forEach(function (t) {e[t] = t;}), 7 != u({}, t)[n] || Object.keys(u({}, e)).join("") != r;}) ? function (t, e) {for (var n = a(t), u = arguments.length, c = 1, f = o.f, l = i.f; u > c;) {for (var h, p = s(arguments[c++]), d = f ? r(p).concat(f(p)) : r(p), g = d.length, m = 0; g > m;) {l.call(p, h = d[m++]) && (n[h] = p[h]);}}return n;} : u;}, function (t, e, n) {t.exports = { default: n(87), __esModule: !0 };}, function (t, e, n) {var r = n(1),o = r.JSON || (r.JSON = { stringify: JSON.stringify });t.exports = function (t) {return o.stringify.apply(o, arguments);};}, function (t, e, n) {n(89), t.exports = n(1).Object.keys;}, function (t, e, n) {var r = n(32),o = n(15);n(90)("keys", function () {return function (t) {return o(r(t));};});}, function (t, e, n) {var r = n(4),o = n(1),i = n(10);t.exports = function (t, e) {var n = (o.Object || {})[t] || Object[t],a = {};a[t] = e(n), r(r.S + r.F * i(function () {n(1);}), "Object", a);};}, function (t, e, n) {!function (e) {t.exports = function (t) {"use strict";function e(t, e) {var n = t[0],r = t[1],o = t[2],i = t[3];r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & o | ~r & i) + e[0] - 680876936 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & o) + e[1] - 389564586 | 0) << 12 | i >>> 20) + n | 0) & n | ~i & r) + e[2] + 606105819 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & n) + e[3] - 1044525330 | 0) << 22 | r >>> 10) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & o | ~r & i) + e[4] - 176418897 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & o) + e[5] + 1200080426 | 0) << 12 | i >>> 20) + n | 0) & n | ~i & r) + e[6] - 1473231341 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & n) + e[7] - 45705983 | 0) << 22 | r >>> 10) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & o | ~r & i) + e[8] + 1770035416 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & o) + e[9] - 1958414417 | 0) << 12 | i >>> 20) + n | 0) & n | ~i & r) + e[10] - 42063 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & n) + e[11] - 1990404162 | 0) << 22 | r >>> 10) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & o | ~r & i) + e[12] + 1804603682 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & o) + e[13] - 40341101 | 0) << 12 | i >>> 20) + n | 0) & n | ~i & r) + e[14] - 1502002290 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & n) + e[15] + 1236535329 | 0) << 22 | r >>> 10) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & i | o & ~i) + e[1] - 165796510 | 0) << 5 | n >>> 27) + r | 0) & o | r & ~o) + e[6] - 1069501632 | 0) << 9 | i >>> 23) + n | 0) & r | n & ~r) + e[11] + 643717713 | 0) << 14 | o >>> 18) + i | 0) & n | i & ~n) + e[0] - 373897302 | 0) << 20 | r >>> 12) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & i | o & ~i) + e[5] - 701558691 | 0) << 5 | n >>> 27) + r | 0) & o | r & ~o) + e[10] + 38016083 | 0) << 9 | i >>> 23) + n | 0) & r | n & ~r) + e[15] - 660478335 | 0) << 14 | o >>> 18) + i | 0) & n | i & ~n) + e[4] - 405537848 | 0) << 20 | r >>> 12) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & i | o & ~i) + e[9] + 568446438 | 0) << 5 | n >>> 27) + r | 0) & o | r & ~o) + e[14] - 1019803690 | 0) << 9 | i >>> 23) + n | 0) & r | n & ~r) + e[3] - 187363961 | 0) << 14 | o >>> 18) + i | 0) & n | i & ~n) + e[8] + 1163531501 | 0) << 20 | r >>> 12) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & i | o & ~i) + e[13] - 1444681467 | 0) << 5 | n >>> 27) + r | 0) & o | r & ~o) + e[2] - 51403784 | 0) << 9 | i >>> 23) + n | 0) & r | n & ~r) + e[7] + 1735328473 | 0) << 14 | o >>> 18) + i | 0) & n | i & ~n) + e[12] - 1926607734 | 0) << 20 | r >>> 12) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r ^ o ^ i) + e[5] - 378558 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ o) + e[8] - 2022574463 | 0) << 11 | i >>> 21) + n | 0) ^ n ^ r) + e[11] + 1839030562 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ n) + e[14] - 35309556 | 0) << 23 | r >>> 9) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r ^ o ^ i) + e[1] - 1530992060 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ o) + e[4] + 1272893353 | 0) << 11 | i >>> 21) + n | 0) ^ n ^ r) + e[7] - 155497632 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ n) + e[10] - 1094730640 | 0) << 23 | r >>> 9) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r ^ o ^ i) + e[13] + 681279174 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ o) + e[0] - 358537222 | 0) << 11 | i >>> 21) + n | 0) ^ n ^ r) + e[3] - 722521979 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ n) + e[6] + 76029189 | 0) << 23 | r >>> 9) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r ^ o ^ i) + e[9] - 640364487 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ o) + e[12] - 421815835 | 0) << 11 | i >>> 21) + n | 0) ^ n ^ r) + e[15] + 530742520 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ n) + e[2] - 995338651 | 0) << 23 | r >>> 9) + o | 0, r = ((r += ((i = ((i += (r ^ ((n = ((n += (o ^ (r | ~i)) + e[0] - 198630844 | 0) << 6 | n >>> 26) + r | 0) | ~o)) + e[7] + 1126891415 | 0) << 10 | i >>> 22) + n | 0) ^ ((o = ((o += (n ^ (i | ~r)) + e[14] - 1416354905 | 0) << 15 | o >>> 17) + i | 0) | ~n)) + e[5] - 57434055 | 0) << 21 | r >>> 11) + o | 0, r = ((r += ((i = ((i += (r ^ ((n = ((n += (o ^ (r | ~i)) + e[12] + 1700485571 | 0) << 6 | n >>> 26) + r | 0) | ~o)) + e[3] - 1894986606 | 0) << 10 | i >>> 22) + n | 0) ^ ((o = ((o += (n ^ (i | ~r)) + e[10] - 1051523 | 0) << 15 | o >>> 17) + i | 0) | ~n)) + e[1] - 2054922799 | 0) << 21 | r >>> 11) + o | 0, r = ((r += ((i = ((i += (r ^ ((n = ((n += (o ^ (r | ~i)) + e[8] + 1873313359 | 0) << 6 | n >>> 26) + r | 0) | ~o)) + e[15] - 30611744 | 0) << 10 | i >>> 22) + n | 0) ^ ((o = ((o += (n ^ (i | ~r)) + e[6] - 1560198380 | 0) << 15 | o >>> 17) + i | 0) | ~n)) + e[13] + 1309151649 | 0) << 21 | r >>> 11) + o | 0, r = ((r += ((i = ((i += (r ^ ((n = ((n += (o ^ (r | ~i)) + e[4] - 145523070 | 0) << 6 | n >>> 26) + r | 0) | ~o)) + e[11] - 1120210379 | 0) << 10 | i >>> 22) + n | 0) ^ ((o = ((o += (n ^ (i | ~r)) + e[2] + 718787259 | 0) << 15 | o >>> 17) + i | 0) | ~n)) + e[9] - 343485551 | 0) << 21 | r >>> 11) + o | 0, t[0] = n + t[0] | 0, t[1] = r + t[1] | 0, t[2] = o + t[2] | 0, t[3] = i + t[3] | 0;}function n(t) {var e,n = [];for (e = 0; e < 64; e += 4) {n[e >> 2] = t.charCodeAt(e) + (t.charCodeAt(e + 1) << 8) + (t.charCodeAt(e + 2) << 16) + (t.charCodeAt(e + 3) << 24);}return n;}function r(t) {var e,n = [];for (e = 0; e < 64; e += 4) {n[e >> 2] = t[e] + (t[e + 1] << 8) + (t[e + 2] << 16) + (t[e + 3] << 24);}return n;}function o(t) {var r,o,i,a,s,u,c = t.length,f = [1732584193, -271733879, -1732584194, 271733878];for (r = 64; r <= c; r += 64) {e(f, n(t.substring(r - 64, r)));}for (o = (t = t.substring(r - 64)).length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], r = 0; r < o; r += 1) {i[r >> 2] |= t.charCodeAt(r) << (r % 4 << 3);}if (i[r >> 2] |= 128 << (r % 4 << 3), r > 55) for (e(f, i), r = 0; r < 16; r += 1) {i[r] = 0;}return a = (a = 8 * c).toString(16).match(/(.*?)(.{0,8})$/), s = parseInt(a[2], 16), u = parseInt(a[1], 16) || 0, i[14] = s, i[15] = u, e(f, i), f;}function i(t) {var e,n = "";for (e = 0; e < 4; e += 1) {n += f[t >> 8 * e + 4 & 15] + f[t >> 8 * e & 15];}return n;}function a(t) {var e;for (e = 0; e < t.length; e += 1) {t[e] = i(t[e]);}return t.join("");}function s(t) {return /[\u0080-\uFFFF]/.test(t) && (t = unescape(encodeURIComponent(t))), t;}function u(t) {var e,n = [],r = t.length;for (e = 0; e < r - 1; e += 2) {n.push(parseInt(t.substr(e, 2), 16));}return String.fromCharCode.apply(String, n);}function c() {this.reset();}var f = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];return a(o("hello")), "undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function () {function e(t, e) {return (t = 0 | t || 0) < 0 ? Math.max(t + e, 0) : Math.min(t, e);}ArrayBuffer.prototype.slice = function (n, r) {var o,i,a,s,u = this.byteLength,c = e(n, u),f = u;return r !== t && (f = e(r, u)), c > f ? new ArrayBuffer(0) : (o = f - c, i = new ArrayBuffer(o), a = new Uint8Array(i), s = new Uint8Array(this, c, o), a.set(s), i);};}(), c.prototype.append = function (t) {return this.appendBinary(s(t)), this;}, c.prototype.appendBinary = function (t) {this._buff += t, this._length += t.length;var r,o = this._buff.length;for (r = 64; r <= o; r += 64) {e(this._hash, n(this._buff.substring(r - 64, r)));}return this._buff = this._buff.substring(r - 64), this;}, c.prototype.end = function (t) {var e,n,r = this._buff,o = r.length,i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];for (e = 0; e < o; e += 1) {i[e >> 2] |= r.charCodeAt(e) << (e % 4 << 3);}return this._finish(i, o), n = a(this._hash), t && (n = u(n)), this.reset(), n;}, c.prototype.reset = function () {return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;}, c.prototype.getState = function () {return { buff: this._buff, length: this._length, hash: this._hash };}, c.prototype.setState = function (t) {return this._buff = t.buff, this._length = t.length, this._hash = t.hash, this;}, c.prototype.destroy = function () {delete this._hash, delete this._buff, delete this._length;}, c.prototype._finish = function (t, n) {var r,o,i,a = n;if (t[a >> 2] |= 128 << (a % 4 << 3), a > 55) for (e(this._hash, t), a = 0; a < 16; a += 1) {t[a] = 0;}r = (r = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/), o = parseInt(r[2], 16), i = parseInt(r[1], 16) || 0, t[14] = o, t[15] = i, e(this._hash, t);}, c.hash = function (t, e) {return c.hashBinary(s(t), e);}, c.hashBinary = function (t, e) {var n = a(o(t));return e ? u(n) : n;}, c.ArrayBuffer = function () {this.reset();}, c.ArrayBuffer.prototype.append = function (t) {var n,o = function (t, e, n) {var r = new Uint8Array(t.byteLength + e.byteLength);return r.set(new Uint8Array(t)), r.set(new Uint8Array(e), t.byteLength), r;}(this._buff.buffer, t),i = o.length;for (this._length += t.byteLength, n = 64; n <= i; n += 64) {e(this._hash, r(o.subarray(n - 64, n)));}return this._buff = n - 64 < i ? new Uint8Array(o.buffer.slice(n - 64)) : new Uint8Array(0), this;}, c.ArrayBuffer.prototype.end = function (t) {var e,n,r = this._buff,o = r.length,i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];for (e = 0; e < o; e += 1) {i[e >> 2] |= r[e] << (e % 4 << 3);}return this._finish(i, o), n = a(this._hash), t && (n = u(n)), this.reset(), n;}, c.ArrayBuffer.prototype.reset = function () {return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this;}, c.ArrayBuffer.prototype.getState = function () {var t = c.prototype.getState.call(this);return t.buff = function (t) {return String.fromCharCode.apply(null, new Uint8Array(t));}(t.buff), t;}, c.ArrayBuffer.prototype.setState = function (t) {return t.buff = function (t, e) {var n,r = t.length,o = new ArrayBuffer(r),i = new Uint8Array(o);for (n = 0; n < r; n += 1) {i[n] = t.charCodeAt(n);}return i;}(t.buff), c.prototype.setState.call(this, t);}, c.ArrayBuffer.prototype.destroy = c.prototype.destroy, c.ArrayBuffer.prototype._finish = c.prototype._finish, c.ArrayBuffer.hash = function (t, n) {var o = a(function (t) {var n,o,i,a,s,u,c = t.length,f = [1732584193, -271733879, -1732584194, 271733878];for (n = 64; n <= c; n += 64) {e(f, r(t.subarray(n - 64, n)));}for (o = (t = n - 64 < c ? t.subarray(n - 64) : new Uint8Array(0)).length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], n = 0; n < o; n += 1) {i[n >> 2] |= t[n] << (n % 4 << 3);}if (i[n >> 2] |= 128 << (n % 4 << 3), n > 55) for (e(f, i), n = 0; n < 16; n += 1) {i[n] = 0;}return a = (a = 8 * c).toString(16).match(/(.*?)(.{0,8})$/), s = parseInt(a[2], 16), u = parseInt(a[1], 16) || 0, i[14] = s, i[15] = u, e(f, i), f;}(new Uint8Array(t)));return n ? u(o) : o;}, c;}();}();}, function (t, e, n) {"use strict";function r(t) {return t && t.__esModule ? t : { default: t };}e.__esModule = !0, e.UploadManager = void 0;var o = r(n(18)),i = r(n(34)),a = r(n(17)),s = n(12),u = n(93);e.UploadManager = function () {function t(e, n, r) {var o = this;(0, a.default)(this, t), this.config = (0, i.default)({ useCdnDomain: !0, disableStatisticsReport: !1, retryCount: 3, checkByMD5: !1, uphost: null, forceDirect: !1, concurrentRequestLimit: 3, region: null }, e.config), this.putExtra = (0, i.default)({ fname: "", params: {}, mimeType: null }, e.putExtra), this.statisticsLogger = r, this.progress = null, this.xhrList = [], this.xhrHandler = function (t) {return o.xhrList.push(t);}, this.aborted = !1, this.file = e.file, this.key = e.key, this.token = e.token, this.onData = function () {}, this.onError = function () {}, this.onComplete = function () {}, this.retryCount = 0, (0, i.default)(this, n);}return t.prototype.putFile = function () {var t = this;if (this.aborted = !1, this.putExtra.fname || (this.putExtra.fname = this.file.name), !this.putExtra.mimeType || !this.putExtra.mimeType.length || (0, s.isContainFileMimeType)(this.file.type, this.putExtra.mimeType)) {var e = (0, s.getUploadUrl)(this.config, this.token).then(function (e) {return t.uploadUrl = e, t.uploadAt = new Date().getTime(), t.config.forceDirect ? t.directUpload() : t.file.size > 4194304 ? t.resumeUpload() : t.directUpload();});return e.then(function (e) {t.onComplete(e.data), t.config.disableStatisticsReport || t.sendLog(e.reqId, 200);}, function (e) {if (t.clear(), e.isRequestError && !t.config.disableStatisticsReport) {var n = t.aborted ? "" : e.reqId,r = t.aborted ? -2 : e.code;t.sendLog(n, r);}var o = e.isRequestError && 0 === e.code && !t.aborted,i = ++t.retryCount <= t.config.retryCount;o && i ? t.putFile() : t.onError(e);}), e;}var n = new Error("file type doesn't match with what you specify");this.onError(n);}, t.prototype.clear = function () {this.xhrList.forEach(function (t) {return t.abort();}), this.xhrList = [];}, t.prototype.stop = function () {this.clear(), this.aborted = !0;}, t.prototype.sendLog = function (t, e) {this.statisticsLogger.log({ code: e, reqId: t, host: (0, s.getDomainFromUrl)(this.uploadUrl), remoteIp: "", port: (0, s.getPortFromUrl)(this.uploadUrl), duration: (new Date().getTime() - this.uploadAt) / 1e3, time: Math.floor(this.uploadAt / 1e3), bytesSent: this.progress ? this.progress.total.loaded : 0, upType: "jssdk-h5", size: this.file.size }, this.token);}, t.prototype.directUpload = function () {var t = this,e = new FormData();return e.append("file", this.file), e.append("token", this.token), null != this.key && e.append("key", this.key), e.append("fname", this.putExtra.fname), (0, s.filterParams)(this.putExtra.params).forEach(function (t) {return e.append(t[0], t[1]);}), (0, s.request)(this.uploadUrl, { method: "POST", body: e, onProgress: function onProgress(e) {t.updateDirectProgress(e.loaded, e.total);}, onCreate: this.xhrHandler }).then(function (e) {return t.finishDirectProgress(), e;});}, t.prototype.resumeUpload = function () {var t = this;this.loaded = { mkFileProgress: 0, chunks: null }, this.ctxList = [], this.localInfo = (0, s.getLocalFileInfo)(this.file), this.chunks = (0, s.getChunks)(this.file, 4194304), this.initChunksProgress();var e = new u.Pool(function (e) {return t.uploadChunk(e);}, this.config.concurrentRequestLimit),n = this.chunks.map(function (t, n) {return e.enqueue({ chunk: t, index: n });}),r = o.default.all(n).then(function () {return t.mkFileReq();});return r.then(function (e) {(0, s.removeLocalFileInfo)(t.file);}, function (e) {701 !== e.code || (0, s.removeLocalFileInfo)(t.file);}), r;}, t.prototype.uploadChunk = function (t) {var e = this,n = t.index,r = t.chunk,i = this.localInfo[n],a = this.uploadUrl + "/mkblk/" + r.size,u = i && !(0, s.isChunkExpired)(i.time),c = this.config.checkByMD5,f = function f() {return e.updateChunkProgress(r.size, n), e.ctxList[n] = { ctx: i.ctx, size: i.size, time: i.time, md5: i.md5 }, o.default.resolve(null);};return u && !c ? f() : (0, s.computeMd5)(r).then(function (t) {if (u && t === i.md5) return f();var o = (0, s.getHeadersForChunkUpload)(e.token),c = function c(t) {e.updateChunkProgress(t.loaded, n);},l = e.xhrHandler;return (0, s.request)(a, { method: "POST", headers: o, body: r, onProgress: c, onCreate: l }).then(function (o) {c({ loaded: r.size }), e.ctxList[n] = { time: new Date().getTime(), ctx: o.data.ctx, size: r.size, md5: t }, (0, s.setLocalFileInfo)(e.file, e.ctxList);});});}, t.prototype.mkFileReq = function () {var t = this,e = (0, i.default)({ mimeType: "application/octet-stream" }, this.putExtra),n = (0, s.createMkFileUrl)(this.uploadUrl, this.file.size, this.key, e),r = this.ctxList.map(function (t) {return t.ctx;}).join(","),a = (0, s.getHeadersForMkFile)(this.token),u = this.xhrHandler;return (0, s.request)(n, { method: "POST", body: r, headers: a, onCreate: u }).then(function (e) {return t.updateMkFileProgress(1), o.default.resolve(e);});}, t.prototype.updateDirectProgress = function (t, e) {this.progress = { total: this.getProgressInfoItem(t, e + 1) }, this.onData(this.progress);}, t.prototype.finishDirectProgress = function () {if (!this.progress) return this.progress = { total: this.getProgressInfoItem(this.file.size, this.file.size) }, void this.onData(this.progress);var t = this.progress.total;this.progress = { total: this.getProgressInfoItem(t.loaded + 1, t.size) }, this.onData(this.progress);}, t.prototype.initChunksProgress = function () {this.loaded.chunks = this.chunks.map(function (t) {return 0;}), this.notifyResumeProgress();}, t.prototype.updateChunkProgress = function (t, e) {this.loaded.chunks[e] = t, this.notifyResumeProgress();}, t.prototype.updateMkFileProgress = function (t) {this.loaded.mkFileProgress = t, this.notifyResumeProgress();}, t.prototype.notifyResumeProgress = function () {var t = this;this.progress = { total: this.getProgressInfoItem((0, s.sum)(this.loaded.chunks) + this.loaded.mkFileProgress, this.file.size + 1), chunks: this.chunks.map(function (e, n) {return t.getProgressInfoItem(t.loaded.chunks[n], e.size);}) }, this.onData(this.progress);}, t.prototype.getProgressInfoItem = function (t, e) {return { loaded: t, size: e, percent: t / e * 100 };}, t;}();}, function (t, e, n) {"use strict";function r(t) {return t && t.__esModule ? t : { default: t };}e.__esModule = !0, e.Pool = void 0;var o = r(n(18)),i = r(n(17));e.Pool = function () {function t(e, n) {(0, i.default)(this, t), this.runTask = e, this.queue = [], this.processing = [], this.limit = n;}return t.prototype.enqueue = function (t) {var e = this;return new o.default(function (n, r) {e.queue.push({ task: t, resolve: n, reject: r }), e.check();});}, t.prototype.run = function (t) {var e = this;this.queue = this.queue.filter(function (e) {return e !== t;}), this.processing.push(t), this.runTask(t.task).then(function () {e.processing = e.processing.filter(function (e) {return e !== t;}), t.resolve(), e.check();}, function (e) {return t.reject(e);});}, t.prototype.check = function () {var t = this,e = this.processing.length,n = this.limit - e;this.queue.slice(0, n).forEach(function (e, n) {t.run(e);});}, t;}();}, function (t, e, n) {"use strict";function r(t, e) {return t = encodeURIComponent(t), "/" !== e.slice(e.length - 1) && (e += "/"), e + t;}function o(t, e, n) {if (!/^\d$/.test(t.mode)) throw "mode should be number in imageView2";var o = t.mode,i = t.w,a = t.h,s = t.q,u = t.format;if (!i && !a) throw "param w and h is empty in imageView2";var c = "imageView2/" + encodeURIComponent(o);return c += i ? "/w/" + encodeURIComponent(i) : "", c += a ? "/h/" + encodeURIComponent(a) : "", c += s ? "/q/" + encodeURIComponent(s) : "", c += u ? "/format/" + encodeURIComponent(u) : "", e && (c = r(e, n) + "?" + c), c;}function i(t, e, n) {var o = t["auto-orient"],i = t.thumbnail,a = t.strip,s = t.gravity,u = t.crop,c = t.quality,f = t.rotate,l = t.format,h = t.blur,p = "imageMogr2";return p += o ? "/auto-orient" : "", p += i ? "/thumbnail/" + encodeURIComponent(i) : "", p += a ? "/strip" : "", p += s ? "/gravity/" + encodeURIComponent(s) : "", p += c ? "/quality/" + encodeURIComponent(c) : "", p += u ? "/crop/" + encodeURIComponent(u) : "", p += f ? "/rotate/" + encodeURIComponent(f) : "", p += l ? "/format/" + encodeURIComponent(l) : "", p += h ? "/blur/" + encodeURIComponent(h) : "", e && (p = r(e, n) + "?" + p), p;}function a(t, e, n) {var o = t.mode;if (!o) throw "mode can't be empty in watermark";var i = "watermark/" + o;if (1 !== o && 2 !== o) throw "mode is wrong";if (1 === o) {var a = t.image;if (!a) throw "image can't be empty in watermark";i += a ? "/image/" + (0, u.urlSafeBase64Encode)(a) : "";}if (2 === o) {var s = t.text,c = t.font,f = t.fontsize,l = t.fill;if (!s) throw "text can't be empty in watermark";i += s ? "/text/" + (0, u.urlSafeBase64Encode)(s) : "", i += c ? "/font/" + (0, u.urlSafeBase64Encode)(c) : "", i += f ? "/fontsize/" + f : "", i += l ? "/fill/" + (0, u.urlSafeBase64Encode)(l) : "";}var h = t.dissolve,p = t.gravity,d = t.dx,g = t.dy;return i += h ? "/dissolve/" + encodeURIComponent(h) : "", i += p ? "/gravity/" + encodeURIComponent(p) : "", i += d ? "/dx/" + encodeURIComponent(d) : "", i += g ? "/dy/" + encodeURIComponent(g) : "", e && (i = r(e, n) + "?" + i), i;}e.__esModule = !0, e.imageView2 = o, e.imageMogr2 = i, e.watermark = a, e.imageInfo = function (t, e) {var n = r(t, e) + "?imageInfo";return (0, s.request)(n, { method: "GET" });}, e.exif = function (t, e) {var n = r(t, e) + "?exif";return (0, s.request)(n, { method: "GET" });}, e.pipeline = function (t, e, n) {var s = void 0,u = void 0,c = "";if ("[object Array]" === Object.prototype.toString.call(t)) {for (var f = 0, l = t.length; f < l; f++) {if (!(s = t[f]).fop) throw "fop can't be empty in pipeline";switch (s.fop) {case "watermark":c += a(s) + "|";break;case "imageView2":c += o(s) + "|";break;case "imageMogr2":c += i(s) + "|";break;default:u = !0;}if (u) throw "fop is wrong in pipeline";}if (e) {var h = (c = r(e, n) + "?" + c).length;"|" === c.slice(h - 1) && (c = c.slice(0, h - 1));}return c;}throw "pipeline's first param should be array";};var s = n(12),u = n(56);}, function (t, e, n) {"use strict";function r(t) {return t && t.__esModule ? t : { default: t };}e.__esModule = !0, e.Observable = void 0;var o = r(n(96)),i = r(n(17));e.Observable = function () {function t(e) {(0, i.default)(this, t), this.subscribeAction = e;}return t.prototype.subscribe = function (t, e, n) {var r = new a(t, e, n),o = this.subscribeAction(r);return new s(r, o);}, t;}();var a = function () {function t(e, n, r) {(0, i.default)(this, t), this.isStopped = !1, "object" === (void 0 === e ? "undefined" : (0, o.default)(e)) ? (this._onNext = e.next, this._onError = e.error, this._onCompleted = e.complete) : (this._onNext = e, this._onError = n, this._onCompleted = r);}return t.prototype.next = function (t) {!this.isStopped && this._onNext && this._onNext(t);}, t.prototype.error = function (t) {!this.isStopped && this._onError && (this.isStopped = !0, this._onError(t));}, t.prototype.complete = function (t) {!this.isStopped && this._onCompleted && (this.isStopped = !0, this._onCompleted(t));}, t;}(),s = function () {function t(e, n) {(0, i.default)(this, t), this.observer = e, this.result = n;}return t.prototype.unsubscribe = function () {this.observer.isStopped = !0, this.result();}, t;}();}, function (t, e, n) {"use strict";function r(t) {return t && t.__esModule ? t : { default: t };}e.__esModule = !0;var o = r(n(97)),i = r(n(99)),a = "function" == typeof i.default && "symbol" == typeof o.default ? function (t) {return typeof t;} : function (t) {return t && "function" == typeof i.default && t.constructor === i.default && t !== i.default.prototype ? "symbol" : typeof t;};e.default = "function" == typeof i.default && "symbol" === a(o.default) ? function (t) {return void 0 === t ? "undefined" : a(t);} : function (t) {return t && "function" == typeof i.default && t.constructor === i.default && t !== i.default.prototype ? "symbol" : void 0 === t ? "undefined" : a(t);};}, function (t, e, n) {t.exports = { default: n(98), __esModule: !0 };}, function (t, e, n) {n(41), n(50), t.exports = n(37).f("iterator");}, function (t, e, n) {t.exports = { default: n(100), __esModule: !0 };}, function (t, e, n) {n(101), n(40), n(107), n(108), t.exports = n(1).Symbol;}, function (t, e, n) {"use strict";var r = n(0),o = n(9),i = n(8),a = n(4),s = n(44),u = n(102).KEY,c = n(10),f = n(30),l = n(23),h = n(22),p = n(2),d = n(37),g = n(38),m = n(103),v = n(104),y = n(3),b = n(7),w = n(11),x = n(28),S = n(21),_ = n(45),P = n(105),C = n(106),U = n(6),I = n(15),F = C.f,k = U.f,E = P.f,_M = r.Symbol,O = r.JSON,T = O && O.stringify,R = p("_hidden"),A = p("toPrimitive"),L = {}.propertyIsEnumerable,D = f("symbol-registry"),j = f("symbols"),B = f("op-symbols"),G = Object.prototype,q = "function" == typeof _M,N = r.QObject,z = !N || !N.prototype || !N.prototype.findChild,H = i && c(function () {return 7 != _(k({}, "a", { get: function get() {return k(this, "a", { value: 7 }).a;} })).a;}) ? function (t, e, n) {var r = F(G, e);r && delete G[e], k(t, e, n), r && t !== G && k(G, e, r);} : k,V = function V(t) {var e = j[t] = _(_M.prototype);return e._k = t, e;},W = q && "symbol" == typeof _M.iterator ? function (t) {return "symbol" == typeof t;} : function (t) {return t instanceof _M;},J = function J(t, e, n) {return t === G && J(B, e, n), y(t), e = x(e, !0), y(n), o(j, e) ? (n.enumerable ? (o(t, R) && t[R][e] && (t[R][e] = !1), n = _(n, { enumerable: S(0, !1) })) : (o(t, R) || k(t, R, S(1, {})), t[R][e] = !0), H(t, e, n)) : k(t, e, n);},X = function X(t, e) {y(t);for (var n, r = m(e = w(e)), o = 0, i = r.length; i > o;) {J(t, n = r[o++], e[n]);}return t;},Y = function Y(t) {var e = L.call(this, t = x(t, !0));return !(this === G && o(j, t) && !o(B, t)) && (!(e || !o(this, t) || !o(j, t) || o(this, R) && this[R][t]) || e);},K = function K(t, e) {if (t = w(t), e = x(e, !0), t !== G || !o(j, e) || o(B, e)) {var n = F(t, e);return !n || !o(j, e) || o(t, R) && t[R][e] || (n.enumerable = !0), n;}},$ = function $(t) {for (var e, n = E(w(t)), r = [], i = 0; n.length > i;) {o(j, e = n[i++]) || e == R || e == u || r.push(e);}return r;},Q = function Q(t) {for (var e, n = t === G, r = E(n ? B : w(t)), i = [], a = 0; r.length > a;) {!o(j, e = r[a++]) || n && !o(G, e) || i.push(j[e]);}return i;};q || (s((_M = function M() {if (this instanceof _M) throw TypeError("Symbol is not a constructor!");var t = h(arguments.length > 0 ? arguments[0] : void 0),e = function e(n) {this === G && e.call(B, n), o(this, R) && o(this[R], t) && (this[R][t] = !1), H(this, t, S(1, n));};return i && z && H(G, t, { configurable: !0, set: e }), V(t);}).prototype, "toString", function () {return this._k;}), C.f = K, U.f = J, n(57).f = P.f = $, n(24).f = Y, n(35).f = Q, i && !n(13) && s(G, "propertyIsEnumerable", Y, !0), d.f = function (t) {return V(p(t));}), a(a.G + a.W + a.F * !q, { Symbol: _M });for (var Z = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), tt = 0; Z.length > tt;) {p(Z[tt++]);}for (var et = I(p.store), nt = 0; et.length > nt;) {g(et[nt++]);}a(a.S + a.F * !q, "Symbol", { for: function _for(t) {return o(D, t += "") ? D[t] : D[t] = _M(t);}, keyFor: function keyFor(t) {if (!W(t)) throw TypeError(t + " is not a symbol!");for (var e in D) {if (D[e] === t) return e;}}, useSetter: function useSetter() {z = !0;}, useSimple: function useSimple() {z = !1;} }), a(a.S + a.F * !q, "Object", { create: function create(t, e) {return void 0 === e ? _(t) : X(_(t), e);}, defineProperty: J, defineProperties: X, getOwnPropertyDescriptor: K, getOwnPropertyNames: $, getOwnPropertySymbols: Q }), O && a(a.S + a.F * (!q || c(function () {var t = _M();return "[null]" != T([t]) || "{}" != T({ a: t }) || "{}" != T(Object(t));})), "JSON", { stringify: function stringify(t) {for (var e, n, r = [t], o = 1; arguments.length > o;) {r.push(arguments[o++]);}if (n = e = r[1], (b(e) || void 0 !== t) && !W(t)) return v(e) || (e = function e(t, _e2) {if ("function" == typeof n && (_e2 = n.call(this, t, _e2)), !W(_e2)) return _e2;}), r[1] = e, T.apply(O, r);} }), _M.prototype[A] || n(5)(_M.prototype, A, _M.prototype.valueOf), l(_M, "Symbol"), l(Math, "Math", !0), l(r.JSON, "JSON", !0);}, function (t, e, n) {var r = n(22)("meta"),o = n(7),i = n(9),a = n(6).f,s = 0,u = Object.isExtensible || function () {return !0;},c = !n(10)(function () {return u(Object.preventExtensions({}));}),f = function f(t) {a(t, r, { value: { i: "O" + ++s, w: {} } });},l = t.exports = { KEY: r, NEED: !1, fastKey: function fastKey(t, e) {if (!o(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;if (!i(t, r)) {if (!u(t)) return "F";if (!e) return "E";f(t);}return t[r].i;}, getWeak: function getWeak(t, e) {if (!i(t, r)) {if (!u(t)) return !0;if (!e) return !1;f(t);}return t[r].w;}, onFreeze: function onFreeze(t) {return c && l.NEED && u(t) && !i(t, r) && f(t), t;} };}, function (t, e, n) {var r = n(15),o = n(35),i = n(24);t.exports = function (t) {var e = r(t),n = o.f;if (n) for (var a, s = n(t), u = i.f, c = 0; s.length > c;) {u.call(t, a = s[c++]) && e.push(a);}return e;};}, function (t, e, n) {var r = n(16);t.exports = Array.isArray || function (t) {return "Array" == r(t);};}, function (t, e, n) {var r = n(11),o = n(57).f,i = {}.toString,a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];t.exports.f = function (t) {return a && "[object Window]" == i.call(t) ? function (t) {try {return o(t);} catch (t) {return a.slice();}}(t) : o(r(t));};}, function (t, e, n) {var r = n(24),o = n(21),i = n(11),a = n(28),s = n(9),u = n(43),c = Object.getOwnPropertyDescriptor;e.f = n(8) ? c : function (t, e) {if (t = i(t), e = a(e, !0), u) try {return c(t, e);} catch (t) {}if (s(t, e)) return o(!r.f.call(t, e), t[e]);};}, function (t, e, n) {n(38)("asyncIterator");}, function (t, e, n) {n(38)("observable");}, function (t, e, n) {"use strict";function r(t) {return t && t.__esModule ? t : { default: t };}e.__esModule = !0, e.StatisticsLogger = void 0;var o = r(n(36)),i = r(n(17)),a = n(12);e.StatisticsLogger = function () {function t() {(0, i.default)(this, t);}return t.prototype.log = function (t, e) {var n = "";(0, o.default)(t).forEach(function (e) {return n += t[e] + ",";}), this.send(n, e, 0);}, t.prototype.send = function (t, e, n) {var r = (0, a.createXHR)(),o = this;r.open("POST", "https://uplog.qbox.me/log/3"), r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r.setRequestHeader("Authorization", "UpToken " + e), r.onreadystatechange = function () {4 === r.readyState && 200 !== r.status && ++n <= 3 && o.send(t, e, n);}, r.send(t);}, t;}();}, function (t, e, n) {"use strict";function r(t) {return t && t.__esModule ? t : { default: t };}e.__esModule = !0;var o = r(n(18)),i = r(n(34)),a = r(n(17)),s = r(n(36)),u = n(111),c = n(12),f = { PNG: "image/png", JPEG: "image/jpeg", WEBP: "image/webp", BMP: "image/bmp" },l = Math.log(2),h = (0, s.default)(f).map(function (t) {return f[t];}),p = f.JPEG,d = function () {function t(e, n) {(0, a.default)(this, t), this.config = (0, i.default)({ quality: .92, noCompressIfLarger: !1 }, n), this.file = e;}return t.prototype.process = function () {var t = this;this.outputType = this.file.type;var e = {};return function (t) {return h.includes(t);}(this.file.type) ? this.getOriginImage().then(function (e) {return t.getCanvas(e);}).then(function (n) {var r = 1;return t.config.maxWidth && (r = Math.min(1, t.config.maxWidth / n.width)), t.config.maxHeight && (r = Math.min(1, r, t.config.maxHeight / n.height)), e.width = n.width, e.height = n.height, t.doScale(n, r);}).then(function (n) {var r = t.toBlob(n);return r.size > t.file.size && t.config.noCompressIfLarger ? { dist: t.file, width: e.width, height: e.height } : { dist: r, width: n.width, height: n.height };}) : o.default.reject(new Error("unsupported file type: " + this.file.type));}, t.prototype.clear = function (t, e, n) {this.outputType === p ? (t.fillStyle = "#fff", t.fillRect(0, 0, e, n)) : t.clearRect(0, 0, e, n);}, t.prototype.getOriginImage = function () {var t = this;return new o.default(function (e, n) {var r = (0, c.createObjectURL)(t.file),o = new Image();o.onload = function () {e(o);}, o.onerror = function () {n("image load error");}, o.src = r;});}, t.prototype.getCanvas = function (t) {var e = this;return new o.default(function (n, r) {u.EXIF.getData(t, function () {var r = u.EXIF.getTag(t, "Orientation") || 1,o = (0, c.getTransform)(t, r),i = o.width,a = o.height,s = o.matrix,f = document.createElement("canvas"),l = f.getContext("2d");f.width = i, f.height = a, e.clear(l, i, a), l.transform.apply(l, s), l.drawImage(t, 0, 0), n(f);});});}, t.prototype.doScale = function (t, e) {if (1 === e) return o.default.resolve(t);var n = t.getContext("2d"),r = Math.min(4, Math.ceil(1 / e / l)),i = Math.pow(e, 1 / r),a = document.createElement("canvas"),s = a.getContext("2d"),u = t.width,c = t.height,f = u,h = c;a.width = u, a.height = c;for (var p = void 0, d = void 0, g = 0; g < r; g++) {var m = u * i | 0,v = c * i | 0;g === r - 1 && (m = f * e, v = h * e), g % 2 == 0 ? (p = t, d = s) : (p = a, d = n), this.clear(d, u, c), d.drawImage(p, 0, 0, u, c, 0, 0, m, v), u = m, c = v;}var y = p === t ? a : t,b = d.getImageData(0, 0, u, c);return y.width = u, y.height = c, d.putImageData(b, 0, 0), o.default.resolve(y);}, t.prototype.toBlob = function (t) {var e = t.toDataURL(this.outputType, this.config.quality),n = atob(e.split(",")[1]).split("").map(function (t) {return t.charCodeAt(0);});return new Blob([new Uint8Array(n)], { type: this.outputType });}, t;}();e.default = function (t, e) {return new d(t, e).process();};}, function (t, e, r) {var o;(function () {function r(t) {return !!t.exifdata;}function i(t, e) {function n(n) {var r = a(n);t.exifdata = r || {};var o = function (t) {var e = new DataView(t);if (d && console.log("Got file of length " + t.byteLength, " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), 255 != e.getUint8(0) || 216 != e.getUint8(1)) return d && console.log("Not a valid JPEG", " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), !1;for (var n = 2, r = t.byteLength; n < r;) {if (function (t, e) {return 56 === t.getUint8(e) && 66 === t.getUint8(e + 1) && 73 === t.getUint8(e + 2) && 77 === t.getUint8(e + 3) && 4 === t.getUint8(e + 4) && 4 === t.getUint8(e + 5);}(e, n)) {var o = e.getUint8(n + 7);o % 2 != 0 && (o += 1), 0 === o && (o = 4);return s(t, n + 8 + o, e.getUint16(n + 6 + o));}n++;}}(n);if (t.iptcdata = o || {}, g.isXmpEnabled) {var i = function (t) {if ("DOMParser" in self) {var e = new DataView(t);if (d && console.log("Got file of length " + t.byteLength, " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), 255 != e.getUint8(0) || 216 != e.getUint8(1)) return d && console.log("Not a valid JPEG", " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), !1;for (var n = 2, r = t.byteLength, o = new DOMParser(); n < r - 4;) {if ("http" == f(e, n, 4)) {var i = n - 1,a = e.getUint16(n - 2) - 1,s = f(e, i, a),u = s.indexOf("xmpmeta>") + 8,c = (s = s.substring(s.indexOf("<x:xmpmeta"), u)).indexOf("x:xmpmeta") + 10;s = s.slice(0, c) + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tiff="http://ns.adobe.com/tiff/1.0/" xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" xmlns:exif="http://ns.adobe.com/exif/1.0/" xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" ' + s.slice(c);return p(o.parseFromString(s, "text/xml"));}n++;}}}(n);t.xmpdata = i || {};}e && e.call(t);}if (t.src) {if (/^data\:/i.test(t.src)) n(function (t, e) {e = e || t.match(/^data\:([^\;]+)\;base64,/im)[1] || "", t = t.replace(/^data\:([^\;]+)\;base64,/gim, "");for (var n = atob(t), r = n.length, o = new ArrayBuffer(r), i = new Uint8Array(o), a = 0; a < r; a++) {i[a] = n.charCodeAt(a);}return o;}(t.src));else if (/^blob\:/i.test(t.src)) (o = new FileReader()).onload = function (t) {n(t.target.result);}, function (t, e) {var n = new XMLHttpRequest();n.open("GET", t, !0), n.responseType = "blob", n.onload = function (t) {200 != this.status && 0 !== this.status || e(this.response);}, n.send();}(t.src, function (t) {o.readAsArrayBuffer(t);});else {var r = new XMLHttpRequest();r.onload = function () {if (200 != this.status && 0 !== this.status) throw "Could not load image";n(r.response), r = null;}, r.open("GET", t.src, !0), r.responseType = "arraybuffer", r.send(null);}} else if (self.FileReader && (t instanceof self.Blob || t instanceof self.File)) {var o;(o = new FileReader()).onload = function (t) {d && console.log("Got file of length " + t.target.result.byteLength, " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), n(t.target.result);}, o.readAsArrayBuffer(t);}}function a(t) {var e = new DataView(t);if (d && console.log("Got file of length " + t.byteLength, " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), 255 != e.getUint8(0) || 216 != e.getUint8(1)) return d && console.log("Not a valid JPEG", " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), !1;for (var n, r = 2, o = t.byteLength; r < o;) {if (255 != e.getUint8(r)) return d && console.log("Not a valid marker at offset " + r + ", found: " + e.getUint8(r), " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), !1;if (n = e.getUint8(r + 1), d && console.log(n, " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), 225 == n) return d && console.log("Found 0xFFE1 marker", " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), l(e, r + 4, e.getUint16(r + 2));r += 2 + e.getUint16(r + 2);}}function s(t, e, n) {for (var r, o, i, a, s = new DataView(t), u = {}, c = e; c < e + n;) {28 === s.getUint8(c) && 2 === s.getUint8(c + 1) && (a = s.getUint8(c + 2)) in x && (i = s.getInt16(c + 3), o = x[a], r = f(s, c + 5, i), u.hasOwnProperty(o) ? u[o] instanceof Array ? u[o].push(r) : u[o] = [u[o], r] : u[o] = r), c++;}return u;}function u(t, e, n, r, o) {var i,a,s,u = t.getUint16(n, !o),f = {};for (s = 0; s < u; s++) {i = n + 12 * s + 2, !(a = r[t.getUint16(i, !o)]) && d && console.log("Unknown tag: " + t.getUint16(i, !o), " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), f[a] = c(t, i, e, n, o);}return f;}function c(t, e, n, r, o) {var i,a,s,u,c,l,h = t.getUint16(e + 2, !o),p = t.getUint32(e + 4, !o),d = t.getUint32(e + 8, !o) + n;switch (h) {case 1:case 7:if (1 == p) return t.getUint8(e + 8, !o);for (i = p > 4 ? d : e + 8, a = [], u = 0; u < p; u++) {a[u] = t.getUint8(i + u);}return a;case 2:return f(t, i = p > 4 ? d : e + 8, p - 1);case 3:if (1 == p) return t.getUint16(e + 8, !o);for (i = p > 2 ? d : e + 8, a = [], u = 0; u < p; u++) {a[u] = t.getUint16(i + 2 * u, !o);}return a;case 4:if (1 == p) return t.getUint32(e + 8, !o);for (a = [], u = 0; u < p; u++) {a[u] = t.getUint32(d + 4 * u, !o);}return a;case 5:if (1 == p) return c = t.getUint32(d, !o), l = t.getUint32(d + 4, !o), (s = new Number(c / l)).numerator = c, s.denominator = l, s;for (a = [], u = 0; u < p; u++) {c = t.getUint32(d + 8 * u, !o), l = t.getUint32(d + 4 + 8 * u, !o), a[u] = new Number(c / l), a[u].numerator = c, a[u].denominator = l;}return a;case 9:if (1 == p) return t.getInt32(e + 8, !o);for (a = [], u = 0; u < p; u++) {a[u] = t.getInt32(d + 4 * u, !o);}return a;case 10:if (1 == p) return t.getInt32(d, !o) / t.getInt32(d + 4, !o);for (a = [], u = 0; u < p; u++) {a[u] = t.getInt32(d + 8 * u, !o) / t.getInt32(d + 4 + 8 * u, !o);}return a;}}function f(t, e, r) {var o = "";for (n = e; n < e + r; n++) {o += String.fromCharCode(t.getUint8(n));}return o;}function l(t, e) {if ("Exif" != f(t, e, 4)) return d && console.log("Not valid EXIF data! " + f(t, e, 4), " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), !1;var n,r,o,i,a,s = e + 6;if (18761 == t.getUint16(s)) n = !1;else {if (19789 != t.getUint16(s)) return d && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)", " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), !1;n = !0;}if (42 != t.getUint16(s + 2, !n)) return d && console.log("Not valid TIFF data! (no 0x002A)", " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), !1;var c = t.getUint32(s + 4, !n);if (c < 8) return d && console.log("Not valid TIFF data! (First offset less than 8)", t.getUint32(s + 4, !n), " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"), !1;if ((r = u(t, s, s + c, v, n)).ExifIFDPointer) for (o in i = u(t, s, s + r.ExifIFDPointer, m, n)) {switch (o) {case "LightSource":case "Flash":case "MeteringMode":case "ExposureProgram":case "SensingMethod":case "SceneCaptureType":case "SceneType":case "CustomRendered":case "WhiteBalance":case "GainControl":case "Contrast":case "Saturation":case "Sharpness":case "SubjectDistanceRange":case "FileSource":i[o] = w[o][i[o]];break;case "ExifVersion":case "FlashpixVersion":i[o] = String.fromCharCode(i[o][0], i[o][1], i[o][2], i[o][3]);break;case "ComponentsConfiguration":i[o] = w.Components[i[o][0]] + w.Components[i[o][1]] + w.Components[i[o][2]] + w.Components[i[o][3]];}r[o] = i[o];}if (r.GPSInfoIFDPointer) for (o in a = u(t, s, s + r.GPSInfoIFDPointer, y, n)) {switch (o) {case "GPSVersionID":a[o] = a[o][0] + "." + a[o][1] + "." + a[o][2] + "." + a[o][3];}r[o] = a[o];}return r.thumbnail = function (t, e, n, r) {var o = function (t, e, n) {var r = t.getUint16(e, !n);return t.getUint32(e + 2 + 12 * r, !n);}(t, e + n, r);if (!o) return {};if (o > t.byteLength) return {};var i = u(t, e, e + o, b, r);if (i.Compression) switch (i.Compression) {case 6:if (i.JpegIFOffset && i.JpegIFByteCount) {var a = e + i.JpegIFOffset,s = i.JpegIFByteCount;i.blob = new Blob([new Uint8Array(t.buffer, a, s)], { type: "image/jpeg" });}break;case 1:console.log("Thumbnail image format is TIFF, which is not implemented.", " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1");break;default:console.log("Unknown thumbnail image format '%s'", i.Compression, " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1");} else 2 == i.PhotometricInterpretation && console.log("Thumbnail image format is RGB, which is not implemented.", " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1");return i;}(t, s, c, n), r;}function h(t) {var e = {};if (1 == t.nodeType) {if (t.attributes.length > 0) {e["@attributes"] = {};for (var n = 0; n < t.attributes.length; n++) {var r = t.attributes.item(n);e["@attributes"][r.nodeName] = r.nodeValue;}}} else if (3 == t.nodeType) return t.nodeValue;if (t.hasChildNodes()) for (var o = 0; o < t.childNodes.length; o++) {var i = t.childNodes.item(o),a = i.nodeName;if (null == e[a]) e[a] = h(i);else {if (null == e[a].push) {var s = e[a];e[a] = [], e[a].push(s);}e[a].push(h(i));}}return e;}function p(t) {try {var e = {};if (t.children.length > 0) for (var n = 0; n < t.children.length; n++) {var r = t.children.item(n),o = r.attributes;for (var i in o) {var a = o[i],s = a.nodeName,u = a.nodeValue;void 0 !== s && (e[s] = u);}var c = r.nodeName;if (void 0 === e[c]) e[c] = h(r);else {if (void 0 === e[c].push) {var f = e[c];e[c] = [], e[c].push(f);}e[c].push(h(r));}} else e = t.textContent;return e;} catch (t) {console.log(t.message, " at node_modules\\qiniu-js\\dist\\qiniu.min.js:1");}}var d = !1,g = function g(t) {return t instanceof g ? t : this instanceof g ? void (this.EXIFwrapped = t) : new g(t);};void 0 !== t && t.exports && (e = t.exports = g), e.EXIF = g;var m = g.Tags = { 36864: "ExifVersion", 40960: "FlashpixVersion", 40961: "ColorSpace", 40962: "PixelXDimension", 40963: "PixelYDimension", 37121: "ComponentsConfiguration", 37122: "CompressedBitsPerPixel", 37500: "MakerNote", 37510: "UserComment", 40964: "RelatedSoundFile", 36867: "DateTimeOriginal", 36868: "DateTimeDigitized", 37520: "SubsecTime", 37521: "SubsecTimeOriginal", 37522: "SubsecTimeDigitized", 33434: "ExposureTime", 33437: "FNumber", 34850: "ExposureProgram", 34852: "SpectralSensitivity", 34855: "ISOSpeedRatings", 34856: "OECF", 37377: "ShutterSpeedValue", 37378: "ApertureValue", 37379: "BrightnessValue", 37380: "ExposureBias", 37381: "MaxApertureValue", 37382: "SubjectDistance", 37383: "MeteringMode", 37384: "LightSource", 37385: "Flash", 37396: "SubjectArea", 37386: "FocalLength", 41483: "FlashEnergy", 41484: "SpatialFrequencyResponse", 41486: "FocalPlaneXResolution", 41487: "FocalPlaneYResolution", 41488: "FocalPlaneResolutionUnit", 41492: "SubjectLocation", 41493: "ExposureIndex", 41495: "SensingMethod", 41728: "FileSource", 41729: "SceneType", 41730: "CFAPattern", 41985: "CustomRendered", 41986: "ExposureMode", 41987: "WhiteBalance", 41988: "DigitalZoomRation", 41989: "FocalLengthIn35mmFilm", 41990: "SceneCaptureType", 41991: "GainControl", 41992: "Contrast", 41993: "Saturation", 41994: "Sharpness", 41995: "DeviceSettingDescription", 41996: "SubjectDistanceRange", 40965: "InteroperabilityIFDPointer", 42016: "ImageUniqueID" },v = g.TiffTags = { 256: "ImageWidth", 257: "ImageHeight", 34665: "ExifIFDPointer", 34853: "GPSInfoIFDPointer", 40965: "InteroperabilityIFDPointer", 258: "BitsPerSample", 259: "Compression", 262: "PhotometricInterpretation", 274: "Orientation", 277: "SamplesPerPixel", 284: "PlanarConfiguration", 530: "YCbCrSubSampling", 531: "YCbCrPositioning", 282: "XResolution", 283: "YResolution", 296: "ResolutionUnit", 273: "StripOffsets", 278: "RowsPerStrip", 279: "StripByteCounts", 513: "JPEGInterchangeFormat", 514: "JPEGInterchangeFormatLength", 301: "TransferFunction", 318: "WhitePoint", 319: "PrimaryChromaticities", 529: "YCbCrCoefficients", 532: "ReferenceBlackWhite", 306: "DateTime", 270: "ImageDescription", 271: "Make", 272: "Model", 305: "Software", 315: "Artist", 33432: "Copyright" },y = g.GPSTags = { 0: "GPSVersionID", 1: "GPSLatitudeRef", 2: "GPSLatitude", 3: "GPSLongitudeRef", 4: "GPSLongitude", 5: "GPSAltitudeRef", 6: "GPSAltitude", 7: "GPSTimeStamp", 8: "GPSSatellites", 9: "GPSStatus", 10: "GPSMeasureMode", 11: "GPSDOP", 12: "GPSSpeedRef", 13: "GPSSpeed", 14: "GPSTrackRef", 15: "GPSTrack", 16: "GPSImgDirectionRef", 17: "GPSImgDirection", 18: "GPSMapDatum", 19: "GPSDestLatitudeRef", 20: "GPSDestLatitude", 21: "GPSDestLongitudeRef", 22: "GPSDestLongitude", 23: "GPSDestBearingRef", 24: "GPSDestBearing", 25: "GPSDestDistanceRef", 26: "GPSDestDistance", 27: "GPSProcessingMethod", 28: "GPSAreaInformation", 29: "GPSDateStamp", 30: "GPSDifferential" },b = g.IFD1Tags = { 256: "ImageWidth", 257: "ImageHeight", 258: "BitsPerSample", 259: "Compression", 262: "PhotometricInterpretation", 273: "StripOffsets", 274: "Orientation", 277: "SamplesPerPixel", 278: "RowsPerStrip", 279: "StripByteCounts", 282: "XResolution", 283: "YResolution", 284: "PlanarConfiguration", 296: "ResolutionUnit", 513: "JpegIFOffset", 514: "JpegIFByteCount", 529: "YCbCrCoefficients", 530: "YCbCrSubSampling", 531: "YCbCrPositioning", 532: "ReferenceBlackWhite" },w = g.StringValues = { ExposureProgram: { 0: "Not defined", 1: "Manual", 2: "Normal program", 3: "Aperture priority", 4: "Shutter priority", 5: "Creative program", 6: "Action program", 7: "Portrait mode", 8: "Landscape mode" }, MeteringMode: { 0: "Unknown", 1: "Average", 2: "CenterWeightedAverage", 3: "Spot", 4: "MultiSpot", 5: "Pattern", 6: "Partial", 255: "Other" }, LightSource: { 0: "Unknown", 1: "Daylight", 2: "Fluorescent", 3: "Tungsten (incandescent light)", 4: "Flash", 9: "Fine weather", 10: "Cloudy weather", 11: "Shade", 12: "Daylight fluorescent (D 5700 - 7100K)", 13: "Day white fluorescent (N 4600 - 5400K)", 14: "Cool white fluorescent (W 3900 - 4500K)", 15: "White fluorescent (WW 3200 - 3700K)", 17: "Standard light A", 18: "Standard light B", 19: "Standard light C", 20: "D55", 21: "D65", 22: "D75", 23: "D50", 24: "ISO studio tungsten", 255: "Other" }, Flash: { 0: "Flash did not fire", 1: "Flash fired", 5: "Strobe return light not detected", 7: "Strobe return light detected", 9: "Flash fired, compulsory flash mode", 13: "Flash fired, compulsory flash mode, return light not detected", 15: "Flash fired, compulsory flash mode, return light detected", 16: "Flash did not fire, compulsory flash mode", 24: "Flash did not fire, auto mode", 25: "Flash fired, auto mode", 29: "Flash fired, auto mode, return light not detected", 31: "Flash fired, auto mode, return light detected", 32: "No flash function", 65: "Flash fired, red-eye reduction mode", 69: "Flash fired, red-eye reduction mode, return light not detected", 71: "Flash fired, red-eye reduction mode, return light detected", 73: "Flash fired, compulsory flash mode, red-eye reduction mode", 77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected", 79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected", 89: "Flash fired, auto mode, red-eye reduction mode", 93: "Flash fired, auto mode, return light not detected, red-eye reduction mode", 95: "Flash fired, auto mode, return light detected, red-eye reduction mode" }, SensingMethod: { 1: "Not defined", 2: "One-chip color area sensor", 3: "Two-chip color area sensor", 4: "Three-chip color area sensor", 5: "Color sequential area sensor", 7: "Trilinear sensor", 8: "Color sequential linear sensor" }, SceneCaptureType: { 0: "Standard", 1: "Landscape", 2: "Portrait", 3: "Night scene" }, SceneType: { 1: "Directly photographed" }, CustomRendered: { 0: "Normal process", 1: "Custom process" }, WhiteBalance: { 0: "Auto white balance", 1: "Manual white balance" }, GainControl: { 0: "None", 1: "Low gain up", 2: "High gain up", 3: "Low gain down", 4: "High gain down" }, Contrast: { 0: "Normal", 1: "Soft", 2: "Hard" }, Saturation: { 0: "Normal", 1: "Low saturation", 2: "High saturation" }, Sharpness: { 0: "Normal", 1: "Soft", 2: "Hard" }, SubjectDistanceRange: { 0: "Unknown", 1: "Macro", 2: "Close view", 3: "Distant view" }, FileSource: { 3: "DSC" }, Components: { 0: "", 1: "Y", 2: "Cb", 3: "Cr", 4: "R", 5: "G", 6: "B" } },x = { 120: "caption", 110: "credit", 25: "keywords", 55: "dateCreated", 80: "byline", 85: "bylineTitle", 122: "captionWriter", 105: "headline", 116: "copyright", 15: "category" };g.enableXmp = function () {g.isXmpEnabled = !0;}, g.disableXmp = function () {g.isXmpEnabled = !1;}, g.getData = function (t, e) {return !((self.Image && t instanceof self.Image || self.HTMLImageElement && t instanceof self.HTMLImageElement) && !t.complete || (r(t) ? e && e.call(t) : i(t, e), 0));}, g.getTag = function (t, e) {if (r(t)) return t.exifdata[e];}, g.getIptcTag = function (t, e) {if (r(t)) return t.iptcdata[e];}, g.getAllTags = function (t) {if (!r(t)) return {};var e,n = t.exifdata,o = {};for (e in n) {n.hasOwnProperty(e) && (o[e] = n[e]);}return o;}, g.getAllIptcTags = function (t) {if (!r(t)) return {};var e,n = t.iptcdata,o = {};for (e in n) {n.hasOwnProperty(e) && (o[e] = n[e]);}return o;}, g.pretty = function (t) {if (!r(t)) return "";var e,n = t.exifdata,o = "";for (e in n) {n.hasOwnProperty(e) && ("object" == typeof n[e] ? n[e] instanceof Number ? o += e + " : " + n[e] + " [" + n[e].numerator + "/" + n[e].denominator + "]\r\n" : o += e + " : [" + n[e].length + " values]\r\n" : o += e + " : " + n[e] + "\r\n");}return o;}, g.readFromBinaryFile = function (t) {return a(t);}, void 0 === (o = function () {return g;}.apply(e, [])) || (t.exports = o);}).call(this);}]);});

/***/ }),

/***/ "../../../../../myapps/pages.json":
/*!****************************!*\
  !*** D:/myapps/pages.json ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "../../../../../myapps/static/js/weCropper.js":
/*!****************************************!*\
  !*** D:/myapps/static/js/weCropper.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
})(void 0, function () {
  'use strict';

  /**
                 * Created by sail on 2017/6/11.
                 */
  var device = void 0;
  var TOUCH_STATE = ['touchstarted', 'touchmoved', 'touchended'];

  function firstLetterUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function setTouchState(instance) {
    for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      arg[_key - 1] = arguments[_key];
    }

    TOUCH_STATE.forEach(function (key, i) {
      if (arg[i] !== undefined) {
        instance[key] = arg[i];
      }
    });
  }

  function validator(instance, o) {
    Object.defineProperties(instance, o);
  }

  function getDevice() {
    if (!device) {
      device = wx.getSystemInfoSync();
    }
    return device;
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };




  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();




  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var tmp = {};

  var DEFAULT = {
    id: {
      default: 'cropper',
      get: function get$$1() {
        return tmp.id;
      },
      set: function set$$1(value) {
        if (typeof value !== 'string') {}
        tmp.id = value;
      } },

    width: {
      default: 750,
      get: function get$$1() {
        return tmp.width;
      },
      set: function set$$1(value) {
        tmp.width = value;
      } },

    height: {
      default: 750,
      get: function get$$1() {
        return tmp.height;
      },
      set: function set$$1(value) {
        tmp.height = value;
      } },

    scale: {
      default: 2.5,
      get: function get$$1() {
        return tmp.scale;
      },
      set: function set$$1(value) {
        tmp.scale = value;
      } },

    zoom: {
      default: 5,
      get: function get$$1() {
        return tmp.zoom;
      },
      set: function set$$1(value) {
        tmp.zoom = value;
      } },

    src: {
      default: 'cropper',
      get: function get$$1() {
        return tmp.src;
      },
      set: function set$$1(value) {
        tmp.src = value;
      } },

    cut: {
      default: {},
      get: function get$$1() {
        return tmp.cut;
      },
      set: function set$$1(value) {
        tmp.cut = value;
      } },

    onReady: {
      default: null,
      get: function get$$1() {
        return tmp.ready;
      },
      set: function set$$1(value) {
        tmp.ready = value;
      } },

    onBeforeImageLoad: {
      default: null,
      get: function get$$1() {
        return tmp.beforeImageLoad;
      },
      set: function set$$1(value) {
        tmp.beforeImageLoad = value;
      } },

    onImageLoad: {
      default: null,
      get: function get$$1() {
        return tmp.imageLoad;
      },
      set: function set$$1(value) {
        tmp.imageLoad = value;
      } },

    onBeforeDraw: {
      default: null,
      get: function get$$1() {
        return tmp.beforeDraw;
      },
      set: function set$$1(value) {
        tmp.beforeDraw = value;
      } } };



  /**
              * Created by sail on 2017/6/11.
              */
  function prepare() {
    var self = this;

    var _getDevice = getDevice(),
    windowWidth = _getDevice.windowWidth;

    self.attachPage = function () {
      var pages = getCurrentPages
      //  获取到当前page上下文
      ();
      var pageContext = pages[pages.length - 1];
      //  把this依附在Page上下文的wecropper属性上，便于在page钩子函数中访问
      pageContext.wecropper = self;
    };

    self.createCtx = function () {
      var id = self.id;

      if (id) {
        self.ctx = wx.createCanvasContext(id);
      }
    };

    self.deviceRadio = windowWidth / 750;
    self.deviceRadio = self.deviceRadio.toFixed(2);
  }

  /**
     *
     */
  function observer() {
    var self = this;

    var EVENT_TYPE = ['ready', 'beforeImageLoad', 'beforeDraw', 'imageLoad'];

    self.on = function (event, fn) {
      if (EVENT_TYPE.indexOf(event) > -1) {
        if (typeof fn === 'function') {
          event === 'ready' ? fn(self) : self['on' + firstLetterUpper(event)] = fn;
        }
      }
      return self;
    };
  }

  /**
     * Created by sail on 2017/6/11.
     */
  function methods() {
    var self = this;

    var deviceRadio = self.deviceRadio;
    // console.log(JSON.stringify(self));

    var boundWidth = self.width; // 裁剪框默认宽度，即整个画布宽度
    var boundHeight = self.height; // 裁剪框默认高度，即整个画布高度
    var _self$cut = self.cut,
    _self$cut$x = _self$cut.x,
    x = _self$cut$x === undefined ? 0 : _self$cut$x,
    _self$cut$y = _self$cut.y,
    y = _self$cut$y === undefined ? 0 : _self$cut$y,
    _self$cut$width = _self$cut.width,
    width = _self$cut$width === undefined ? boundWidth : _self$cut$width,
    _self$cut$height = _self$cut.height,
    height = _self$cut$height === undefined ? boundHeight : _self$cut$height;


    self.updateCanvas = function () {
      if (self.croperTarget) {

        //  画布绘制图片
        self.ctx.drawImage(self.croperTarget, self.imgLeft, self.imgTop, self.scaleWidth, self.scaleHeight);
      }
      typeof self.onBeforeDraw === 'function' && self.onBeforeDraw(self.ctx, self);

      self.setBoundStyle //	设置边界样式
      ();
      self.ctx.draw();
      return self;
    };

    self.pushOrign = function (src) {
      self.src = src;

      typeof self.onBeforeImageLoad === 'function' && self.onBeforeImageLoad(self.ctx, self);

      uni.getImageInfo({
        src: src,
        success: function success(res) {
          var innerAspectRadio = res.width / res.height;
          self.croperTarget = res.path || src;
          if (innerAspectRadio < width / height) {
            self.rectX = x;
            self.baseWidth = width;
            self.baseHeight = width / innerAspectRadio;
            self.rectY = y - Math.abs((height - self.baseHeight) / 2);
          } else {
            self.rectY = y;
            self.baseWidth = height * innerAspectRadio;
            self.baseHeight = height;
            self.rectX = x - Math.abs((width - self.baseWidth) / 2);
          }

          self.imgLeft = self.rectX;
          self.imgTop = self.rectY;
          self.scaleWidth = self.baseWidth;
          self.scaleHeight = self.baseHeight;

          self.updateCanvas();

          typeof self.onImageLoad === 'function' && self.onImageLoad(self.ctx, self);
        } });


      self.update();
      return self;
    };

    self.getCropperImage = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var id = self.id;

      var ARG_TYPE = toString.call(args[0]);
      switch (ARG_TYPE) {
        case '[object Object]':
          var _args$0$quality = args[0].quality,
          quality = _args$0$quality === undefined ? 10 : _args$0$quality;
          console.log("quality--" + quality, " at static\\js\\weCropper.js:353");

          uni.canvasToTempFilePath({
            canvasId: id,
            x: x,
            y: y,
            width: width,
            height: height,
            destWidth: width * quality / (deviceRadio * 10),
            destHeight: height * quality / (deviceRadio * 10),
            success: function success(res) {
              console.log(res, " at static\\js\\weCropper.js:364");
              typeof args[args.length - 1] === 'function' && args[args.length - 1](res.tempFilePath);
            } });

          break;
        case '[object Function]':
          uni.canvasToTempFilePath({
            canvasId: id,
            x: x,
            y: y,
            fileType: "jpg",
            width: width,
            height: height,
            destWidth: width,
            destHeight: height,
            success: function success(res) {

              typeof args[args.length - 1] === 'function' && args[args.length - 1](res.tempFilePath);
            } });

          break;}


      return self;
    };
  }

  /**
     * Created by sail on 2017/6/11.
     */
  function update() {
    var self = this;
    if (!self.src) return;

    self.__oneTouchStart = function (touch) {
      self.touchX0 = touch.x;
      self.touchY0 = touch.y;
    };

    self.__oneTouchMove = function (touch) {
      var xMove = void 0,
      yMove = void 0;
      //计算单指移动的距离
      if (self.touchended) {
        return self.updateCanvas();
      }
      xMove = touch.x - self.touchX0;
      yMove = touch.y - self.touchY0;

      var imgLeft = self.rectX + xMove;
      var imgTop = self.rectY + yMove;

      self.outsideBound(imgLeft, imgTop);

      self.updateCanvas();
    };

    self.__twoTouchStart = function (touch0, touch1) {
      var xMove = void 0,
      yMove = void 0,
      oldDistance = void 0;

      self.touchX1 = self.rectX + self.scaleWidth / 2;
      self.touchY1 = self.rectY + self.scaleHeight / 2;

      //计算两指距离
      xMove = touch1.x - touch0.x;
      yMove = touch1.y - touch0.y;
      oldDistance = Math.sqrt(xMove * xMove + yMove * yMove);

      self.oldDistance = oldDistance;
    };

    self.__twoTouchMove = function (touch0, touch1) {
      var xMove = void 0,
      yMove = void 0,
      newDistance = void 0;
      var scale = self.scale,
      zoom = self.zoom;
      // 计算二指最新距离

      xMove = touch1.x - touch0.x;
      yMove = touch1.y - touch0.y;
      newDistance = Math.sqrt(xMove * xMove + yMove * yMove

      //  使用0.005的缩放倍数具有良好的缩放体验
      );
      self.newScale = self.oldScale + 0.001 * zoom * (newDistance - self.oldDistance);

      //  设定缩放范围
      self.newScale <= 1 && (self.newScale = 1);
      self.newScale >= scale && (self.newScale = scale);

      self.scaleWidth = self.newScale * self.baseWidth;
      self.scaleHeight = self.newScale * self.baseHeight;
      var imgLeft = self.touchX1 - self.scaleWidth / 2;
      var imgTop = self.touchY1 - self.scaleHeight / 2;

      self.outsideBound(imgLeft, imgTop);

      self.updateCanvas();
    };

    self.__xtouchEnd = function () {
      self.oldScale = self.newScale;
      self.rectX = self.imgLeft;
      self.rectY = self.imgTop;
    };
  }

  /**
     * Created by sail on 2017/6/11.
     */

  var handle = {
    //  图片手势初始监测
    touchStart: function touchStart(e) {
      var self = this;
      var _e$touches = slicedToArray(e.touches, 2),
      touch0 = _e$touches[0],
      touch1 = _e$touches[1];

      // console.log(JSON.stringify(touch1));
      if (!touch0.x) {
        touch0.x = touch0.clientX;
        touch0.y = touch0.clientY;
        if (touch1) {
          touch1.x = touch1.clientX;
          touch1.y = touch1.clientY;
        }
      }

      setTouchState(self, true, null, null

      //计算第一个触摸点的位置，并参照改点进行缩放
      );
      self.__oneTouchStart(touch0

      // 两指手势触发
      );
      if (e.touches.length >= 2) {
        self.__twoTouchStart(touch0, touch1);
      }
    },


    //  图片手势动态缩放
    touchMove: function touchMove(e) {
      var self = this;

      var _e$touches2 = slicedToArray(e.touches, 2),
      touch0 = _e$touches2[0],
      touch1 = _e$touches2[1];
      if (!touch0.x) {
        touch0.x = touch0.clientX;
        touch0.y = touch0.clientY;
        if (touch1) {
          touch1.x = touch1.clientX;
          touch1.y = touch1.clientY;
        }
      }
      setTouchState(self, null, true

      // 单指手势时触发
      );
      if (e.touches.length === 1) {
        self.__oneTouchMove(touch0);
      }
      // 两指手势触发
      if (e.touches.length >= 2) {
        self.__twoTouchMove(touch0, touch1);
      }
    },
    touchEnd: function touchEnd(e) {
      var self = this;

      setTouchState(self, false, false, true);
      self.__xtouchEnd();
    } };


  /**
          * Created by sail on 1017/6/12.
          */
  function cut() {
    var self = this;
    var deviceRadio = self.deviceRadio;

    var boundWidth = self.width; // 裁剪框默认宽度，即整个画布宽度
    var boundHeight = self.height;
    // 裁剪框默认高度，即整个画布高度
    var _self$cut = self.cut,
    _self$cut$x = _self$cut.x,
    x = _self$cut$x === undefined ? 0 : _self$cut$x,
    _self$cut$y = _self$cut.y,
    y = _self$cut$y === undefined ? 0 : _self$cut$y,
    _self$cut$width = _self$cut.width,
    width = _self$cut$width === undefined ? boundWidth : _self$cut$width,
    _self$cut$height = _self$cut.height,
    height = _self$cut$height === undefined ? boundHeight : _self$cut$height;

    /**
                                                                               * 设置边界
                                                                               * @param imgLeft 图片左上角横坐标值
                                                                               * @param imgTop 图片左上角纵坐标值
                                                                               */

    self.outsideBound = function (imgLeft, imgTop) {
      self.imgLeft = imgLeft >= x ? x : self.scaleWidth + imgLeft - x <= width ? x + width - self.scaleWidth : imgLeft;

      self.imgTop = imgTop >= y ? y : self.scaleHeight + imgTop - y <= height ? y + height - self.scaleHeight : imgTop;
    };

    /**
        * 设置边界样式
        * @param color	边界颜色
        */
    self.setBoundStyle = function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$color = _ref.color,
      color = _ref$color === undefined ? '#04b00f' : _ref$color,
      _ref$mask = _ref.mask,
      mask = _ref$mask === undefined ? 'rgba(0, 0, 0, 0.3)' : _ref$mask,
      _ref$lineWidth = _ref.lineWidth,
      lineWidth = _ref$lineWidth === undefined ? 1 : _ref$lineWidth;

      // 绘制半透明层
      self.ctx.beginPath();
      self.ctx.setFillStyle(mask);
      self.ctx.fillRect(0, 0, x, boundHeight);
      self.ctx.fillRect(x, 0, width, y);
      self.ctx.fillRect(x, y + height, width, boundHeight - y - height);
      self.ctx.fillRect(x + width, 0, boundWidth - x - width, boundHeight);
      self.ctx.fill

      // 设置边界左上角样式
      // 为使边界样式处于边界外边缘，此时x、y均要减少lineWidth
      ();
      self.ctx.beginPath();
      self.ctx.setStrokeStyle(color);
      self.ctx.setLineWidth(lineWidth);
      self.ctx.moveTo(x - lineWidth, y + 10 - lineWidth);
      self.ctx.lineTo(x - lineWidth, y - lineWidth);
      self.ctx.lineTo(x + 10 - lineWidth, y - lineWidth);
      self.ctx.stroke

      // 设置边界左下角样式
      // 为使边界样式处于边界外边缘，此时x要减少lineWidth、y要增加lineWidth
      ();
      self.ctx.beginPath();
      self.ctx.setStrokeStyle(color);
      self.ctx.setLineWidth(lineWidth);
      self.ctx.moveTo(x - lineWidth, y + height - 10 + lineWidth);
      self.ctx.lineTo(x - lineWidth, y + height + lineWidth);
      self.ctx.lineTo(x + 10 - lineWidth, y + height + lineWidth);
      self.ctx.stroke

      // 设置边界右上角样式
      // 为使边界样式处于边界外边缘，此时x要增加lineWidth、y要减少lineWidth
      ();
      self.ctx.beginPath();
      self.ctx.setStrokeStyle(color);
      self.ctx.setLineWidth(lineWidth);
      self.ctx.moveTo(x + width - 10 + lineWidth, y - lineWidth);
      self.ctx.lineTo(x + width + lineWidth, y - lineWidth);
      self.ctx.lineTo(x + width + lineWidth, y + 10 - lineWidth);
      self.ctx.stroke

      // 设置边界右下角样式
      // 为使边界样式处于边界外边缘，此时x、y均要增加lineWidth
      ();
      self.ctx.beginPath();
      self.ctx.setStrokeStyle(color);
      self.ctx.setLineWidth(lineWidth);
      self.ctx.moveTo(x + width + lineWidth, y + height - 10 + lineWidth);
      self.ctx.lineTo(x + width + lineWidth, y + height + lineWidth);
      self.ctx.lineTo(x + width - 10 + lineWidth, y + height + lineWidth);
      self.ctx.stroke();
    };
  }

  var __version__ = '1.1.4';

  var weCropper = function () {
    function weCropper(params) {
      classCallCheck(this, weCropper);

      var self = this;
      var _default = {};

      validator(self, DEFAULT);

      Object.keys(DEFAULT).forEach(function (key) {
        _default[key] = DEFAULT[key].default;
      });
      Object.assign(self, _default, params);

      self.prepare();
      self.attachPage();
      self.createCtx();
      self.observer();
      self.cutt();
      self.methods();
      self.init();
      self.update();

      return self;
    }

    createClass(weCropper, [{
      key: 'init',
      value: function init() {
        var self = this;
        var src = self.src;


        self.version = __version__;

        typeof self.onReady === 'function' && self.onReady(self.ctx, self);

        if (src) {
          self.pushOrign(src);
        }
        setTouchState(self, false, false, false);

        self.oldScale = 1;
        self.newScale = 1;

        return self;
      } }]);

    return weCropper;
  }();

  Object.assign(weCropper.prototype, handle);


  weCropper.prototype.prepare = prepare;
  weCropper.prototype.observer = observer;
  weCropper.prototype.methods = methods;
  weCropper.prototype.cutt = cut;
  weCropper.prototype.update = update;

  return weCropper;

});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["default"]))

/***/ }),

/***/ "../../../../../myapps/static/js/webim.js":
/*!************************************!*\
  !*** D:/myapps/static/js/webim.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}module.exports = function () {
  /* webim javascript SDK
                                                                                                                                                                                                                                                      * VER 1.7.0
                                                                                                                                                                                                                                                      */

  /* webim API definitions
                                                                                                                                                                                                                                                          */
  var msgCache = {};
  var webim = { // namespace object webim

    /* function init
     *   sdk登录
     * params:
     *   loginInfo      - Object, 登录身份相关参数集合，详见下面
     *   {
     *     sdkAppID     - String, 用户标识接入SDK的应用ID，必填
     *     accountType  - int, 账号类型，必填
     *     identifier   - String, 用户帐号,必须是字符串类型，必填
     *     identifierNick   - String, 用户昵称，选填
     *     userSig      - String, 鉴权Token，必须是字符串类型，必填
     *   }
     *   listeners      - Object, 事件回调函数集合, 详见下面
     *   {
     *     onConnNotify - function(connInfo), 用于收到连接状态相关通知的回调函数,目前未使用
     *     jsonpCallback -function(rspData),//IE9(含)以下浏览器用到的jsonp回调函数
     *     onMsgNotify  - function(newMsgList), 用于收到消息通知的回调函数,
     *      newMsgList为新消息数组，格式为[Msg对象]
     *      使用方有两种处理回调: 1)处理newMsgList中的增量消息,2)直接访问webim.MsgStore获取最新的消息
     *     onGroupInfoChangeNotify  - function(groupInfo), 用于监听群组资料变更的回调函数,
     *          groupInfo为新的群组资料信息
     *     onGroupSystemNotifys - Object, 用于监听（多终端同步）群系统消息的回调函数对象
     *
     *   }
     *   options        - Object, 其它选项, 目前未使用
     * return:
     *   (无)
     */
    login: function login(loginInfo, listeners, options) {
    },

    /* function syncMsgs
        *   拉取最新C2C消息
        *   一般不需要使用方直接调用, SDK底层会自动同步最新消息并通知使用方, 一种有用的调用场景是用户手动触发刷新消息
        * params:
        *   cbOk   - function(msgList)类型, 当同步消息成功时的回调函数, msgList为新消息数组，格式为[Msg对象],
        *            如果此参数为null或undefined则同步消息成功后会像自动同步那样回调cbNotify
        *   cbErr  - function(err)类型, 当同步消息失败时的回调函数, err为错误对象
        * return:
        *   (无)
        */
    syncMsgs: function syncMsgs(cbOk, cbErr) {
    },


    /* function getC2CHistoryMsgs
        * 拉取C2C漫游消息
        * params:
        *   options    - 请求参数
        *   cbOk   - function(msgList)类型, 成功时的回调函数, msgList为消息数组，格式为[Msg对象],
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getC2CHistoryMsgs: function getC2CHistoryMsgs(options, cbOk, cbErr) {
    },

    /* function syncGroupMsgs
        * 拉取群漫游消息
        * params:
        *   options    - 请求参数
        *   cbOk   - function(msgList)类型, 成功时的回调函数, msgList为消息数组，格式为[Msg对象],
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    syncGroupMsgs: function syncGroupMsgs(options, cbOk, cbErr) {
    },

    /* function sendMsg
        *   发送一条消息
        * params:
        *   msg    - webim.Msg类型, 要发送的消息对象
        *   cbOk   - function()类型, 当发送消息成功时的回调函数
        *   cbErr  - function(err)类型, 当发送消息失败时的回调函数, err为错误对象
        * return:
        *   (无)
        */
    sendMsg: function sendMsg(msg, cbOk, cbErr) {
    },

    /* function logout
        *   sdk登出
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    logout: function logout(cbOk, cbErr) {
    },

    /* function setAutoRead
        * 设置会话自动已读上报标志
        * params:
        *   selSess    - webim.Session类型, 当前会话
        *   isOn   - boolean, 将selSess的自动已读消息标志改为isOn，同时是否上报当前会话已读消息
        *   isResetAll - boolean，是否重置所有会话的自动已读标志
        * return:
        *   (无)
        */
    setAutoRead: function setAutoRead(selSess, isOn, isResetAll) {
    },

    /* function getProfilePortrait
        *   拉取资料（搜索用户）
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getProfilePortrait: function getProfilePortrait(options, cbOk, cbErr) {
    },

    /* function setProfilePortrait
        *   设置个人资料
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    setProfilePortrait: function setProfilePortrait(options, cbOk, cbErr) {
    },

    /* function applyAddFriend
        *   申请添加好友
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    applyAddFriend: function applyAddFriend(options, cbOk, cbErr) {
    },

    /* function getPendency
        *   拉取好友申请
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getPendency: function getPendency(options, cbOk, cbErr) {
    },

    /* function deletePendency
        *   删除好友申请
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    deletePendency: function deletePendency(options, cbOk, cbErr) {
    },

    /* function responseFriend
        *   响应好友申请
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    responseFriend: function responseFriend(options, cbOk, cbErr) {
    },

    /* function getAllFriend
        *   拉取我的好友
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getAllFriend: function getAllFriend(options, cbOk, cbErr) {
    },

    /* function deleteFriend
        *   删除好友
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    deleteFriend: function deleteFriend(options, cbOk, cbErr) {
    },

    /* function addBlackList
        *   增加黑名单
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    addBlackList: function addBlackList(options, cbOk, cbErr) {
    },

    /* function getBlackList
        *   删除黑名单
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getBlackList: function getBlackList(options, cbOk, cbErr) {
    },

    /* function deleteBlackList
        *   我的黑名单
        * params:
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    deleteBlackList: function deleteBlackList(options, cbOk, cbErr) {
    },

    /* function uploadPic
        *   上传图片
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    uploadPic: function uploadPic(options, cbOk, cbErr) {
    },

    /* function createGroup
        *   创建群
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    createGroup: function createGroup(options, cbOk, cbErr) {
    },

    /* function applyJoinGroup
        *   申请加群
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    applyJoinGroup: function applyJoinGroup(options, cbOk, cbErr) {
    },

    /* function handleApplyJoinGroup
        *   处理申请加群(同意或拒绝)
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    handleApplyJoinGroup: function handleApplyJoinGroup(options, cbOk, cbErr) {
    },

    /* function deleteApplyJoinGroupPendency
        *   删除加群申请
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    deleteApplyJoinGroupPendency: function deleteApplyJoinGroupPendency(options, cbOk, cbErr) {
    },


    /* function quitGroup
        *  主动退群
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    quitGroup: function quitGroup(options, cbOk, cbErr) {
    },

    /* function getGroupPublicInfo
        *   读取群公开资料-高级接口
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getGroupPublicInfo: function getGroupPublicInfo(options, cbOk, cbErr) {
    },

    /* function getGroupInfo
        *   读取群详细资料-高级接口
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getGroupInfo: function getGroupInfo(options, cbOk, cbErr) {
    },

    /* function modifyGroupBaseInfo
        *   修改群基本资料
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    modifyGroupBaseInfo: function modifyGroupBaseInfo(options, cbOk, cbErr) {
    },

    /* function destroyGroup
        *  解散群
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    destroyGroup: function destroyGroup(options, cbOk, cbErr) {
    },

    /* function getJoinedGroupListHigh
        *   获取我的群组-高级接口
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getJoinedGroupListHigh: function getJoinedGroupListHigh(options, cbOk, cbErr) {
    },

    /* function getGroupMemberInfo
        *   获取群组成员列表
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getGroupMemberInfo: function getGroupMemberInfo(options, cbOk, cbErr) {
    },

    /* function addGroupMember
        *   邀请好友加群
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    addGroupMember: function addGroupMember(options, cbOk, cbErr) {
    },

    /* function modifyGroupMember
        *   修改群成员资料（角色或者群消息提类型示）
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    modifyGroupMember: function modifyGroupMember(options, cbOk, cbErr) {
    },

    /* function forbidSendMsg
        *   设置群成员禁言时间
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    forbidSendMsg: function forbidSendMsg(options, cbOk, cbErr) {
    },

    /* function deleteGroupMember
        *   删除群成员
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    deleteGroupMember: function deleteGroupMember(options, cbOk, cbErr) {
    },

    /* function getPendencyGroup
        *   获取群组未决列表
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getPendencyGroup: function getPendencyGroup(options, cbOk, cbErr) {
    },

    /* function getPendencyReport
        *   好友未决已读上报
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getPendencyReport: function getPendencyReport(options, cbOk, cbErr) {
    },

    /* function getPendencyGroupRead
        *   群组未决已读上报
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    getPendencyGroupRead: function getPendencyGroupRead(options, cbOk, cbErr) {
    },

    /* function sendCustomGroupNotify
        *   发送自定义群通知
        * params:
        *   options    - 请求参数，详见api文档
        *   cbOk   - function()类型, 成功时回调函数
        *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
        * return:
        *   (无)
        */
    sendCustomGroupNotify: function sendCustomGroupNotify(options, cbOk, cbErr) {
    },

    /* class webim.Msg
        *   一条消息的描述类, 消息发送、接收的API中都会涉及此类型的对象
        * properties:
        *   sess   - Session object-ref, 消息所属的会话(e.g:我与好友A的C2C会话，我与群组G的GROUP会话)
        *   isSend - Boolean, true表示是我发出消息, false表示是发给我的消息)
        *   seq    - Integer, 消息序列号, 用于判断消息是否同一条
        *   random - Integer, 消息随机数,用于判断消息是否同一条
        *   time   - Integer, 消息时间戳, 为unix timestamp
        *   fromAccount -String,  消息发送者帐号
        *   subType -Integer,  消息子类型，c2c消息时，0-表示普通消息；群消息时，0-普通消息，1-点赞消息，2-提示消息
        *   fromAccountNick -String,  消息发送者昵称
        *   elems  - Array of webim.Msg.Elem, 描述消息内容的元素列表
        * constructor:
        *   Msg(sess, isSend, seq,random time,fromAccount) - 构造函数, 参数定义同上面properties中定义
        * methods:
        *   addText(text)  - 向elems中添加一个TEXT元素
        *   addFace(face)  - 向elems中添加一个FACE元素
        *   toHtml()       - 转成可展示的html String
        *addFace
        * sub-class webim.Msg.Elem
        *   消息中一个组成元素的描述类, 一条消息的内容被抽象描述为N个元素的有序列表
        * properties:
        *   type   - 元素类型, 目前有TEXT(文本)、FACE(表情)、IMAGE(图片)等
        *   content- 元素内容体, 当TEXT时为String, 当PIC时为UrlString
        * constructor:
        *   Elem(type, content) - 构造函数, 参数定义同上面properties中定义
        *
        * sub-class webim.Msg.Elem.TextElem
        *   文本
        * properties:
        *   text  - String 内容
        * constructor:
        *   TextElem(text) - 构造函数, 参数定义同上面properties中定义
        *
        * sub-class webim.Msg.Elem.FaceElem
        *   表情
        * properties:
        *   index  - Integer 表情索引, 用户自定义
        *   data   - String 额外数据，用户自定义
        * constructor:
        *   FaceElem(index,data) - 构造函数, 参数定义同上面properties中定义
        *
        *
        */
    Msg: function Msg(sess, isSend, seq, random, time, fromAccount, subType, fromAccountNick) {/*Class constructor*/
    },

    /* singleton object MsgStore
        * webim.MsgStore是消息数据的Model对象(参考MVC概念), 它提供接口访问当前存储的会话和消息数据
        * 下面说明下会话数据类型: Session
        *
        * class Session
        *   一个Session对象描述一个会话，会话可简单理解为最近会话列表的一个条目，它由两个字段唯一标识:
        *     type - String, 会话类型(如"C2C", "GROUP", ...)
        *     id   - String, 会话ID(如C2C类型中为对方帐号,"C2C"时为好友ID,"GROUP"时为群ID)
        * properties:
        *   (Session对象未对外暴露任何属性字段, 所有访问通过下面的getter方法进行)
        * methods:
        *   type()     - String, 返回会话类型,"C2C"表示与好友私聊，"GROUP"表示群聊
        *   id()       - String, 返回会话ID
        *   name()     - String, 返回会话标题(如C2C类型中为对方的昵称,暂不支持)
        *   icon()     - String, 返回会话图标(对C2C类型中为对方的头像URL，暂不支持)
        *   unread()           - Integer, 返回会话未读条数
        *   time()     - Integer, 返回会话最后活跃时间, 为unix timestamp
        *   curMaxMsgSeq() - Integer, 返回会话最大消息序列号
        *   msgCount() - Integer, 返回会话中所有消息条数
        *   msg(index) - webim.Msg, 返回会话中第index条消息
        */
    MsgStore: {
      /* function sessMap
                 *   获取所有会话
                 * return:
                 *   所有会话对象
                 */
      sessMap: function sessMap() {
        return {/*Object*/};
      },
      /* function sessCount
          *   获取当前会话的个数
          * return:
          *   Integer, 会话个数
          */
      sessCount: function sessCount() {
        return 0;
      },

      /* function sessByTypeId
          *   根据会话类型和会话ID取得相应会话
          * params:
          *   type   - String, 会话类型(如"C2C", "GROUP", ...)
          *   id     - String, 会话ID(如对方ID)
          * return:
          *   Session, 会话对象(说明见上面)
          */
      sessByTypeId: function sessByTypeId(type, id) {
        return {/*Session Object*/};
      },
      /* function delSessByTypeId
          *   根据会话类型和会话ID删除相应会话
          * params:
          *   type   - String, 会话类型(如"C2C", "GROUP", ...)
          *   id     - String, 会话ID(如对方ID)
          * return:
          *   Boolean, 布尔类型
          */
      delSessByTypeId: function delSessByTypeId(type, id) {
        return true;
      },

      /* function resetCookieAndSyncFlag
          *   重置上一次读取新c2c消息Cookie和是否继续拉取标记
          * return:
          *
          */
      resetCookieAndSyncFlag: function resetCookieAndSyncFlag() {
      },

      downloadMap: {} } };




  /* webim API implementation
                            */
  (function (webim) {
    //sdk版本
    var SDK = {
      'VERSION': '1.7.0', //sdk版本号
      'APPID': '537048168', //web im sdk 版本 APPID
      'PLAATFORM': "10" //发送请求时判断其是来自web端的请求
    };

    //是否启用正式环境，默认启用
    var isAccessFormaEnvironment = true;
    // var isAccessFormaEnvironment = false;

    //后台接口主机
    var SRV_HOST = {
      'FORMAL': {
        'COMMON': 'https://webim.tim.qq.com',
        'PIC': 'https://pic.tim.qq.com' },

      'TEST': {
        'COMMON': 'https://test.tim.qq.com',
        'PIC': 'https://pic.tim.qq.com' } };



    //浏览器版本信息
    var BROWSER_INFO = {};
    //是否为ie9（含）以下
    var lowerBR = false;

    //服务名称
    var SRV_NAME = {
      'OPEN_IM': 'openim', //私聊（拉取未读c2c消息，长轮询，c2c消息已读上报等）服务名
      'GROUP': 'group_open_http_svc', //群组管理（拉取群消息，创建群，群成员管理，群消息已读上报等）服务名
      'FRIEND': 'sns', //关系链管理（好友管理，黑名单管理等）服务名
      'PROFILE': 'profile', //资料管理（查询，设置个人资料等）服务名
      'RECENT_CONTACT': 'recentcontact', //最近联系人服务名
      'PIC': 'openpic', //图片（或文件）服务名
      'BIG_GROUP': 'group_open_http_noauth_svc', //直播大群 群组管理（申请加大群）服务名
      'BIG_GROUP_LONG_POLLING': 'group_open_long_polling_http_noauth_svc', //直播大群 长轮询（拉取消息等）服务名
      'IM_OPEN_STAT': 'imopenstat', //质量上报，统计接口错误率
      'DEL_CHAT': 'recentcontact' //删除会话
    };

    //不同服务对应的版本号
    var SRV_NAME_VER = _defineProperty({
      'openim': 'v4',
      'group_open_http_svc': 'v4',
      'sns': 'v4',
      'profile': 'v4',
      'recentcontact': 'v4',
      'openpic': 'v4',
      'group_open_http_noauth_svc': 'v1',
      'group_open_long_polling_http_noauth_svc': 'v1',
      'imopenstat': 'v4' }, "recentcontact",
    'v4');


    //不同的命令名对应的上报类型ID，用于接口质量上报
    var CMD_EVENT_ID_MAP = {
      'login': 1, //登录
      'pic_up': 3, //上传图片
      'apply_join_group': 9, //申请加入群组
      'create_group': 10, //创建群组
      'longpolling': 18, //普通长轮询
      'send_group_msg': 19, //群聊
      'sendmsg': 20 //私聊
    };

    //聊天类型
    var SESSION_TYPE = {
      'C2C': 'C2C', //私聊
      'GROUP': 'GROUP' //群聊
    };

    //最近联系人类型
    var RECENT_CONTACT_TYPE = {
      'C2C': 1, //好友
      'GROUP': 2 //群
    };

    //消息最大长度（字节）
    var MSG_MAX_LENGTH = {
      'C2C': 12000, //私聊消息
      'GROUP': 8898 //群聊
    };

    //后台接口返回类型
    var ACTION_STATUS = {
      'OK': 'OK', //成功
      'FAIL': 'FAIL' //失败
    };

    var ERROR_CODE_CUSTOM = 99999; //自定义后台接口返回错误码

    //消息元素类型
    var MSG_ELEMENT_TYPE = {
      'TEXT': 'TIMTextElem', //文本
      'FACE': 'TIMFaceElem', //表情
      'IMAGE': 'TIMImageElem', //图片
      'CUSTOM': 'TIMCustomElem', //自定义
      'SOUND': 'TIMSoundElem', //语音,只支持显示
      'FILE': 'TIMFileElem', //文件,只支持显示
      'LOCATION': 'TIMLocationElem', //地理位置
      'GROUP_TIP': 'TIMGroupTipElem' //群提示消息,只支持显示
    };

    //图片类型
    var IMAGE_TYPE = {
      'ORIGIN': 1, //原图
      'LARGE': 2, //缩略大图
      'SMALL': 3 //缩略小图
    };

    //图片格式
    var IMAGE_FORMAT = {
      JPG: 0x1,
      JPEG: 0x1,
      GIF: 0x2,
      PNG: 0x3,
      BMP: 0x4,
      UNKNOWN: 0xff };



    //上传资源包类型
    var UPLOAD_RES_PKG_FLAG = {
      'RAW_DATA': 0, //原始数据
      'BASE64_DATA': 1 //base64编码数据
    };

    //下载文件配置
    var DOWNLOAD_FILE = {
      'BUSSINESS_ID': '10001', //下载文件业务ID
      'AUTH_KEY': '617574686b6579', //下载文件authkey
      'SERVER_IP': '182.140.186.147' //下载文件服务器IP
    };

    //下载文件类型
    var DOWNLOAD_FILE_TYPE = {
      "SOUND": 2106, //语音
      "FILE": 2107 //普通文件
    };

    //上传资源类型
    var UPLOAD_RES_TYPE = {
      "IMAGE": 1, //图片
      "FILE": 2, //文件
      "SHORT_VIDEO": 3, //短视频
      "SOUND": 4 //语音，PTT
    };

    //版本号，用于上传图片或文件接口
    var VERSION_INFO = {
      'APP_VERSION': '2.1', //应用版本号
      'SERVER_VERSION': 1 //服务端版本号
    };

    //长轮询消息类型
    var LONG_POLLINNG_EVENT_TYPE = {
      "C2C": 1 //新的c2c消息通知
      ,
      "GROUP_COMMON": 3 //新的群普通消息
      ,
      "GROUP_TIP": 4 //新的群提示消息
      ,
      "GROUP_SYSTEM": 5 //新的群系统消息
      ,
      "GROUP_TIP2": 6 //新的群提示消息2
      ,
      "FRIEND_NOTICE": 7 //好友系统通知
      ,
      "PROFILE_NOTICE": 8 //资料系统通知
      ,
      "C2C_COMMON": 9 //新的C2C消息
      ,
      "C2C_EVENT": 10 };


    //c2c消息子类型
    var C2C_MSG_SUB_TYPE = {
      "COMMON": 0 //普通消息
    };
    //c2c消息子类型
    var C2C_EVENT_SUB_TYPE = {
      "READED": 92, //已读消息同步
      "KICKEDOUT": 96 };


    //群消息子类型
    var GROUP_MSG_SUB_TYPE = {
      "COMMON": 0, //普通消息
      "LOVEMSG": 1, //点赞消息
      "TIP": 2, //提示消息
      "REDPACKET": 3 //红包消息
    };

    //群消息优先级类型
    var GROUP_MSG_PRIORITY_TYPE = {
      "REDPACKET": 1, //红包消息
      "COMMON": 2, //普通消息
      "LOVEMSG": 3 //点赞消息
    };

    //群提示消息类型
    var GROUP_TIP_TYPE = {
      "JOIN": 1, //加入群组
      "QUIT": 2, //退出群组
      "KICK": 3, //被踢出群组
      "SET_ADMIN": 4, //被设置为管理员
      "CANCEL_ADMIN": 5, //被取消管理员
      "MODIFY_GROUP_INFO": 6, //修改群资料
      "MODIFY_MEMBER_INFO": 7 //修改群成员信息
    };

    //群提示消息-群资料变更类型
    var GROUP_TIP_MODIFY_GROUP_INFO_TYPE = {
      "FACE_URL": 1, //修改群头像URL
      "NAME": 2, //修改群名称
      "OWNER": 3, //修改群主
      "NOTIFICATION": 4, //修改群公告
      "INTRODUCTION": 5 //修改群简介
    };

    //群系统消息类型
    var GROUP_SYSTEM_TYPE = {
      "JOIN_GROUP_REQUEST": 1, //申请加群请求（只有管理员会收到）
      "JOIN_GROUP_ACCEPT": 2, //申请加群被同意（只有申请人能够收到）
      "JOIN_GROUP_REFUSE": 3, //申请加群被拒绝（只有申请人能够收到）
      "KICK": 4, //被管理员踢出群(只有被踢者接收到)
      "DESTORY": 5, //群被解散(全员接收)
      "CREATE": 6, //创建群(创建者接收, 不展示)
      "INVITED_JOIN_GROUP_REQUEST": 7, //邀请加群(被邀请者接收)
      "QUIT": 8, //主动退群(主动退出者接收, 不展示)
      "SET_ADMIN": 9, //设置管理员(被设置者接收)
      "CANCEL_ADMIN": 10, //取消管理员(被取消者接收)
      "REVOKE": 11, //群已被回收(全员接收, 不展示)
      "READED": 15, //群消息已读同步
      "CUSTOM": 255, //用户自定义通知(默认全员接收)
      "INVITED_JOIN_GROUP_REQUEST_AGREE": 12 //邀请加群(被邀请者需同意)
    };

    //好友系统通知子类型
    var FRIEND_NOTICE_TYPE = {
      "FRIEND_ADD": 1, //好友表增加
      "FRIEND_DELETE": 2, //好友表删除
      "PENDENCY_ADD": 3, //未决增加
      "PENDENCY_DELETE": 4, //未决删除
      "BLACK_LIST_ADD": 5, //黑名单增加
      "BLACK_LIST_DELETE": 6, //黑名单删除
      "PENDENCY_REPORT": 7, //未决已读上报
      "FRIEND_UPDATE": 8 //好友数据更新
    };

    //资料系统通知子类型
    var PROFILE_NOTICE_TYPE = {
      "PROFILE_MODIFY": 1 //资料修改
    };

    //腾讯登录服务错误码（用于托管模式）
    var TLS_ERROR_CODE = {
      'OK': 0, //成功
      'SIGNATURE_EXPIRATION': 11 //用户身份凭证过期
    };

    //长轮询连接状态
    var CONNECTION_STATUS = {
      'INIT': -1, //初始化
      'ON': 0, //连接正常
      'RECONNECT': 1, //连接恢复正常
      'OFF': 9999 //连接已断开,可能是用户网络问题，或者长轮询接口报错引起的
    };

    var UPLOAD_PIC_BUSSINESS_TYPE = { //图片业务类型
      'GROUP_MSG': 1, //私聊图片
      'C2C_MSG': 2, //群聊图片
      'USER_HEAD': 3, //用户头像
      'GROUP_HEAD': 4 //群头像
    };

    var FRIEND_WRITE_MSG_ACTION = { //好友输入消息状态
      'ING': 14, //正在输入
      'STOP': 15 //停止输入
    };

    //ajax默认超时时间，单位：毫秒
    var ajaxDefaultTimeOut = 15000;

    //大群长轮询接口返回正常时，延时一定时间再发起下一次请求
    var OK_DELAY_TIME = 1000;

    //大群长轮询接口发生错误时，延时一定时间再发起下一次请求
    var ERROR_DELAY_TIME = 5000;

    //群提示消息最多显示人数
    var GROUP_TIP_MAX_USER_COUNT = 10;

    //长轮询连接状态
    var curLongPollingStatus = CONNECTION_STATUS.INIT;

    //当长轮询连接断开后，是否已经回调过
    var longPollingOffCallbackFlag = false;

    //当前长轮询返回错误次数
    var curLongPollingRetErrorCount = 0;

    //长轮询默认超时时间，单位：毫秒
    var longPollingDefaultTimeOut = 60000;

    //长轮询返回错误次数达到一定值后，发起新的长轮询请求间隔时间，单位：毫秒
    var longPollingIntervalTime = 5000;

    //没有新消息时，长轮询返回60008错误码是正常的
    var longPollingTimeOutErrorCode = 60008;

    //多实例登录被kick的错误码
    var longPollingKickedErrorCode = 91101;

    var LongPollingId = null;

    //当前大群长轮询返回错误次数
    var curBigGroupLongPollingRetErrorCount = 0;

    //最大允许长轮询返回错误次数
    var LONG_POLLING_MAX_RET_ERROR_COUNT = 10;

    //上传重试累计
    var Upload_Retry_Times = 0;
    //最大上传重试
    var Upload_Retry_Max_Times = 20;

    //ie7/8/9采用jsonp方法解决ajax跨域限制
    var jsonpRequestId = 0; //jsonp请求id
    //最新jsonp请求返回的json数据
    var jsonpLastRspData = null;
    //兼容ie7/8/9,jsonp回调函数
    var jsonpCallback = null;

    var uploadResultIframeId = 0; //用于上传图片的iframe id

    var ipList = []; //文件下载地址
    var authkey = null; //文件下载票据
    var expireTime = null; //文件下载票据超时时间

    //错误码
    var ERROR = {};
    //当前登录用户
    var ctx = {
      sdkAppID: null,
      appIDAt3rd: null,
      accountType: null,
      identifier: null,
      tinyid: null,
      identifierNick: null,
      userSig: null,
      a2: null,
      contentType: 'json',
      apn: 1 };

    var opt = {};
    var xmlHttpObjSeq = 0; //ajax请求id
    var xmlHttpObjMap = {}; //发起的ajax请求
    var curSeq = 0; //消息seq
    var tempC2CMsgList = []; //新c2c消息临时缓存
    var tempC2CHistoryMsgList = []; //漫游c2c消息临时缓存

    var maxApiReportItemCount = 20; //一次最多上报条数
    var apiReportItems = []; //暂存api接口质量上报数据

    var Resources = {
      downloadMap: {} };


    //表情标识字符和索引映射关系对象，用户可以自定义
    var emotionDataIndexs = {
      "[惊讶]": 0,
      "[撇嘴]": 1,
      "[色]": 2,
      "[发呆]": 3,
      "[得意]": 4,
      "[流泪]": 5,
      "[害羞]": 6,
      "[闭嘴]": 7,
      "[睡]": 8,
      "[大哭]": 9,
      "[尴尬]": 10,
      "[发怒]": 11,
      "[调皮]": 12,
      "[龇牙]": 13,
      "[微笑]": 14,
      "[难过]": 15,
      "[酷]": 16,
      "[冷汗]": 17,
      "[抓狂]": 18,
      "[吐]": 19,
      "[偷笑]": 20,
      "[可爱]": 21,
      "[白眼]": 22,
      "[傲慢]": 23,
      "[饿]": 24,
      "[困]": 25,
      "[惊恐]": 26,
      "[流汗]": 27,
      "[憨笑]": 28,
      "[大兵]": 29,
      "[奋斗]": 30,
      "[咒骂]": 31,
      "[疑问]": 32,
      "[嘘]": 33,
      "[晕]": 34 };


    //表情对象，用户可以自定义
    var emotions = {};
    //工具类
    var tool = new function () {

      //格式化时间戳
      //format格式如下：
      //yyyy-MM-dd hh:mm:ss 年月日时分秒(默认格式)
      //yyyy-MM-dd 年月日
      //hh:mm:ss 时分秒
      this.formatTimeStamp = function (timestamp, format) {
        if (!timestamp) {
          return 0;
        }
        var formatTime;
        format = format || 'yyyy-MM-dd hh:mm:ss';
        var date = new Date(timestamp * 1000);
        var o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds() //秒
        };
        if (/(y+)/.test(format)) {
          formatTime = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        } else {
          formatTime = format;
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(formatTime))
          formatTime = formatTime.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
        return formatTime;
      };

      //根据群类型英文名转换成中文名
      this.groupTypeEn2Ch = function (type_en) {
        var type_ch = null;
        switch (type_en) {
          case 'Public':
            type_ch = '公开群';
            break;
          case 'ChatRoom':
            type_ch = '聊天室';
            break;
          case 'Private':
            type_ch = '私有群'; //即讨论组
            break;
          case 'AVChatRoom':
            type_ch = '直播聊天室';
            break;
          default:
            type_ch = type_en;
            break;}

        return type_ch;
      };
      //根据群类型中文名转换成英文名
      this.groupTypeCh2En = function (type_ch) {
        var type_en = null;
        switch (type_ch) {
          case '公开群':
            type_en = 'Public';
            break;
          case '聊天室':
            type_en = 'ChatRoom';
            break;
          case '私有群': //即讨论组
            type_en = 'Private';
            break;
          case '直播聊天室':
            type_en = 'AVChatRoom';
            break;
          default:
            type_en = type_ch;
            break;}

        return type_en;
      };
      //根据群身份英文名转换成群身份中文名
      this.groupRoleEn2Ch = function (role_en) {
        var role_ch = null;
        switch (role_en) {
          case 'Member':
            role_ch = '成员';
            break;
          case 'Admin':
            role_ch = '管理员';
            break;
          case 'Owner':
            role_ch = '群主';
            break;
          default:
            role_ch = role_en;
            break;}

        return role_ch;
      };
      //根据群身份中文名转换成群身份英文名
      this.groupRoleCh2En = function (role_ch) {
        var role_en = null;
        switch (role_ch) {
          case '成员':
            role_en = 'Member';
            break;
          case '管理员':
            role_en = 'Admin';
            break;
          case '群主':
            role_en = 'Owner';
            break;
          default:
            role_en = role_ch;
            break;}

        return role_en;
      };
      //根据群消息提示类型英文转换中文
      this.groupMsgFlagEn2Ch = function (msg_flag_en) {
        var msg_flag_ch = null;
        switch (msg_flag_en) {
          case 'AcceptAndNotify':
            msg_flag_ch = '接收并提示';
            break;
          case 'AcceptNotNotify':
            msg_flag_ch = '接收不提示';
            break;
          case 'Discard':
            msg_flag_ch = '屏蔽';
            break;
          default:
            msg_flag_ch = msg_flag_en;
            break;}

        return msg_flag_ch;
      };
      //根据群消息提示类型中文名转换英文名
      this.groupMsgFlagCh2En = function (msg_flag_ch) {
        var msg_flag_en = null;
        switch (msg_flag_ch) {
          case '接收并提示':
            msg_flag_en = 'AcceptAndNotify';
            break;
          case '接收不提示':
            msg_flag_en = 'AcceptNotNotify';
            break;
          case '屏蔽':
            msg_flag_en = 'Discard';
            break;
          default:
            msg_flag_en = msg_flag_ch;
            break;}

        return msg_flag_en;
      };
      //将空格和换行符转换成HTML标签
      this.formatText2Html = function (text) {
        var html = text;
        if (html) {
          html = this.xssFilter(html); //用户昵称或群名称等字段会出现脚本字符串
          html = html.replace(/ /g, "&nbsp;");
          html = html.replace(/\n/g, "<br/>");
        }
        return html;
      };
      //将HTML标签转换成空格和换行符
      this.formatHtml2Text = function (html) {
        var text = html;
        if (text) {
          text = text.replace(/&nbsp;/g, " ");
          text = text.replace(/<br\/>/g, "\n");
        }
        return text;
      };
      //获取字符串(UTF-8编码)所占字节数
      //参考：http://zh.wikipedia.org/zh-cn/UTF-8
      this.getStrBytes = function (str) {
        if (str == null || str === undefined) return 0;
        if (typeof str != "string") {
          return 0;
        }
        var total = 0,
        charCode,i,len;
        for (i = 0, len = str.length; i < len; i++) {
          charCode = str.charCodeAt(i);
          if (charCode <= 0x007f) {
            total += 1; //字符代码在000000 – 00007F之间的，用一个字节编码
          } else if (charCode <= 0x07ff) {
            total += 2; //000080 – 0007FF之间的字符用两个字节
          } else if (charCode <= 0xffff) {
            total += 3; //000800 – 00D7FF 和 00E000 – 00FFFF之间的用三个字节，注: Unicode在范围 D800-DFFF 中不存在任何字符
          } else {
            total += 4; //010000 – 10FFFF之间的用4个字节
          }
        }
        return total;
      };


      //防止XSS攻击
      this.xssFilter = function (val) {
        val = val.toString();
        val = val.replace(/[<]/g, "&lt;");
        val = val.replace(/[>]/g, "&gt;");
        val = val.replace(/"/g, "&quot;");
        //val = val.replace(/'/g, "&#039;");
        return val;
      };

      //去掉头尾空白符
      this.trimStr = function (str) {
        if (!str) return '';
        str = str.toString();
        return str.replace(/(^\s*)|(\s*$)/g, "");
      };
      //判断是否为8位整数
      this.validNumber = function (str) {
        str = str.toString();
        return str.match(/(^\d{1,8}$)/g);
      };
      this.getReturnError = function (errorInfo, errorCode) {
        if (!errorCode) {
          errorCode = -100;
        }
        var error = {
          'ActionStatus': ACTION_STATUS.FAIL,
          'ErrorCode': errorCode,
          'ErrorInfo': errorInfo + "[" + errorCode + "]" };

        return error;
      };
      //设置cookie
      //name 名字
      //value 值
      //expires 有效期(单位：秒)
      //path
      //domain 作用域
      this.setCookie = function (name, value, expires, path, domain) {
        var exp = new Date();
        exp.setTime(exp.getTime() + expires * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
      };
      //获取cookie
      this.getCookie = function (name) {
        var result = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (result != null) {
          return unescape(result[2]);
        }
        return null;
      };
      //删除cookie
      this.delCookie = function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var value = this.getCookie(name);
        if (value != null)
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
      };
      //根据名字获取url参数值
      this.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      };

    }();

    //日志对象
    var log = new function () {

      var on = true;

      this.setOn = function (onFlag) {
        on = onFlag;
      };

      this.getOn = function () {
        return on;
      };

      this.error = function (logStr) {
        try {
          on && console.error(logStr, " at static\\js\\webim.js:1295");
        } catch (e) {
        }
      };
      this.warn = function (logStr) {
        try {
          on && console.warn(logStr, " at static\\js\\webim.js:1301");
        } catch (e) {
        }
      };
      this.info = function (logStr) {
        try {
          on && console.info(logStr, " at static\\js\\webim.js:1307");
        } catch (e) {
        }
      };
      this.debug = function (logStr) {
        try {
          on && console.log(logStr, " at static\\js\\webim.js:1313");
        } catch (e) {
        }
      };
    }();
    //获取unix时间戳
    var unixtime = function unixtime(d) {
      if (!d) d = new Date();
      return Math.round(d.getTime() / 1000);
    };
    //时间戳转日期
    var fromunixtime = function fromunixtime(t) {
      return new Date(t * 1000);
    };
    //获取下一个消息序号
    var nextSeq = function nextSeq() {
      if (curSeq) {
        curSeq = curSeq + 1;
      } else {
        curSeq = Math.round(Math.random() * 10000000);
      }
      return curSeq;
    };
    //产生随机数
    var createRandom = function createRandom() {
      return Math.round(Math.random() * 4294967296);
    };

    //获取ajax请求对象
    var getXmlHttp = function getXmlHttp() {
      var xmlhttp = null;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        try {
          xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e) {
            return null;
          }
        }
      }
      return xmlhttp;
    };
    //发起ajax请求
    //发起ajax请求
    var ajaxRequest = function ajaxRequest(meth, url, req, timeout, isLongPolling, cbOk, cbErr) {

      var xmlHttpObj = getXmlHttp();

      var error, errInfo;
      if (!xmlHttpObj) {
        errInfo = "创建请求失败";
        var error = tool.getReturnError(errInfo, -1);
        log.error(errInfo);
        if (cbErr) cbErr(error);
        return;
      }
      //保存ajax请求对象
      xmlHttpObjSeq++;
      xmlHttpObjMap[xmlHttpObjSeq] = xmlHttpObj;

      xmlHttpObj.open(meth, url, true);
      xmlHttpObj.onreadystatechange = function () {
        if (xmlHttpObj.readyState == 4) {
          xmlHttpObjMap[xmlHttpObjSeq] = null; //清空
          if (xmlHttpObj.status == 200) {
            if (cbOk) cbOk(xmlHttpObj.responseText);
            xmlHttpObj = null;
            curLongPollingRetErrorCount = curBigGroupLongPollingRetErrorCount = 0;
          } else {
            xmlHttpObj = null;
            //避免刷新的时候，由于abord ajax引起的错误回调
            setTimeout(function () {
              var errInfo = "请求服务器失败,请检查你的网络是否正常";
              var error = tool.getReturnError(errInfo, -2);
              //if (!isLongPolling && cbErr) cbErr(error);
              if (cbErr) cbErr(error);
            }, 16);
          }
        }
      };
      xmlHttpObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      //设置超时时间
      if (!timeout) {
        timeout = ajaxDefaultTimeOut; //设置ajax默认超时时间
      }
      if (timeout) {
        xmlHttpObj.timeout = timeout;
        xmlHttpObj.ontimeout = function (event) {
          xmlHttpObj = null;
          //var errInfo = "请求服务器超时";
          //var error = tool.getReturnError(errInfo, -3);
          //if (cbErr) cbErr(error);
        };
      }
      //
      xmlHttpObj.send(req);
    };
    //发起ajax请求（json格式数据）
    var ajaxRequestJson = function ajaxRequestJson(meth, url, req, timeout, isLongPolling, cbOk, cbErr) {
      ajaxRequest(meth, url, JSON.stringify(req), timeout, isLongPolling, function (resp) {
        var json = null;
        //if (resp) eval('json=('+resp+');');//将返回的json字符串转换成json对象
        //if (resp) json=eval('('+resp+')');//将返回的json字符串转换成json对象
        if (resp) json = resp; //将返回的json字符串转换成json对象
        if (cbOk) cbOk(json);
      }, cbErr);
    };
    //判断用户是否已登录
    var isLogin = function isLogin() {
      return ctx.sdkAppID && ctx.identifier;
    };
    //检查是否登录
    var checkLogin = function checkLogin(cbErr, isNeedCallBack) {
      if (!isLogin()) {
        if (isNeedCallBack) {
          var errInfo = "请登录";
          var error = tool.getReturnError(errInfo, -4);

          if (cbErr) cbErr(error);
        }
        return false;
      }
      return true;
    };

    //检查是否访问正式环境
    var isAccessFormalEnv = function isAccessFormalEnv() {
      return isAccessFormaEnvironment;
    };

    //根据不同的服务名和命令，获取对应的接口地址
    var getApiUrl = function getApiUrl(srvName, cmd, cbOk, cbErr) {
      var srvHost = SRV_HOST;
      if (isAccessFormalEnv()) {
        srvHost = SRV_HOST.FORMAL.COMMON;
      } else {
        srvHost = SRV_HOST.TEST.COMMON;
      }

      //if (srvName == SRV_NAME.RECENT_CONTACT) {
      //    srvHost = SRV_HOST.TEST.COMMON;
      //}

      if (srvName == SRV_NAME.PIC) {
        if (isAccessFormalEnv()) {
          srvHost = SRV_HOST.FORMAL.PIC;
        } else {
          srvHost = SRV_HOST.TEST.PIC;
        }
      }

      var url = srvHost + '/' + SRV_NAME_VER[srvName] + '/' + srvName + '/' + cmd + '?websdkappid=' + SDK.APPID + "&v=" + SDK.VERSION;

      if (isLogin()) {
        if (cmd == 'login') {
          url += '&identifier=' + encodeURIComponent(ctx.identifier) + '&usersig=' + ctx.userSig;
        } else {
          if (ctx.tinyid && ctx.a2) {
            url += '&tinyid=' + ctx.tinyid + '&a2=' + ctx.a2;
          } else {
            if (cbErr) {
              log.error("tinyid或a2为空[" + srvName + "][" + cmd + "]");
              cbErr(tool.getReturnError("tinyid或a2为空[" + srvName + "][" + cmd + "]", -5));
              return false;
            }
          }
        }
        url += '&contenttype=' + ctx.contentType;
      }
      url += '&sdkappid=' + ctx.sdkAppID + '&accounttype=' + ctx.accountType + '&apn=' + ctx.apn + '&reqtime=' + unixtime();
      return url;
    };

    //获取语音下载url
    var getSoundDownUrl = function getSoundDownUrl(uuid, senderId) {
      var soundUrl = null;
      if (authkey && ipList[0]) {
        soundUrl = "http://" + ipList[0] + "/asn.com/stddownload_common_file?authkey=" + authkey + "&bid=" + DOWNLOAD_FILE.BUSSINESS_ID + "&subbid=" + ctx.sdkAppID + "&fileid=" + uuid + "&filetype=" + DOWNLOAD_FILE_TYPE.SOUND + "&openid=" + senderId + "&ver=0";
      } else {
        log.error("拼接语音下载url不报错：ip或者authkey为空");
      }
      return soundUrl;
    };

    //获取文件下载地址
    var getFileDownUrl = function getFileDownUrl(uuid, senderId, fileName) {
      var fileUrl = null;
      if (authkey && ipList[0]) {
        fileUrl = "http://" + ipList[0] + "/asn.com/stddownload_common_file?authkey=" + authkey + "&bid=" + DOWNLOAD_FILE.BUSSINESS_ID + "&subbid=" + ctx.sdkAppID + "&fileid=" + uuid + "&filetype=" + DOWNLOAD_FILE_TYPE.FILE + "&openid=" + senderId + "&ver=0&filename=" + encodeURIComponent(fileName);
      } else {
        log.error("拼接文件下载url不报错：ip或者authkey为空");
      }
      Resources.downloadMap["uuid_" + uuid] = fileUrl;
      return fileUrl;
    };

    //获取文件下载地址
    var getFileDownUrlV2 = function getFileDownUrlV2(uuid, senderId, fileName, downFlag, receiverId, busiId, type) {
      var options = {
        "From_Account": senderId, //"identifer_0",       // 类型: String, 发送者tinyid
        "To_Account": receiverId, //"identifer_1",         // 类型: String, 接收者tinyid
        "os_platform": 10, // 类型: Number, 终端的类型 1(android) 2(ios) 3(windows) 10(others...)
        "Timestamp": unixtime().toString(), // 类型: Number, 时间戳
        "Random": createRandom().toString(), // 类型: Number, 随机值
        "request_info": [// 类型: Array
        {
          "busi_id": busiId, // 类型: Number, 群(1) C2C(2) 其他请联系sdk开发者分配
          "download_flag": downFlag, // 类型: Number, 申请下载地址标识  0(申请架平下载地址)  1(申请COS平台下载地址)  2(不需要申请, 直接拿url下载(这里应该不会为2))
          "type": type, // 类型: Number, 0(短视频缩略图), 1(文件), 2(短视频), 3(ptt), 其他待分配
          "uuid": uuid, // 类型: Number, 唯一标识一个文件的uuid
          "version": VERSION_INFO.SERVER_VERSION, // 类型: Number, 架平server版本
          "auth_key": authkey, // 类型: String, 认证签名
          "ip": ipList[0] // 类型: Number, 架平IP
        }] };


      //获取下载地址
      proto_applyDownload(options, function (resp) {
        if (resp.error_code == 0 && resp.response_info) {
          Resources.downloadMap["uuid_" + options.uuid] = resp.response_info.url;
        }
        if (onAppliedDownloadUrl) {
          onAppliedDownloadUrl({
            uuid: options.uuid,
            url: resp.response_info.url,
            maps: Resources.downloadMap });

        }
      }, function (resp) {
        log.error("获取下载地址失败", options.uuid);
      });
    };


    //重置ajax请求
    var clearXmlHttpObjMap = function clearXmlHttpObjMap() {
      //遍历xmlHttpObjMap{}
      for (var seq in xmlHttpObjMap) {
        var xmlHttpObj = xmlHttpObjMap[seq];
        if (xmlHttpObj) {
          xmlHttpObj.abort(); //中断ajax请求(长轮询)
          xmlHttpObjMap[xmlHttpObjSeq] = null; //清空
        }
      }
      xmlHttpObjSeq = 0;
      xmlHttpObjMap = {};
    };

    //重置sdk全局变量
    var clearSdk = function clearSdk() {

      clearXmlHttpObjMap();

      //当前登录用户
      ctx = {
        sdkAppID: null,
        appIDAt3rd: null,
        accountType: null,
        identifier: null,
        identifierNick: null,
        userSig: null,
        contentType: 'json',
        apn: 1 };

      opt = {};

      curSeq = 0;

      //ie8,9采用jsonp方法解决ajax跨域限制
      jsonpRequestId = 0; //jsonp请求id
      //最新jsonp请求返回的json数据
      jsonpLastRspData = null;

      apiReportItems = [];

      MsgManager.clear();

      //重置longpollingId
      LongPollingId = null;
    };

    //登录
    var _login = function _login(loginInfo, listeners, options, cbOk, cbErr) {

      clearSdk();

      if (options) opt = options;
      if (opt.isAccessFormalEnv == false) {
        isAccessFormaEnvironment = opt.isAccessFormalEnv;
      }
      if (opt.isLogOn == false) {
        log.setOn(opt.isLogOn);
      }
      /*
        if(opt.emotions){
        emotions=opt.emotions;
        webim.Emotions= emotions;
        }
        if(opt.emotionDataIndexs){
        emotionDataIndexs=opt.emotionDataIndexs;
        webim.EmotionDataIndexs= emotionDataIndexs;
        }*/

      if (!loginInfo) {
        if (cbErr) {
          cbErr(tool.getReturnError("loginInfo is empty", -6));
          return;
        }
      }
      if (!loginInfo.sdkAppID) {
        if (cbErr) {
          cbErr(tool.getReturnError("loginInfo.sdkAppID is empty", -7));
          return;
        }
      }
      if (!loginInfo.accountType) {
        if (cbErr) {
          cbErr(tool.getReturnError("loginInfo.accountType is empty", -8));
          return;
        }
      }

      if (loginInfo.identifier) {
        ctx.identifier = loginInfo.identifier.toString();
      }
      if (loginInfo.identifier && !loginInfo.userSig) {
        if (cbErr) {
          cbErr(tool.getReturnError("loginInfo.userSig is empty", -9));
          return;
        }
      }
      if (loginInfo.userSig) {
        ctx.userSig = loginInfo.userSig.toString();
      }
      ctx.sdkAppID = loginInfo.sdkAppID;
      ctx.accountType = loginInfo.accountType;

      if (ctx.identifier && ctx.userSig) {//带登录态
        //登录
        proto_login(
        function (identifierNick, headurl) {
          MsgManager.init(
          listeners,
          function (mmInitResp) {
            if (cbOk) {
              mmInitResp.identifierNick = identifierNick;
              mmInitResp.headurl = headurl;
              cbOk(mmInitResp);
            }
          }, cbErr);

        },
        cbErr);

      } else {//不带登录态，进入直播场景sdk
        MsgManager.init(
        listeners,
        cbOk,
        cbErr);

      }
    };

    //初始化浏览器信息
    var initBrowserInfo = function initBrowserInfo() {
      //初始化浏览器类型
      BROWSER_INFO = "wechat";
    };

    //接口质量上报
    var reportApiQuality = function reportApiQuality(cmd, errorCode, errorInfo) {
      if (cmd == 'longpolling' && (errorCode == longPollingTimeOutErrorCode || errorCode == longPollingKickedErrorCode)) {//longpolling 返回60008错误可以视为正常,可以不上报
        return;
      }
      var eventId = CMD_EVENT_ID_MAP[cmd];
      if (eventId) {
        var reportTime = unixtime();
        var uniqKey = null;
        var msgCmdErrorCode = {
          'Code': errorCode,
          'ErrMsg': errorInfo };

        if (ctx.a2) {
          uniqKey = ctx.a2.substring(0, 10) + "_" + reportTime + "_" + createRandom();
        } else if (ctx.userSig) {
          uniqKey = ctx.userSig.substring(0, 10) + "_" + reportTime + "_" + createRandom();
        }

        if (uniqKey) {

          var rptEvtItem = {
            "UniqKey": uniqKey,
            "EventId": eventId,
            "ReportTime": reportTime,
            "MsgCmdErrorCode": msgCmdErrorCode };


          if (cmd == 'login') {
            var loginApiReportItems = [];
            loginApiReportItems.push(rptEvtItem);
            var loginReportOpt = {
              "EvtItems": loginApiReportItems,
              "MainVersion": SDK.VERSION,
              "Version": "0" };

            proto_reportApiQuality(loginReportOpt,
            function (resp) {
              loginApiReportItems = null; //
            },
            function (err) {
              loginApiReportItems = null; //
            });

          } else {
            apiReportItems.push(rptEvtItem);
            if (apiReportItems.length >= maxApiReportItemCount) {//累计一定条数再上报
              var reportOpt = {
                "EvtItems": apiReportItems,
                "MainVersion": SDK.VERSION,
                "Version": "0" };

              proto_reportApiQuality(reportOpt,
              function (resp) {
                apiReportItems = []; //清空
              },
              function (err) {
                apiReportItems = []; //清空
              });

            }
          }

        }
      }
    };

    // REST API calls
    //上线
    var proto_login = function proto_login(cbOk, cbErr) {
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "login", {
        "State": "Online" },

      function (loginResp) {
        if (loginResp.TinyId) {
          ctx.tinyid = loginResp.TinyId;
        } else {
          if (cbErr) {
            cbErr(tool.getReturnError("TinyId is empty", -10));
            return;
          }
        }
        if (loginResp.A2Key) {
          ctx.a2 = loginResp.A2Key;
        } else {
          if (cbErr) {
            cbErr(tool.getReturnError("A2Key is empty", -11));
            return;
          }
        }
        var tag_list = [
        "Tag_Profile_IM_Nick",
        "Tag_Profile_IM_Image"];

        var options = {
          'From_Account': ctx.identifier,
          'To_Account': [ctx.identifier],
          'LastStandardSequence': 0,
          'TagList': tag_list };

        proto_getProfilePortrait(
        options,
        function (resp) {
          var nick, gender, allowType;
          if (resp.UserProfileItem && resp.UserProfileItem.length > 0) {
            for (var i in resp.UserProfileItem) {
              for (var j in resp.UserProfileItem[i].ProfileItem) {
                switch (resp.UserProfileItem[i].ProfileItem[j].Tag) {
                  case 'Tag_Profile_IM_Nick':
                    var _nick = resp.UserProfileItem[i].ProfileItem[j].Value;
                    if (_nick) ctx.identifierNick = _nick;
                    break;
                  case 'Tag_Profile_IM_Image':
                    var image = resp.UserProfileItem[i].ProfileItem[j].Value;
                    if (image) ctx.headurl = image;
                    break;}

              }
            }
          }
          if (cbOk) cbOk(ctx.identifierNick, ctx.headurl); //回传当前用户昵称
        }, cbErr);
      }, cbErr);
    };
    //下线
    var proto_logout = function proto_logout(type, cbOk, cbErr) {
      if (!checkLogin(cbErr, false)) {//不带登录态
        clearSdk();
        if (cbOk) cbOk({
          'ActionStatus': ACTION_STATUS.OK,
          'ErrorCode': 0,
          'ErrorInfo': 'logout success' });

        return;
      }
      if (type == "all") {
        ConnManager.apiCall(SRV_NAME.OPEN_IM, "logout", {},
        function (resp) {
          clearSdk();
          if (cbOk) cbOk(resp);
        },
        cbErr);
      } else {
        ConnManager.apiCall(SRV_NAME.OPEN_IM, "longpollinglogout", {
          LongPollingId: LongPollingId },

        function (resp) {
          clearSdk();
          if (cbOk) cbOk(resp);
        },
        cbErr);
      }
    };
    //发送消息，包括私聊和群聊
    var proto_sendMsg = function proto_sendMsg(msg, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var msgInfo = null;

      switch (msg.sess.type()) {
        case SESSION_TYPE.C2C:
          msgInfo = {
            'From_Account': ctx.identifier,
            'To_Account': msg.sess.id().toString(),
            'MsgTimeStamp': msg.time,
            'MsgSeq': msg.seq,
            'MsgRandom': msg.random,
            'MsgBody': [] };

          break;
        case SESSION_TYPE.GROUP:
          var subType = msg.getSubType();
          msgInfo = {
            'GroupId': msg.sess.id().toString(),
            'From_Account': ctx.identifier,
            'Random': msg.random,
            'MsgBody': [] };

          switch (subType) {
            case GROUP_MSG_SUB_TYPE.COMMON:
              msgInfo.MsgPriority = "COMMON";
              break;
            case GROUP_MSG_SUB_TYPE.REDPACKET:
              msgInfo.MsgPriority = "REDPACKET";
              break;
            case GROUP_MSG_SUB_TYPE.LOVEMSG:
              msgInfo.MsgPriority = "LOVEMSG";
              break;
            case GROUP_MSG_SUB_TYPE.TIP:
              log.error("不能主动发送群提示消息,subType=" + subType);
              break;
            default:
              log.error("发送群消息时，出现未知子消息类型：subType=" + subType);
              return;
              break;}

          break;
        default:
          break;}


      for (var i in msg.elems) {
        var elem = msg.elems[i];
        var msgContent = null;
        var msgType = elem.type;
        switch (msgType) {
          case MSG_ELEMENT_TYPE.TEXT: //文本
            msgContent = {
              'Text': elem.content.text };

            break;
          case MSG_ELEMENT_TYPE.FACE: //表情
            msgContent = {
              'Index': elem.content.index,
              'Data': elem.content.data };

            break;
          case MSG_ELEMENT_TYPE.IMAGE: //图片
            var ImageInfoArray = [];
            for (var j in elem.content.ImageInfoArray) {
              ImageInfoArray.push({
                'Type': elem.content.ImageInfoArray[j].type,
                'Size': elem.content.ImageInfoArray[j].size,
                'Width': elem.content.ImageInfoArray[j].width,
                'Height': elem.content.ImageInfoArray[j].height,
                'URL': elem.content.ImageInfoArray[j].url });

            }
            msgContent = {
              'ImageFormat': elem.content.ImageFormat,
              'UUID': elem.content.UUID,
              'ImageInfoArray': ImageInfoArray };

            break;
          case MSG_ELEMENT_TYPE.SOUND: //
            log.warn('web端暂不支持发送语音消息');
            continue;
            break;
          case MSG_ELEMENT_TYPE.LOCATION: //
            log.warn('web端暂不支持发送地理位置消息');
            continue;
            break;
          case MSG_ELEMENT_TYPE.FILE: //
            msgContent = {
              'UUID': elem.content.uuid,
              'FileName': elem.content.name,
              'FileSize': elem.content.size,
              'DownloadFlag': elem.content.downFlag };

            break;
          case MSG_ELEMENT_TYPE.CUSTOM: //
            msgContent = {
              'Data': elem.content.data,
              'Desc': elem.content.desc,
              'Ext': elem.content.ext };

            msgType = MSG_ELEMENT_TYPE.CUSTOM;
            break;
          default:
            log.warn('web端暂不支持发送' + elem.type + '消息');
            continue;
            break;}


        if (msg.PushInfoBoolean) {
          msgInfo.OfflinePushInfo = msg.PushInfo; //当android终端进程被杀掉时才走push，IOS退到后台即可
        }

        msgInfo.MsgBody.push({
          'MsgType': msgType,
          'MsgContent': msgContent });

      }
      if (msg.sess.type() == SESSION_TYPE.C2C) {//私聊
        ConnManager.apiCall(SRV_NAME.OPEN_IM, "sendmsg", msgInfo, cbOk, cbErr);
      } else if (msg.sess.type() == SESSION_TYPE.GROUP) {//群聊
        ConnManager.apiCall(SRV_NAME.GROUP, "send_group_msg", msgInfo, cbOk, cbErr);
      }
    };
    //长轮询接口
    var proto_longPolling = function proto_longPolling(options, cbOk, cbErr) {
      if (!isAccessFormaEnvironment && typeof stopPolling != "undefined" && stopPolling == true) {
        return;
      }
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "longpolling", options, cbOk, cbErr, longPollingDefaultTimeOut, true);
    };

    //长轮询接口(拉取直播聊天室新消息)
    var proto_bigGroupLongPolling = function proto_bigGroupLongPolling(options, cbOk, cbErr, timeout) {
      ConnManager.apiCall(SRV_NAME.BIG_GROUP_LONG_POLLING, "get_msg", options, cbOk, cbErr, timeout);
    };

    //拉取未读c2c消息接口
    var proto_getMsgs = function proto_getMsgs(cookie, syncFlag, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "getmsg", { 'Cookie': cookie, 'SyncFlag': syncFlag },
      function (resp) {

        if (resp.MsgList && resp.MsgList.length) {
          for (var i in resp.MsgList) {
            tempC2CMsgList.push(resp.MsgList[i]);
          }
        }
        if (resp.SyncFlag == 1) {
          proto_getMsgs(resp.Cookie, resp.SyncFlag, cbOk, cbErr);
        } else {
          resp.MsgList = tempC2CMsgList;
          tempC2CMsgList = [];
          if (cbOk) cbOk(resp);
        }
      },
      cbErr);
    };
    //C2C消息已读上报接口
    var proto_c2CMsgReaded = function proto_c2CMsgReaded(cookie, c2CMsgReadedItem, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var tmpC2CMsgReadedItem = [];
      for (var i in c2CMsgReadedItem) {
        var item = {
          'To_Account': c2CMsgReadedItem[i].toAccount,
          'LastedMsgTime': c2CMsgReadedItem[i].lastedMsgTime };

        tmpC2CMsgReadedItem.push(item);
      }
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "msgreaded", {
        C2CMsgReaded: {
          'Cookie': cookie,
          'C2CMsgReadedItem': tmpC2CMsgReadedItem } },

      cbOk, cbErr);
    };

    //删除c2c消息
    var proto_deleteC2CMsg = function proto_deleteC2CMsg(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.OPEN_IM, "deletemsg", options,
      cbOk, cbErr);
    };

    //拉取c2c历史消息接口
    var proto_getC2CHistoryMsgs = function proto_getC2CHistoryMsgs(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "getroammsg", options,
      function (resp) {
        var reqMsgCount = options.MaxCnt;
        var complete = resp.Complete;
        var rspMsgCount = resp.MaxCnt;
        var msgKey = resp.MsgKey;
        var lastMsgTime = resp.LastMsgTime;

        if (resp.MsgList && resp.MsgList.length) {
          for (var i in resp.MsgList) {
            tempC2CHistoryMsgList.push(resp.MsgList[i]);
          }
        }
        var netxOptions = null;
        if (complete == 0) {//还有历史消息可拉取
          if (rspMsgCount < reqMsgCount) {
            netxOptions = {
              'Peer_Account': options.Peer_Account,
              'MaxCnt': reqMsgCount - rspMsgCount,
              'LastMsgTime': lastMsgTime,
              'MsgKey': msgKey };

          }
        }

        if (netxOptions) {//继续拉取
          proto_getC2CHistoryMsgs(netxOptions, cbOk, cbErr);
        } else {
          resp.MsgList = tempC2CHistoryMsgList;
          tempC2CHistoryMsgList = [];
          if (cbOk) cbOk(resp);
        }
      },
      cbErr);
    };

    //群组接口
    //创建群组
    //协议参考：https://www.qcloud.com/doc/product/269/1615
    var proto_createGroup = function proto_createGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var opt = {
        //必填    群组形态，包括Public（公开群），Private（私有群），ChatRoom（聊天室），AVChatRoom（互动直播聊天室）。
        'Type': options.Type,
        //必填    群名称，最长30字节。
        'Name': options.Name };

      var member_list = [];

      //Array 选填  初始群成员列表，最多500个。成员信息字段详情参见：群成员资料。
      for (var i = 0; i < options.MemberList.length; i++) {
        member_list.push({ 'Member_Account': options.MemberList[i] });
      }
      opt.MemberList = member_list;
      //选填    为了使得群组ID更加简单，便于记忆传播，腾讯云支持APP在通过REST API创建群组时自定义群组ID。详情参见：自定义群组ID。
      if (options.GroupId) {
        opt.GroupId = options.GroupId;
      }
      //选填    群主id，自动添加到群成员中。如果不填，群没有群主。
      if (options.Owner_Account) {
        opt.Owner_Account = options.Owner_Account;
      }
      //选填    群简介，最长240字节。
      if (options.Introduction) {
        opt.Introduction = options.Introduction;
      }
      //选填    群公告，最长300字节。
      if (options.Notification) {
        opt.Notification = options.Notification;
      }
      //选填    最大群成员数量，最大为10000，不填默认为2000个。
      if (options.MaxMemberCount) {
        opt.MaxMemberCount = options.MaxMemberCount;
      }
      //选填    申请加群处理方式。包含FreeAccess（自由加入），NeedPermission（需要验证），DisableApply（禁止加群），不填默认为NeedPermission（需要验证）。
      if (options.ApplyJoinOption) {//
        opt.ApplyJoinOption = options.ApplyJoinOption;
      }
      //Array 选填  群组维度的自定义字段，默认情况是没有的，需要开通，详情参见：自定义字段。
      if (options.AppDefinedData) {
        opt.AppDefinedData = options.AppDefinedData;
      }
      //选填    群头像URL，最长100字节。
      if (options.FaceUrl) {
        opt.FaceUrl = options.FaceUrl;
      }
      ConnManager.apiCall(SRV_NAME.GROUP, "create_group", opt,
      cbOk, cbErr);
    };

    //创建群组-高级接口
    //协议参考：https://www.qcloud.com/doc/product/269/1615
    var proto_createGroupHigh = function proto_createGroupHigh(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "create_group", options,
      cbOk, cbErr);
    };

    //修改群组基本资料
    //协议参考：https://www.qcloud.com/doc/product/269/1620
    var proto_modifyGroupBaseInfo = function proto_modifyGroupBaseInfo(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "modify_group_base_info", options,
      cbOk, cbErr);
    };

    //申请加群
    var proto_applyJoinGroup = function proto_applyJoinGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "apply_join_group", {
        'GroupId': options.GroupId,
        'ApplyMsg': options.ApplyMsg,
        'UserDefinedField': options.UserDefinedField },

      cbOk, cbErr);
    };

    //申请加入大群
    var proto_applyJoinBigGroup = function proto_applyJoinBigGroup(options, cbOk, cbErr) {
      var srvName;
      if (!checkLogin(cbErr, false)) {//未登录
        srvName = SRV_NAME.BIG_GROUP;
      } else {//已登录
        srvName = SRV_NAME.GROUP;
      }
      ConnManager.apiCall(srvName, "apply_join_group", {
        'GroupId': options.GroupId,
        'ApplyMsg': options.ApplyMsg,
        'UserDefinedField': options.UserDefinedField },

      function (resp) {
        if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
          if (resp.LongPollingKey) {
            MsgManager.setBigGroupLongPollingOn(true); //开启长轮询
            MsgManager.setBigGroupLongPollingKey(resp.LongPollingKey); //更新大群长轮询key
            MsgManager.setBigGroupLongPollingMsgMap(options.GroupId, 0); //收到的群消息置0
            MsgManager.bigGroupLongPolling(); //开启长轮询
          } else {//没有返回LongPollingKey，说明申请加的群不是直播聊天室(AVChatRoom)
            cbErr && cbErr(tool.getReturnError("Join Group succeed; But the type of group is not AVChatRoom: groupid=" + options.GroupId, -12));
            return;
          }
        }
        if (cbOk) cbOk(resp);
      }, function (err) {

        if (cbErr) cbErr(err);
      });
    };

    //处理加群申请(同意或拒绝)
    var proto_handleApplyJoinGroupPendency = function proto_handleApplyJoinGroupPendency(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "handle_apply_join_group", {
        'GroupId': options.GroupId,
        'Applicant_Account': options.Applicant_Account,
        'HandleMsg': options.HandleMsg,
        'Authentication': options.Authentication,
        'MsgKey': options.MsgKey,
        'ApprovalMsg': options.ApprovalMsg,
        'UserDefinedField': options.UserDefinedField },

      cbOk,
      function (err) {
        if (err.ErrorCode == 10024) {//apply has be handled
          if (cbOk) {
            var resp = {
              'ActionStatus': ACTION_STATUS.OK,
              'ErrorCode': 0,
              'ErrorInfo': '该申请已经被处理过' };

            cbOk(resp);
          }
        } else {
          if (cbErr) cbErr(err);
        }
      });

    };

    //获取群组未决列表
    var proto_getPendencyGroup = function proto_getPendencyGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "get_pendency", {
        'StartTime': options.StartTime,
        'Limit': options.Limit,
        'Handle_Account': ctx.identifier },

      cbOk,
      function (err) {

      });

    };


    //群组未决已经上报
    var proto_getPendencyGroupRead = function proto_getPendencyGroupRead(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "report_pendency", {
        'ReportTime': options.ReportTime,
        'From_Account': ctx.identifier },

      cbOk,
      function (err) {

      });

    };

    //处理被邀请进群申请(同意或拒绝)
    var proto_handleInviteJoinGroupRequest = function proto_handleInviteJoinGroupRequest(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "handle_invite_join_group", {
        'GroupId': options.GroupId,
        'Inviter_Account': options.Inviter_Account,
        'HandleMsg': options.HandleMsg,
        'Authentication': options.Authentication,
        'MsgKey': options.MsgKey,
        'ApprovalMsg': options.ApprovalMsg,
        'UserDefinedField': options.UserDefinedField },

      cbOk,
      function (err) {

      });

    };

    //主动退群
    var proto_quitGroup = function proto_quitGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "quit_group", {
        'GroupId': options.GroupId },

      cbOk, cbErr);
    };

    //退出大群
    var proto_quitBigGroup = function proto_quitBigGroup(options, cbOk, cbErr) {
      var srvName;
      if (!checkLogin(cbErr, false)) {//未登录
        srvName = SRV_NAME.BIG_GROUP;
      } else {//已登录
        srvName = SRV_NAME.GROUP;
      }
      ConnManager.apiCall(srvName, "quit_group",
      { 'GroupId': options.GroupId },
      function (resp) {
        //重置当前再请求中的ajax
        //clearXmlHttpObjMap();
        //退出大群成功之后需要重置长轮询信息
        MsgManager.resetBigGroupLongPollingInfo();
        if (cbOk) cbOk(resp);
      },
      cbErr);
    };
    //查找群(按名称)
    var proto_searchGroupByName = function proto_searchGroupByName(options, cbOk, cbErr) {
      ConnManager.apiCall(SRV_NAME.GROUP, "search_group", options, cbOk, cbErr);
    };

    //获取群组公开资料
    var proto_getGroupPublicInfo = function proto_getGroupPublicInfo(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "get_group_public_info", {
        'GroupIdList': options.GroupIdList,
        'ResponseFilter': {
          'GroupBasePublicInfoFilter': options.GroupBasePublicInfoFilter } },


      function (resp) {
        resp.ErrorInfo = '';
        if (resp.GroupInfo) {
          for (var i in resp.GroupInfo) {
            var errorCode = resp.GroupInfo[i].ErrorCode;
            if (errorCode > 0) {
              resp.ActionStatus = ACTION_STATUS.FAIL;
              resp.GroupInfo[i].ErrorInfo = "[" + errorCode + "]" + resp.GroupInfo[i].ErrorInfo;
              resp.ErrorInfo += resp.GroupInfo[i].ErrorInfo + '\n';
            }
          }
        }
        if (resp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) {
            cbErr(resp);
          }
        } else if (cbOk) {
          cbOk(resp);
        }

      },
      cbErr);
    };

    //获取群组详细资料--高级
    //请求协议参考：https://www.qcloud.com/doc/product/269/1616
    var proto_getGroupInfo = function proto_getGroupInfo(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      var opt = {
        'GroupIdList': options.GroupIdList,
        'ResponseFilter': {
          'GroupBaseInfoFilter': options.GroupBaseInfoFilter,
          'MemberInfoFilter': options.MemberInfoFilter } };


      if (options.AppDefinedDataFilter_Group) {
        opt.ResponseFilter.AppDefinedDataFilter_Group = options.AppDefinedDataFilter_Group;
      }
      if (options.AppDefinedDataFilter_GroupMember) {
        opt.ResponseFilter.AppDefinedDataFilter_GroupMember = options.AppDefinedDataFilter_GroupMember;
      }
      ConnManager.apiCall(SRV_NAME.GROUP, "get_group_info", opt,
      cbOk, cbErr);
    };

    //获取群组成员-高级接口
    //协议参考：https://www.qcloud.com/doc/product/269/1617
    var proto_getGroupMemberInfo = function proto_getGroupMemberInfo(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "get_group_member_info", {
        'GroupId': options.GroupId,
        'Offset': options.Offset,
        'Limit': options.Limit,
        'MemberInfoFilter': options.MemberInfoFilter,
        'MemberRoleFilter': options.MemberRoleFilter,
        'AppDefinedDataFilter_GroupMember': options.AppDefinedDataFilter_GroupMember },

      cbOk, cbErr);
    };


    //增加群组成员
    //协议参考：https://www.qcloud.com/doc/product/269/1621
    var proto_addGroupMember = function proto_addGroupMember(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "add_group_member", {
        'GroupId': options.GroupId,
        'Silence': options.Silence,
        'MemberList': options.MemberList },

      cbOk, cbErr);
    };
    //修改群组成员资料
    //协议参考：https://www.qcloud.com/doc/product/269/1623
    var proto_modifyGroupMember = function proto_modifyGroupMember(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var opt = {};
      if (options.GroupId) {
        opt.GroupId = options.GroupId;
      }
      if (options.Member_Account) {
        opt.Member_Account = options.Member_Account;
      }
      //Admin或者Member
      if (options.Role) {
        opt.Role = options.Role;
      }
      // AcceptAndNotify代表解收并提示消息，Discard代表不接收也不提示消息，AcceptNotNotify代表接收消息但不提示
      if (options.MsgFlag) {
        opt.MsgFlag = options.MsgFlag;
      }
      if (options.ShutUpTime) {//禁言时间
        opt.ShutUpTime = options.ShutUpTime;
      }
      if (options.NameCard) {//群名片,最大不超过50个字节
        opt.NameCard = options.NameCard;
      }
      if (options.AppMemberDefinedData) {//群成员维度的自定义字段，默认情况是没有的，需要开通
        opt.AppMemberDefinedData = options.AppMemberDefinedData;
      }
      ConnManager.apiCall(SRV_NAME.GROUP, "modify_group_member_info", opt,
      cbOk, cbErr);
    };
    //删除群组成员
    //协议参考：https://www.qcloud.com/doc/product/269/1622
    var proto_deleteGroupMember = function proto_deleteGroupMember(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "delete_group_member", {
        'GroupId': options.GroupId,
        'Silence': options.Silence,
        'MemberToDel_Account': options.MemberToDel_Account,
        'Reason': options.Reason },

      cbOk, cbErr);
    };
    //解散群组
    //协议参考：https://www.qcloud.com/doc/product/269/1624
    var proto_destroyGroup = function proto_destroyGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "destroy_group", {
        'GroupId': options.GroupId },

      cbOk, cbErr);
    };
    //转让群组
    //协议参考：https://www.qcloud.com/doc/product/269/1633
    var proto_changeGroupOwner = function proto_changeGroupOwner(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "change_group_owner", options, cbOk, cbErr);
    };
    //获取用户所加入的群组-高级接口
    //协议参考：https://www.qcloud.com/doc/product/269/1625
    var proto_getJoinedGroupListHigh = function proto_getJoinedGroupListHigh(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "get_joined_group_list", {
        'Member_Account': options.Member_Account,
        'Limit': options.Limit,
        'Offset': options.Offset,
        'GroupType': options.GroupType,
        'ResponseFilter': {
          'GroupBaseInfoFilter': options.GroupBaseInfoFilter,
          'SelfInfoFilter': options.SelfInfoFilter } },


      cbOk, cbErr);
    };
    //查询一组UserId在群中的身份
    //协议参考：https://www.qcloud.com/doc/product/269/1626
    var proto_getRoleInGroup = function proto_getRoleInGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "get_role_in_group", {
        'GroupId': options.GroupId,
        'User_Account': options.User_Account },

      cbOk, cbErr);
    };
    //设置取消成员禁言时间
    //协议参考：https://www.qcloud.com/doc/product/269/1627
    var proto_forbidSendMsg = function proto_forbidSendMsg(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      ConnManager.apiCall(SRV_NAME.GROUP, "forbid_send_msg", {
        'GroupId': options.GroupId,
        'Members_Account': options.Members_Account,
        'ShutUpTime': options.ShutUpTime //单位为秒，为0时表示取消禁言
      },
      cbOk, cbErr);
    };

    //发送自定义群系统通知
    var proto_sendCustomGroupNotify = function proto_sendCustomGroupNotify(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "send_group_system_notification", options,
      cbOk, cbErr);
    };

    //拉取群消息接口
    var proto_getGroupMsgs = function proto_getGroupMsgs(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "group_msg_get", {
        "GroupId": options.GroupId,
        "ReqMsgSeq": options.ReqMsgSeq,
        "ReqMsgNumber": options.ReqMsgNumber },

      cbOk, cbErr);
    };
    //群消息已读上报接口
    var proto_groupMsgReaded = function proto_groupMsgReaded(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "msg_read_report", {
        'GroupId': options.GroupId,
        'MsgReadedSeq': options.MsgReadedSeq },

      cbOk, cbErr);
    };
    //end

    //好友接口
    //处理好友接口返回的错误码
    var convertErrorEn2ZhFriend = function convertErrorEn2ZhFriend(resp) {
      var errorAccount = [];
      if (resp.Fail_Account && resp.Fail_Account.length) {
        errorAccount = resp.Fail_Account;
      }
      if (resp.Invalid_Account && resp.Invalid_Account.length) {
        for (var k in resp.Invalid_Account) {
          errorAccount.push(resp.Invalid_Account[k]);
        }
      }
      if (errorAccount.length) {
        resp.ActionStatus = ACTION_STATUS.FAIL;
        resp.ErrorCode = ERROR_CODE_CUSTOM;
        resp.ErrorInfo = '';
        for (var i in errorAccount) {
          var failCount = errorAccount[i];
          for (var j in resp.ResultItem) {
            if (resp.ResultItem[j].To_Account == failCount) {

              var resultCode = resp.ResultItem[j].ResultCode;
              resp.ResultItem[j].ResultInfo = "[" + resultCode + "]" + resp.ResultItem[j].ResultInfo;
              resp.ErrorInfo += resp.ResultItem[j].ResultInfo + "\n";
              break;
            }
          }
        }
      }
      return resp;
    };
    //添加好友
    var proto_applyAddFriend = function proto_applyAddFriend(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "friend_add", {
        'From_Account': ctx.identifier,
        'AddFriendItem': options.AddFriendItem },

      function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);
        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    };
    //删除好友
    var proto_deleteFriend = function proto_deleteFriend(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "friend_delete", {
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account,
        'DeleteType': options.DeleteType },

      function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);
        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    };

    //删除会话
    var proto_deleteChat = function proto_deleteChat(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      if (options.chatType == 1) {
        ConnManager.apiCall(SRV_NAME.DEL_CHAT, "delete", {
          'From_Account': ctx.identifier,
          'Type': options.chatType,
          'To_Account': options.To_Account },

        cbOk, cbErr);
      } else {
        ConnManager.apiCall(SRV_NAME.DEL_CHAT, "delete", {
          'From_Account': ctx.identifier,
          'Type': options.chatType,
          'ToGroupid': options.To_Account },

        cbOk, cbErr);

      }

    };

    //获取好友申请
    var proto_getPendency = function proto_getPendency(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "pendency_get", {
        "From_Account": ctx.identifier,
        "PendencyType": options.PendencyType,
        "StartTime": options.StartTime,
        "MaxLimited": options.MaxLimited,
        "LastSequence": options.LastSequence },

      cbOk, cbErr);
    };
    //好友申请已读上报
    var proto_getPendencyReport = function proto_getPendencyReport(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "PendencyReport", {
        "From_Account": ctx.identifier,
        "LatestPendencyTimeStamp": options.LatestPendencyTimeStamp },

      cbOk, cbErr);
    };
    //删除好友申请
    var proto_deletePendency = function proto_deletePendency(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "pendency_delete", {
        "From_Account": ctx.identifier,
        "PendencyType": options.PendencyType,
        "To_Account": options.To_Account },


      function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);
        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    };
    //处理好友申请
    var proto_responseFriend = function proto_responseFriend(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "friend_response", {
        'From_Account': ctx.identifier,
        'ResponseFriendItem': options.ResponseFriendItem },

      function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);
        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    };
    //我的好友
    var proto_getAllFriend = function proto_getAllFriend(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "friend_get_all", {
        'From_Account': ctx.identifier,
        'TimeStamp': options.TimeStamp,
        'StartIndex': options.StartIndex,
        'GetCount': options.GetCount,
        'LastStandardSequence': options.LastStandardSequence,
        'TagList': options.TagList },

      cbOk, cbErr);
    };

    //资料接口
    //查看个人资料
    var proto_getProfilePortrait = function proto_getProfilePortrait(options, cbOk, cbErr) {
      if (options.To_Account.length > 100) {
        options.To_Account.length = 100;
        log.error('获取用户资料人数不能超过100人');
      }
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.PROFILE, "portrait_get", {
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account,
        //'LastStandardSequence':options.LastStandardSequence,
        'TagList': options.TagList },

      function (resp) {
        var errorAccount = [];
        if (resp.Fail_Account && resp.Fail_Account.length) {
          errorAccount = resp.Fail_Account;
        }
        if (resp.Invalid_Account && resp.Invalid_Account.length) {
          for (var k in resp.Invalid_Account) {
            errorAccount.push(resp.Invalid_Account[k]);
          }
        }
        if (errorAccount.length) {
          resp.ActionStatus = ACTION_STATUS.FAIL;
          resp.ErrorCode = ERROR_CODE_CUSTOM;
          resp.ErrorInfo = '';
          for (var i in errorAccount) {
            var failCount = errorAccount[i];
            for (var j in resp.UserProfileItem) {
              if (resp.UserProfileItem[j].To_Account == failCount) {
                var resultCode = resp.UserProfileItem[j].ResultCode;
                resp.UserProfileItem[j].ResultInfo = "[" + resultCode + "]" + resp.UserProfileItem[j].ResultInfo;
                resp.ErrorInfo += "账号:" + failCount + "," + resp.UserProfileItem[j].ResultInfo + "\n";
                break;
              }
            }
          }
        }
        if (resp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(resp);
        } else if (cbOk) {
          cbOk(resp);
        }
      },
      cbErr);
    };

    //设置个人资料
    var proto_setProfilePortrait = function proto_setProfilePortrait(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.PROFILE, "portrait_set",
      {
        'From_Account': ctx.identifier,
        'ProfileItem': options.ProfileItem },

      function (resp) {
        for (var i in options.ProfileItem) {
          var profile = options.ProfileItem[i];
          if (profile.Tag == 'Tag_Profile_IM_Nick') {
            ctx.identifierNick = profile.Value; //更新昵称
            break;
          }
        }
        if (cbOk) cbOk(resp);
      },
      cbErr);
    };

    //增加黑名单
    var proto_addBlackList = function proto_addBlackList(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "black_list_add", {
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account },

      function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);
        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    };

    //删除黑名单
    var proto_deleteBlackList = function proto_deleteBlackList(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "black_list_delete", {
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account },

      function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);
        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    };

    //我的黑名单
    var proto_getBlackList = function proto_getBlackList(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "black_list_get", {
        'From_Account': ctx.identifier,
        'StartIndex': options.StartIndex,
        'MaxLimited': options.MaxLimited,
        'LastSequence': options.LastSequence },

      cbOk, cbErr);
    };

    //获取最近联系人
    var proto_getRecentContactList = function proto_getRecentContactList(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.RECENT_CONTACT, "get", {
        'From_Account': ctx.identifier,
        'Count': options.Count },

      cbOk, cbErr);
    };

    //上传图片或文件
    var proto_uploadPic = function proto_uploadPic(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var cmdName;
      if (isAccessFormalEnv()) {
        cmdName = 'pic_up';
      } else {
        cmdName = 'pic_up_test';
      }
      ConnManager.apiCall(SRV_NAME.PIC, cmdName, {
        'App_Version': VERSION_INFO.APP_VERSION,
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account,
        'Seq': options.Seq,
        'Timestamp': options.Timestamp,
        'Random': options.Random,
        'File_Str_Md5': options.File_Str_Md5,
        'File_Size': options.File_Size,
        'File_Type': options.File_Type,
        'Server_Ver': VERSION_INFO.SERVER_VERSION,
        'Auth_Key': authkey,
        'Busi_Id': options.Busi_Id,
        'PkgFlag': options.PkgFlag,
        'Slice_Offset': options.Slice_Offset,
        'Slice_Size': options.Slice_Size,
        'Slice_Data': options.Slice_Data },

      cbOk, cbErr);
    };

    //获取语音和文件下载IP和authkey
    var proto_getIpAndAuthkey = function proto_getIpAndAuthkey(cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "authkey", {}, cbOk, cbErr);
    };

    //接口质量上报
    var proto_reportApiQuality = function proto_reportApiQuality(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.IM_OPEN_STAT, "web_report", options, cbOk, cbErr);
    };


    var proto_getLongPollingId = function proto_getLongPollingId(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "getlongpollingid", {},
      function (resp) {
        cbOk && cbOk(resp);
      }, cbErr);
    };


    var proto_applyDownload = function proto_applyDownload(options, cbOk, cbErr) {
      //把下载地址push到map中
      ConnManager.apiCall(SRV_NAME.PIC, "apply_download", options, cbOk, cbErr);
    };

    //end
    initBrowserInfo();
    // singleton object ConnManager
    var ConnManager = lowerBR == false ?
    new function () {
      var onConnCallback = null; //回调函数
      this.init = function (onConnNotify, cbOk, cbErr) {
        if (onConnNotify) onConnCallback = onConnNotify;
      };
      this.callBack = function (info) {
        if (onConnCallback) onConnCallback(info);
      };
      this.clear = function () {
        onConnCallback = null;
      };
      //请求后台服务接口
      this.apiCall = function (type, cmd, data, cbOk, cbErr, timeout, isLongPolling) {
        //封装后台服务接口地址
        var url = getApiUrl(type, cmd, cbOk, cbErr);
        if (url == false) return;
        //发起ajax请求
        ajaxRequestJson("POST", url, data, timeout, isLongPolling, function (resp) {
          resp = JSON.parse(resp);
          var errorCode = null,tempErrorInfo = '';
          if (cmd == 'pic_up') {
            data.Slice_Data = '';
          }
          var info = "\n request url: \n" + url + "\n request body: \n" + JSON.stringify(data) + "\n response: \n" + JSON.stringify(resp);
          //成功
          if (resp.ActionStatus == ACTION_STATUS.OK) {
            log.info("[" + type + "][" + cmd + "]success: " + info);
            if (cbOk) cbOk(resp); //回调
            errorCode = 0;
            tempErrorInfo = '';
          } else {
            errorCode = resp.ErrorCode;
            tempErrorInfo = resp.ErrorInfo;
            //报错
            if (cbErr) {
              resp.SrcErrorInfo = resp.ErrorInfo;
              resp.ErrorInfo = "[" + type + "][" + cmd + "]failed: " + info;
              if (cmd != 'longpolling' || resp.ErrorCode != longPollingTimeOutErrorCode) {
                log.error(resp.ErrorInfo);
              }
              cbErr(resp);
            }
          }
          reportApiQuality(cmd, errorCode, tempErrorInfo); //接口质量上报
        }, function (err) {
          cbErr && cbErr(err);
          reportApiQuality(cmd, err.ErrorCode, err.ErrorInfo); //接口质量上报
        });
      };
    }() :
    new function () {
      var onConnCallback = null; //回调函数
      this.init = function (onConnNotify, cbOk, cbErr) {
        if (onConnNotify) onConnCallback = onConnNotify;
      };
      this.callBack = function (info) {
        if (onConnCallback) onConnCallback(info);
      };
      this.clear = function () {
        onConnCallback = null;
      };
      //请求后台服务接口
      this.apiCall = function (type, cmd, data, cbOk, cbErr, timeout, isLongPolling) {
        //封装后台服务接口地址
        var url = getApiUrl(type, cmd, cbOk, cbErr);
        if (url == false) return;
        //发起jsonp请求
        var reqId = jsonpRequestId++,
        cbkey = 'jsonpcallback', // the 'callback' key
        cbval = 'jsonpRequest' + reqId, // the 'callback' value
        script = document.createElement('script'),
        loaded = 0;

        window[cbval] = jsonpCallback;
        script.type = 'text/javascript';
        url = url + "&" + cbkey + "=" + cbval + "&jsonpbody=" + encodeURIComponent(JSON.stringify(data));
        script.src = url;
        script.async = true;

        if (typeof script.onreadystatechange !== 'undefined') {
          // need this for IE due to out-of-order onreadystatechange(), binding script
          // execution to an event listener gives us control over when the script
          // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
          script.event = 'onclick';
          script.htmlFor = script.id = '_jsonpRequest_' + reqId;
        }

        script.onload = script.onreadystatechange = function () {
          if (this.readyState && this.readyState !== 'complete' && this.readyState !== 'loaded' || loaded) {
            return false;
          }
          script.onload = script.onreadystatechange = null;
          script.onclick && script.onclick();
          // Call the user callback with the last value stored and clean up values and scripts.
          var resp = jsonpLastRspData;
          var info = "\n request url: \n" + url + "\n request body: \n" + JSON.stringify(data) + "\n response: \n" + JSON.stringify(resp);
          if (resp.ActionStatus == ACTION_STATUS.OK) {
            log.info("[" + type + "][" + cmd + "]success: " + info);
            cbOk && cbOk(resp);
          } else {
            resp.ErrorInfo = "[" + type + "][" + cmd + "]failed " + info;
            if (cmd != 'longpolling' || resp.ErrorCode != longPollingTimeOutErrorCode) {
              log.error(resp.ErrorInfo);
            } else {
              log.warn("[" + type + "][" + cmd + "]success: " + info);
            }
            cbErr && cbErr(resp);
          }
          jsonpLastRspData = undefined;
          document.body.removeChild(script);
          loaded = 1;
        };

        // Add the script to the DOM head
        document.body.appendChild(script);
      };
    }();
    // class Session
    var Session = function Session(type, id, name, icon, time, seq) {
      this._impl = {
        skey: Session.skey(type, id),
        type: type,
        id: id,
        name: name,
        icon: icon,
        unread: 0, //未读消息数
        isAutoRead: false,
        time: time >= 0 ? time : 0,
        curMaxMsgSeq: seq >= 0 ? seq : 0,
        msgs: [],
        isFinished: 1 };

    };
    Session.skey = function (type, id) {
      return type + id;
    };
    Session.prototype.type = function () {
      return this._impl.type;
    };
    Session.prototype.id = function () {
      return this._impl.id;
    };
    Session.prototype.name = function () {
      return this._impl.name;
    };
    Session.prototype.icon = function () {
      return this._impl.icon;
    };
    Session.prototype.unread = function (val) {
      if (typeof val !== 'undefined') {
        this._impl.unread = val;
      } else {
        return this._impl.unread;
      }
    };
    Session.prototype.isFinished = function (val) {
      if (typeof val !== 'undefined') {
        this._impl.isFinished = val;
      } else {
        return this._impl.isFinished;
      }
    };
    Session.prototype.time = function () {
      return this._impl.time;
    };
    Session.prototype.curMaxMsgSeq = function (seq) {
      if (typeof seq !== 'undefined') {
        this._impl.curMaxMsgSeq = seq;
      } else {
        return this._impl.curMaxMsgSeq;
      }
    };
    Session.prototype.msgCount = function () {
      return this._impl.msgs.length;
    };
    Session.prototype.msg = function (index) {
      return this._impl.msgs[index];
    };
    Session.prototype.msgs = function () {
      return this._impl.msgs;
    };
    Session.prototype._impl_addMsg = function (msg) {
      this._impl.msgs.push(msg);
      //if (!msg.isSend && msg.time > this._impl.time)
      if (msg.time > this._impl.time)
      this._impl.time = msg.time;
      //if (!msg.isSend && msg.seq > this._impl.curMaxMsgSeq)
      if (msg.seq > this._impl.curMaxMsgSeq)
      this._impl.curMaxMsgSeq = msg.seq;
      //自己发送的消息不计入未读数
      if (!msg.isSend && !this._impl.isAutoRead) {
        this._impl.unread++;
      }
    };
    //class C2CMsgReadedItem
    var C2CMsgReadedItem = function C2CMsgReadedItem(toAccount, lastedMsgTime) {
      this.toAccount = toAccount;
      this.lastedMsgTime = lastedMsgTime;
    };

    // class Msg
    var Msg = function Msg(sess, isSend, seq, random, time, fromAccount, subType, fromAccountNick) {
      this.sess = sess;
      this.subType = subType >= 0 ? subType : 0; //消息类型,c2c消息时，type取值为0；group消息时，type取值0和1，0-普通群消息，1-群提示消息
      this.fromAccount = fromAccount;
      this.fromAccountNick = fromAccountNick ? fromAccountNick : fromAccount;
      this.isSend = Boolean(isSend);
      this.seq = seq >= 0 ? seq : nextSeq();
      this.random = random >= 0 ? random : createRandom();
      this.time = time >= 0 ? time : unixtime();
      this.elems = [];
    };
    Msg.prototype.getSession = function () {
      return this.sess;
    };
    Msg.prototype.getType = function () {
      return this.subType;
    };
    Msg.prototype.getSubType = function () {
      return this.subType;
    };
    Msg.prototype.getFromAccount = function () {
      return this.fromAccount;
    };
    Msg.prototype.getFromAccountNick = function () {
      return this.fromAccountNick;
    };
    Msg.prototype.getIsSend = function () {
      return this.isSend;
    };
    Msg.prototype.getSeq = function () {
      return this.seq;
    };
    Msg.prototype.getTime = function () {
      return this.time;
    };
    Msg.prototype.getRandom = function () {
      return this.random;
    };
    Msg.prototype.getElems = function () {
      return this.elems;
    };
    //文本
    Msg.prototype.addText = function (text) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.TEXT, text));
    };
    //表情
    Msg.prototype.addFace = function (face) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.FACE, face));
    };
    //图片
    Msg.prototype.addImage = function (image) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.IMAGE, image));
    };
    //地理位置
    Msg.prototype.addLocation = function (location) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.LOCATION, location));
    };
    //文件
    Msg.prototype.addFile = function (file) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.FILE, file));
    };
    //自定义
    Msg.prototype.addCustom = function (custom) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.CUSTOM, custom));
    };
    Msg.prototype.addElem = function (elem) {
      this.elems.push(elem);
    };
    Msg.prototype.toHtml = function () {
      var html = "";
      for (var i in this.elems) {
        var elem = this.elems[i];
        html += elem.toHtml();
      }
      return html;
    };

    // class Msg.Elem
    Msg.Elem = function (type, value) {
      this.type = type;
      this.content = value;
    };
    Msg.Elem.prototype.getType = function () {
      return this.type;
    };
    Msg.Elem.prototype.getContent = function () {
      return this.content;
    };
    Msg.Elem.prototype.toHtml = function () {
      var html;
      html = this.content.toHtml();
      return html;
    };

    // class Msg.Elem.Text
    Msg.Elem.Text = function (text) {
      this.text = tool.xssFilter(text);
    };
    Msg.Elem.Text.prototype.getText = function () {
      return this.text;
    };
    Msg.Elem.Text.prototype.toHtml = function () {
      return this.text;
    };

    // class Msg.Elem.Face
    Msg.Elem.Face = function (index, data) {
      this.index = index;
      this.data = data;
    };
    Msg.Elem.Face.prototype.getIndex = function () {
      return this.index;
    };
    Msg.Elem.Face.prototype.getData = function () {
      return this.data;
    };
    Msg.Elem.Face.prototype.toHtml = function () {
      var faceUrl = null;
      var index = emotionDataIndexs[this.data];
      var emotion = emotions[index];
      if (emotion && emotion[1]) {
        faceUrl = emotion[1];
      }
      if (faceUrl) {
        return "<img src='" + faceUrl + "'/>";
      } else {
        return this.data;
      }
    };

    // 地理位置消息 class Msg.Elem.Location
    Msg.Elem.Location = function (longitude, latitude, desc) {
      this.latitude = latitude; //纬度
      this.longitude = longitude; //经度
      this.desc = desc; //描述
    };
    Msg.Elem.Location.prototype.getLatitude = function () {
      return this.latitude;
    };
    Msg.Elem.Location.prototype.getLongitude = function () {
      return this.longitude;
    };
    Msg.Elem.Location.prototype.getDesc = function () {
      return this.desc;
    };
    Msg.Elem.Location.prototype.toHtml = function () {
      return '经度=' + this.longitude + ',纬度=' + this.latitude + ',描述=' + this.desc;
    };

    //图片消息
    // class Msg.Elem.Images
    Msg.Elem.Images = function (imageId, format) {
      this.UUID = imageId;
      if (typeof format !== 'number') {
        format = parseInt(IMAGE_FORMAT[format] || IMAGE_FORMAT['UNKNOWN'], 10);
      }
      this.ImageFormat = format;
      this.ImageInfoArray = [];
    };
    Msg.Elem.Images.prototype.addImage = function (image) {
      this.ImageInfoArray.push(image);
    };
    Msg.Elem.Images.prototype.toHtml = function () {
      var smallImage = this.getImage(IMAGE_TYPE.SMALL);
      var bigImage = this.getImage(IMAGE_TYPE.LARGE);
      var oriImage = this.getImage(IMAGE_TYPE.ORIGIN);
      if (!bigImage) {
        bigImage = smallImage;
      }
      if (!oriImage) {
        oriImage = smallImage;
      }
      return "<img src='" + smallImage.getUrl() + "#" + bigImage.getUrl() + "#" + oriImage.getUrl() + "' style='CURSOR: hand' id='" + this.getImageId() + "' bigImgUrl='" + bigImage.getUrl() + "' onclick='imageClick(this)' />";

    };
    Msg.Elem.Images.prototype.getImageId = function () {
      return this.UUID;
    };
    Msg.Elem.Images.prototype.getImageFormat = function () {
      return this.ImageFormat;
    };
    Msg.Elem.Images.prototype.getImage = function (type) {
      for (var i in this.ImageInfoArray) {
        if (this.ImageInfoArray[i].getType() == type) {
          return this.ImageInfoArray[i];
        }
      }
      return null;
    };
    // class Msg.Elem.Images.Image
    Msg.Elem.Images.Image = function (type, size, width, height, url) {
      this.type = type;
      this.size = size;
      this.width = width;
      this.height = height;
      this.url = url;
    };
    Msg.Elem.Images.Image.prototype.getType = function () {
      return this.type;
    };
    Msg.Elem.Images.Image.prototype.getSize = function () {
      return this.size;
    };
    Msg.Elem.Images.Image.prototype.getWidth = function () {
      return this.width;
    };
    Msg.Elem.Images.Image.prototype.getHeight = function () {
      return this.height;
    };
    Msg.Elem.Images.Image.prototype.getUrl = function () {
      return this.url;
    };

    // class Msg.Elem.Sound
    Msg.Elem.Sound = function (uuid, second, size, senderId, receiverId, downFlag, chatType) {
      this.uuid = uuid; //文件id
      this.second = second; //时长，单位：秒
      this.size = size; //大小，单位：字节
      this.senderId = senderId; //发送者
      this.receiverId = receiverId; //接收方id
      this.downFlag = downFlag; //下载标志位
      this.busiId = chatType == SESSION_TYPE.C2C ? 2 : 1; //busi_id ( 1：群    2:C2C)

      //根据不同情况拉取数据
      //是否需要申请下载地址  0:到架平申请  1:到cos申请  2:不需要申请, 直接拿url下载
      if (downFlag !== undefined && busiId !== undefined) {
        getFileDownUrlV2(uuid, senderId, second, downFlag, receiverId, this.busiId, UPLOAD_RES_TYPE.SOUND);
      } else {
        this.downUrl = getSoundDownUrl(uuid, senderId, second); //下载地址
      }
    };
    Msg.Elem.Sound.prototype.getUUID = function () {
      return this.uuid;
    };
    Msg.Elem.Sound.prototype.getSecond = function () {
      return this.second;
    };
    Msg.Elem.Sound.prototype.getSize = function () {
      return this.size;
    };
    Msg.Elem.Sound.prototype.getSenderId = function () {
      return this.senderId;
    };
    Msg.Elem.Sound.prototype.getDownUrl = function () {
      return this.downUrl;
    };
    Msg.Elem.Sound.prototype.toHtml = function () {
      if (BROWSER_INFO.type == 'ie' && parseInt(BROWSER_INFO.ver) <= 8) {
        return '[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:' + this.downUrl;
      }
      return '<audio id="uuid_' + this.uuid + '" src="' + this.downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
    };

    // class Msg.Elem.File
    Msg.Elem.File = function (uuid, name, size, senderId, receiverId, downFlag, chatType) {
      this.uuid = uuid; //文件id
      this.name = name; //文件名
      this.size = size; //大小，单位：字节
      this.senderId = senderId; //发送者
      this.receiverId = receiverId; //接收方id
      this.downFlag = downFlag; //下载标志位

      this.busiId = chatType == SESSION_TYPE.C2C ? 2 : 1; //busi_id ( 1：群    2:C2C)
      //根据不同情况拉取数据
      //是否需要申请下载地址  0:到架平申请  1:到cos申请  2:不需要申请, 直接拿url下载
      if (downFlag !== undefined && busiId !== undefined) {
        getFileDownUrlV2(uuid, senderId, name, downFlag, receiverId, this.busiId, UPLOAD_RES_TYPE.FILE);
      } else {
        this.downUrl = getFileDownUrl(uuid, senderId, name); //下载地址
      }
    };
    Msg.Elem.File.prototype.getUUID = function () {
      return this.uuid;
    };
    Msg.Elem.File.prototype.getName = function () {
      return this.name;
    };
    Msg.Elem.File.prototype.getSize = function () {
      return this.size;
    };
    Msg.Elem.File.prototype.getSenderId = function () {
      return this.senderId;
    };
    Msg.Elem.File.prototype.getDownUrl = function () {
      return this.downUrl;
    };
    Msg.Elem.File.prototype.getDownFlag = function () {
      return this.downFlag;
    };
    Msg.Elem.File.prototype.toHtml = function () {
      var fileSize, unitStr;
      fileSize = this.size;
      unitStr = "Byte";
      if (this.size >= 1024) {
        fileSize = Math.round(this.size / 1024);
        unitStr = "KB";
      }
      return '<a href="javascript" onclick="webim.onDownFile("' + this.uuid + '")" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + this.name + '(' + fileSize + unitStr + ')</i></a>';
    };

    // class Msg.Elem.GroupTip 群提示消息对象
    Msg.Elem.GroupTip = function (opType, opUserId, groupId, groupName, userIdList) {
      this.opType = opType; //操作类型
      this.opUserId = opUserId; //操作者id
      this.groupId = groupId; //群id
      this.groupName = groupName; //群名称
      this.userIdList = userIdList ? userIdList : []; //被操作的用户id列表
      this.groupInfoList = []; //新的群资料信息，群资料变更时才有值
      this.memberInfoList = []; //新的群成员资料信息，群成员资料变更时才有值
      this.groupMemberNum = null; //群成员数，操作类型为加群或者退群时才有值
    };
    Msg.Elem.GroupTip.prototype.addGroupInfo = function (groupInfo) {
      this.groupInfoList.push(groupInfo);
    };
    Msg.Elem.GroupTip.prototype.addMemberInfo = function (memberInfo) {
      this.memberInfoList.push(memberInfo);
    };
    Msg.Elem.GroupTip.prototype.getOpType = function () {
      return this.opType;
    };
    Msg.Elem.GroupTip.prototype.getOpUserId = function () {
      return this.opUserId;
    };
    Msg.Elem.GroupTip.prototype.getGroupId = function () {
      return this.groupId;
    };
    Msg.Elem.GroupTip.prototype.getGroupName = function () {
      return this.groupName;
    };
    Msg.Elem.GroupTip.prototype.getUserIdList = function () {
      return this.userIdList;
    };
    Msg.Elem.GroupTip.prototype.getGroupInfoList = function () {
      return this.groupInfoList;
    };
    Msg.Elem.GroupTip.prototype.getMemberInfoList = function () {
      return this.memberInfoList;
    };
    Msg.Elem.GroupTip.prototype.getGroupMemberNum = function () {
      return this.groupMemberNum;
    };
    Msg.Elem.GroupTip.prototype.setGroupMemberNum = function (groupMemberNum) {
      return this.groupMemberNum = groupMemberNum;
    };
    Msg.Elem.GroupTip.prototype.toHtml = function () {
      var text = "[群提示消息]";
      var maxIndex = GROUP_TIP_MAX_USER_COUNT - 1;
      switch (this.opType) {
        case GROUP_TIP_TYPE.JOIN: //加入群
          text += this.opUserId + "邀请了";
          for (var m in this.userIdList) {
            text += this.userIdList[m] + ",";
            if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.userIdList.length + "人";
              break;
            }
          }
          text += "加入该群";
          break;
        case GROUP_TIP_TYPE.QUIT: //退出群
          text += this.opUserId + "主动退出该群";
          break;
        case GROUP_TIP_TYPE.KICK: //踢出群
          text += this.opUserId + "将";
          for (var m in this.userIdList) {
            text += this.userIdList[m] + ",";
            if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.userIdList.length + "人";
              break;
            }
          }
          text += "踢出该群";
          break;
        case GROUP_TIP_TYPE.SET_ADMIN: //设置管理员
          text += this.opUserId + "将";
          for (var m in this.userIdList) {
            text += this.userIdList[m] + ",";
            if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.userIdList.length + "人";
              break;
            }
          }
          text += "设为管理员";
          break;
        case GROUP_TIP_TYPE.CANCEL_ADMIN: //取消管理员
          text += this.opUserId + "取消";
          for (var m in this.userIdList) {
            text += this.userIdList[m] + ",";
            if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.userIdList.length + "人";
              break;
            }
          }
          text += "的管理员资格";
          break;


        case GROUP_TIP_TYPE.MODIFY_GROUP_INFO: //群资料变更
          text += this.opUserId + "修改了群资料：";
          for (var m in this.groupInfoList) {
            var type = this.groupInfoList[m].getType();
            var value = this.groupInfoList[m].getValue();
            switch (type) {
              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
                text += "群头像为" + value + "; ";
                break;
              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
                text += "群名称为" + value + "; ";
                break;
              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
                text += "群主为" + value + "; ";
                break;
              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
                text += "群公告为" + value + "; ";
                break;
              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
                text += "群简介为" + value + "; ";
                break;
              default:
                text += "未知信息为:type=" + type + ",value=" + value + "; ";
                break;}

          }
          break;

        case GROUP_TIP_TYPE.MODIFY_MEMBER_INFO: //群成员资料变更(禁言时间)
          text += this.opUserId + "修改了群成员资料:";
          for (var m in this.memberInfoList) {
            var userId = this.memberInfoList[m].getUserId();
            var shutupTime = this.memberInfoList[m].getShutupTime();
            text += userId + ": ";
            if (shutupTime != null && shutupTime !== undefined) {
              if (shutupTime == 0) {
                text += "取消禁言; ";
              } else {
                text += "禁言" + shutupTime + "秒; ";
              }
            } else {
              text += " shutupTime为空";
            }
            if (this.memberInfoList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.memberInfoList.length + "人";
              break;
            }
          }
          break;

        case GROUP_TIP_TYPE.READED: //消息已读
          /**/
          Log.info("消息已读同步");
          break;
        default:
          text += "未知群提示消息类型：type=" + this.opType;
          break;}

      return text;
    };

    // class Msg.Elem.GroupTip.GroupInfo，变更的群资料信息对象
    Msg.Elem.GroupTip.GroupInfo = function (type, value) {
      this.type = type; //群资料信息类型
      this.value = value; //对应的值
    };
    Msg.Elem.GroupTip.GroupInfo.prototype.getType = function () {
      return this.type;
    };
    Msg.Elem.GroupTip.GroupInfo.prototype.getValue = function () {
      return this.value;
    };

    // class Msg.Elem.GroupTip.MemberInfo，变更的群成员资料信息对象
    Msg.Elem.GroupTip.MemberInfo = function (userId, shutupTime) {
      this.userId = userId; //群成员id
      this.shutupTime = shutupTime; //群成员被禁言时间，0表示取消禁言，大于0表示被禁言时长，单位：秒
    };
    Msg.Elem.GroupTip.MemberInfo.prototype.getUserId = function () {
      return this.userId;
    };
    Msg.Elem.GroupTip.MemberInfo.prototype.getShutupTime = function () {
      return this.shutupTime;
    };

    // 自定义消息类型 class Msg.Elem.Custom
    Msg.Elem.Custom = function (data, desc, ext) {
      this.data = data; //数据
      this.desc = desc; //描述
      this.ext = ext; //扩展字段
    };
    Msg.Elem.Custom.prototype.getData = function () {
      return this.data;
    };
    Msg.Elem.Custom.prototype.getDesc = function () {
      return this.desc;
    };
    Msg.Elem.Custom.prototype.getExt = function () {
      return this.ext;
    };
    Msg.Elem.Custom.prototype.toHtml = function () {
      return this.data;
    };

    // singleton object MsgStore
    var MsgStore = new function () {
      var sessMap = {}; //跟所有用户或群的聊天记录MAP
      var sessTimeline = []; //按时间降序排列的会话列表
      msgCache = {}; //消息缓存，用于判重
      //C2C
      this.cookie = ""; //上一次拉取新c2c消息的cookie
      this.syncFlag = 0; //上一次拉取新c2c消息的是否继续拉取标记

      var visitSess = function visitSess(visitor) {
        for (var i in sessMap) {
          visitor(sessMap[i]);
        }
      };
      // window.msgCache = msgCache;
      //消息查重
      var checkDupMsg = function checkDupMsg(msg) {
        var dup = false;
        var first_key = msg.sess._impl.skey;
        var second_key = msg.isSend + msg.seq + msg.random;
        var tempMsg = msgCache[first_key] && msgCache[first_key][second_key];
        if (tempMsg) {
          dup = true;
        }
        if (msgCache[first_key]) {
          msgCache[first_key][second_key] = { time: msg.time };
        } else {
          msgCache[first_key] = {};
          msgCache[first_key][second_key] = { time: msg.time };
        }
        return dup;
      };

      this.sessMap = function () {
        return sessMap;
      };
      this.sessCount = function () {
        return sessTimeline.length;
      };
      this.sessByTypeId = function (type, id) {
        var skey = Session.skey(type, id);
        if (skey === undefined || skey == null) return null;
        return sessMap[skey];
      };
      this.delSessByTypeId = function (type, id) {
        var skey = Session.skey(type, id);
        if (skey === undefined || skey == null) return false;
        if (sessMap[skey]) {
          delete sessMap[skey];
          delete msgCache[skey];
        }
        return true;
      };
      this.resetCookieAndSyncFlag = function () {
        this.cookie = "";
        this.syncFlag = 0;
      };

      //切换将当前会话的自动读取消息标志为isOn,重置其他会话的自动读取消息标志为false
      this.setAutoRead = function (selSess, isOn, isResetAll) {
        if (isResetAll)
        visitSess(function (s) {
          s._impl.isAutoRead = false;
        });
        if (selSess) {
          selSess._impl.isAutoRead = isOn; //
          if (isOn) {//是否调用已读上报接口
            selSess._impl.unread = 0;

            if (selSess._impl.type == SESSION_TYPE.C2C) {//私聊消息已读上报
              var tmpC2CMsgReadedItem = [];
              tmpC2CMsgReadedItem.push(new C2CMsgReadedItem(selSess._impl.id, selSess._impl.time));
              //调用C2C消息已读上报接口
              proto_c2CMsgReaded(MsgStore.cookie,
              tmpC2CMsgReadedItem,
              function (resp) {
                log.info("[setAutoRead]: c2CMsgReaded success");
              },
              function (err) {
                log.error("[setAutoRead}: c2CMsgReaded failed:" + err.ErrorInfo);
              });
            } else if (selSess._impl.type == SESSION_TYPE.GROUP) {//群聊消息已读上报
              var tmpOpt = {
                'GroupId': selSess._impl.id,
                'MsgReadedSeq': selSess._impl.curMaxMsgSeq };

              //调用group消息已读上报接口
              proto_groupMsgReaded(tmpOpt,
              function (resp) {
                log.info("groupMsgReaded success");

              },
              function (err) {
                log.error("groupMsgReaded failed:" + err.ErrorInfo);

              });
            }
          }
        }
      };

      this.c2CMsgReaded = function (opts, cbOk, cbErr) {
        var tmpC2CMsgReadedItem = [];
        tmpC2CMsgReadedItem.push(new C2CMsgReadedItem(opts.To_Account, opts.LastedMsgTime));
        //调用C2C消息已读上报接口
        proto_c2CMsgReaded(MsgStore.cookie,
        tmpC2CMsgReadedItem,
        function (resp) {
          if (cbOk) {
            log.info("c2CMsgReaded success");
            cbOk(resp);
          }
        },
        function (err) {
          if (cbErr) {
            log.error("c2CMsgReaded failed:" + err.ErrorInfo);
            cbErr(err);
          }
        });
      };

      this.addSession = function (sess) {
        sessMap[sess._impl.skey] = sess;
      };
      this.delSession = function (sess) {
        delete sessMap[sess._impl.skey];
      };
      this.addMsg = function (msg) {
        if (checkDupMsg(msg)) return false;
        var sess = msg.sess;
        if (!sessMap[sess._impl.skey]) this.addSession(sess);
        sess._impl_addMsg(msg);
        return true;
      };
      this.updateTimeline = function () {
        var arr = new Array();
        visitSess(function (sess) {
          arr.push(sess);
        });
        arr.sort(function (a, b) {
          return b.time - a.time;
        });
        sessTimeline = arr;
      };
    }();
    // singleton object MsgManager
    var MsgManager = new function () {

      var onMsgCallback = null; //新消息(c2c和group)回调

      var onGroupInfoChangeCallback = null; //群资料变化回调
      //收到新群系统消息回调列表
      var onGroupSystemNotifyCallbacks = {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null,
        "8": null,
        "9": null,
        "10": null,
        "11": null,
        "15": null,
        "255": null,
        "12": null };

      //监听好友系统通知函数
      var onFriendSystemNotifyCallbacks = {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null,
        "8": null };


      var onProfileSystemNotifyCallbacks = {
        "1": null };



      //普通长轮询
      var longPollingOn = false; //是否开启普通长轮询
      var isLongPollingRequesting = false; //是否在长轮询ing
      var notifySeq = 0; //c2c通知seq
      var noticeSeq = 0; //群消息seq

      //大群长轮询
      var onBigGroupMsgCallback = null; //大群消息回调
      var bigGroupLongPollingOn = false; //是否开启长轮询
      var bigGroupLongPollingStartSeq = 0; //请求拉消息的起始seq(大群长轮询)
      var bigGroupLongPollingHoldTime = 90; //客户端长轮询的超时时间，单位是秒(大群长轮询)
      var bigGroupLongPollingKey = null; //客户端加入群组后收到的的Key(大群长轮询)
      var bigGroupLongPollingMsgMap = {}; //记录收到的群消息数
      var onC2cEventCallbacks = {
        "92": null, //消息已读通知,
        "96": null };

      ;
      var onKickedEventCall = null; //多实例登录回调
      var onAppliedDownloadUrl = null;


      var getLostGroupMsgCount = 0; //补拉丢失的群消息次数
      //我的群当前最大的seq
      var myGroupMaxSeqs = {}; //用于补拉丢失的群消息

      var groupSystemMsgsCache = {}; //群组系统消息缓存,用于判重

      //设置长轮询开关
      //isOn=true 开启
      //isOn=false 停止
      this.setLongPollingOn = function (isOn) {
        longPollingOn = isOn;
      };
      this.getLongPollingOn = function () {
        return longPollingOn;
      };

      //重置长轮询变量
      this.resetLongPollingInfo = function () {
        longPollingOn = false;
        notifySeq = 0;
        noticeSeq = 0;
      };

      //设置大群长轮询开关
      //isOn=true 开启
      //isOn=false 停止
      this.setBigGroupLongPollingOn = function (isOn) {
        bigGroupLongPollingOn = isOn;
      };
      //设置大群长轮询key
      this.setBigGroupLongPollingKey = function (key) {
        bigGroupLongPollingKey = key;
      };
      //重置大群长轮询变量
      this.resetBigGroupLongPollingInfo = function () {
        bigGroupLongPollingOn = false;
        bigGroupLongPollingStartSeq = 0;
        bigGroupLongPollingKey = null;
        bigGroupLongPollingMsgMap = {};
      };

      //设置群消息数据条数
      this.setBigGroupLongPollingMsgMap = function (groupId, count) {
        var bigGroupLongPollingMsgCount = bigGroupLongPollingMsgMap[groupId];
        if (bigGroupLongPollingMsgCount) {
          bigGroupLongPollingMsgCount = parseInt(bigGroupLongPollingMsgCount) + count;
          bigGroupLongPollingMsgMap[groupId] = bigGroupLongPollingMsgCount;
        } else {
          bigGroupLongPollingMsgMap[groupId] = count;
        }
      };

      //重置
      this.clear = function () {

        onGroupInfoChangeCallback = null;
        onGroupSystemNotifyCallbacks = {
          "1": null, //申请加群请求（只有管理员会收到）
          "2": null, //申请加群被同意（只有申请人能够收到）
          "3": null, //申请加群被拒绝（只有申请人能够收到）
          "4": null, //被管理员踢出群(只有被踢者接收到)
          "5": null, //群被解散(全员接收)
          "6": null, //创建群(创建者接收)
          "7": null, //邀请加群(被邀请者接收)
          "8": null, //主动退群(主动退出者接收)
          "9": null, //设置管理员(被设置者接收)
          "10": null, //取消管理员(被取消者接收)
          "11": null, //群已被回收(全员接收)
          "15": null, //群已被回收(全员接收)
          "255": null, //用户自定义通知(默认全员接收)
          "12": null //邀请加群(被邀请者需要同意)
        };
        onFriendSystemNotifyCallbacks = {
          "1": null, //好友表增加
          "2": null, //好友表删除
          "3": null, //未决增加
          "4": null, //未决删除
          "5": null, //黑名单增加
          "6": null, //黑名单删除
          "7": null, //未决已读上报
          "8": null //好友信息(备注，分组)变更
        };
        onProfileSystemNotifyCallbacks = {
          "1": null //资料修改
        };
        //重置普通长轮询参数
        onMsgCallback = null;
        longPollingOn = false;
        notifySeq = 0; //c2c新消息通知seq
        noticeSeq = 0; //group新消息seq

        //重置大群长轮询参数
        onBigGroupMsgCallback = null;
        bigGroupLongPollingOn = false;
        bigGroupLongPollingStartSeq = 0;
        bigGroupLongPollingKey = null;
        bigGroupLongPollingMsgMap = {};

        groupSystemMsgsCache = {};

        ipList = []; //文件下载地址
        authkey = null; //文件下载票据
        expireTime = null; //票据超时时间
      };

      //初始化文件下载ip和票据
      var initIpAndAuthkey = function initIpAndAuthkey(cbOk, cbErr) {
        proto_getIpAndAuthkey(function (resp) {
          ipList = resp.IpList;
          authkey = resp.AuthKey;
          expireTime = resp.ExpireTime;
          if (cbOk) cbOk(resp);
        },
        function (err) {
          log.error("initIpAndAuthkey failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });

      };

      //初始化我的群当前最大的seq，用于补拉丢失的群消息
      var initMyGroupMaxSeqs = function initMyGroupMaxSeqs(cbOk, cbErr) {
        var opts = {
          'Member_Account': ctx.identifier,
          'Limit': 1000,
          'Offset': 0,
          'GroupBaseInfoFilter': [
          'NextMsgSeq'] };


        proto_getJoinedGroupListHigh(opts, function (resp) {
          if (!resp.GroupIdList || resp.GroupIdList.length == 0) {
            log.info("initMyGroupMaxSeqs: 目前还没有加入任何群组");
            if (cbOk) cbOk(resp);
            return;
          }
          for (var i = 0; i < resp.GroupIdList.length; i++) {
            var group_id = resp.GroupIdList[i].GroupId;
            var curMaxSeq = resp.GroupIdList[i].NextMsgSeq - 1;
            myGroupMaxSeqs[group_id] = curMaxSeq;
          }

          if (cbOk) cbOk(resp);

        },
        function (err) {
          log.error("initMyGroupMaxSeqs failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });

      };

      //补拉群消息
      var getLostGroupMsgs = function getLostGroupMsgs(groupId, reqMsgSeq, reqMsgNumber) {
        getLostGroupMsgCount++;
        //发起一个拉群群消息请求
        var tempOpts = {
          'GroupId': groupId,
          'ReqMsgSeq': reqMsgSeq,
          'ReqMsgNumber': reqMsgNumber };

        //发起一个拉群群消息请求
        log.warn("第" + getLostGroupMsgCount + "次补齐群消息,参数=" + JSON.stringify(tempOpts));
        MsgManager.syncGroupMsgs(tempOpts);
      };

      //更新群当前最大消息seq
      var updateMyGroupCurMaxSeq = function updateMyGroupCurMaxSeq(groupId, msgSeq) {
        //更新myGroupMaxSeqs中的群最大seq
        var curMsgSeq = myGroupMaxSeqs[groupId];
        if (curMsgSeq) {//如果存在，比较大小
          if (msgSeq > curMsgSeq) {
            myGroupMaxSeqs[groupId] = msgSeq;
          }
        } else {//不存在，新增
          myGroupMaxSeqs[groupId] = msgSeq;
        }
      };

      //添加群消息列表
      var addGroupMsgList = function addGroupMsgList(msgs, new_group_msgs) {
        for (var p in msgs) {
          var newGroupMsg = msgs[p];
          //发群消息时，长轮询接口会返回用户自己发的群消息
          //if(newGroupMsg.From_Account && newGroupMsg.From_Account!=ctx.identifier ){
          if (newGroupMsg.From_Account) {
            //false-不是主动拉取的历史消息
            //true-需要保存到sdk本地session,并且需要判重
            var msg = handlerGroupMsg(newGroupMsg, false, true);
            if (msg) {//不为空，加到新消息里
              new_group_msgs.push(msg);
            }
            //更新myGroupMaxSeqs中的群最大seq
            updateMyGroupCurMaxSeq(newGroupMsg.ToGroupId, newGroupMsg.MsgSeq);
          }
        }
        return new_group_msgs;
      };

      //处理收到的群普通和提示消息
      var handlerOrdinaryAndTipC2cMsgs = function handlerOrdinaryAndTipC2cMsgs(eventType, groupMsgArray) {
        var groupMsgMap = {}; //保存收到的C2c消息信息（群号，最小，最大消息seq，消息列表）
        var new_group_msgs = [];
        var minGroupMsgSeq = 99999999;
        var maxGroupMsgSeq = -1;
        for (var j in groupMsgArray) {

          var groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId];
          if (!groupMsgs) {
            groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId] = {
              "min": minGroupMsgSeq, //收到新消息最小seq
              "max": maxGroupMsgSeq, //收到新消息最大seq
              "msgs": [] //收到的新消息
            };
          }
          //更新长轮询的群NoticeSeq
          if (groupMsgArray[j].NoticeSeq > noticeSeq) {
            log.warn("noticeSeq=" + noticeSeq + ",msgNoticeSeq=" + groupMsgArray[j].NoticeSeq);
            noticeSeq = groupMsgArray[j].NoticeSeq;
          }
          groupMsgArray[j].Event = eventType;
          groupMsgMap[groupMsgArray[j].ToGroupId].msgs.push(groupMsgArray[j]); //新增一条消息
          if (groupMsgArray[j].MsgSeq < groupMsgs.min) {//记录最小的消息seq
            groupMsgMap[groupMsgArray[j].ToGroupId].min = groupMsgArray[j].MsgSeq;
          }
          if (groupMsgArray[j].MsgSeq > groupMsgs.max) {//记录最大的消息seq
            groupMsgMap[groupMsgArray[j].ToGroupId].max = groupMsgArray[j].MsgSeq;
          }
        }

        for (var groupId in groupMsgMap) {
          var tempCount = groupMsgMap[groupId].max - groupMsgMap[groupId].min + 1; //收到的新的群消息数
          var curMaxMsgSeq = myGroupMaxSeqs[groupId]; //获取本地保存的群最大消息seq
          if (curMaxMsgSeq) {//存在这个群的最大消息seq
            //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
            //1、如果收到的新消息最小seq比当前最大群消息seq大于1，则表示收到的群消息发生跳跃，需要补齐
            //2、收到的新群消息seq存在不连续情况，也需要补齐
            if (groupMsgMap[groupId].min - curMaxMsgSeq > 1 || groupMsgMap[groupId].msgs.length < tempCount) {
              //发起一个拉群群消息请求
              log.warn("发起一次补齐群消息请求,curMaxMsgSeq=" + curMaxMsgSeq + ", minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
              getLostGroupMsgs(groupId, groupMsgMap[groupId].max, groupMsgMap[groupId].max - curMaxMsgSeq);
              //更新myGroupMaxSeqs中的群最大seq
              updateMyGroupCurMaxSeq(groupId, groupMsgMap[groupId].max);
            } else {
              new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
            }
          } else {//不存在该群的最大消息seq
            log.warn("不存在该群的最大消息seq，群id=" + groupId);
            //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
            //1、收到的新群消息seq存在不连续情况，也需要补齐
            if (groupMsgMap[groupId].msgs.length < tempCount) {
              //发起一个拉群群消息请求
              log.warn("发起一次补齐群消息请求,minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
              getLostGroupMsgs(groupId, groupMsgMap[groupId].max, tempCount);
              //更新myGroupMaxSeqs中的群最大seq
              updateMyGroupCurMaxSeq(groupId, groupMsgMap[groupId].max);
            } else {
              new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
            }
          }
        }
        if (new_group_msgs.length) {
          MsgStore.updateTimeline();
        }
        if (onMsgCallback && new_group_msgs.length) onMsgCallback(new_group_msgs);

      };

      //处理收到的群普通和提示消息
      var handlerOrdinaryAndTipGroupMsgs = function handlerOrdinaryAndTipGroupMsgs(eventType, groupMsgArray) {
        var groupMsgMap = {}; //保存收到的群消息信息（群号，最小，最大消息seq，消息列表）
        var new_group_msgs = [];
        var minGroupMsgSeq = 99999999;
        var maxGroupMsgSeq = -1;
        for (var j in groupMsgArray) {

          var groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId];
          if (!groupMsgs) {
            groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId] = {
              "min": minGroupMsgSeq, //收到新消息最小seq
              "max": maxGroupMsgSeq, //收到新消息最大seq
              "msgs": [] //收到的新消息
            };
          }
          //更新长轮询的群NoticeSeq
          if (groupMsgArray[j].NoticeSeq > noticeSeq) {
            log.warn("noticeSeq=" + noticeSeq + ",msgNoticeSeq=" + groupMsgArray[j].NoticeSeq);
            noticeSeq = groupMsgArray[j].NoticeSeq;
          }
          groupMsgArray[j].Event = eventType;
          groupMsgMap[groupMsgArray[j].ToGroupId].msgs.push(groupMsgArray[j]); //新增一条消息
          if (groupMsgArray[j].MsgSeq < groupMsgs.min) {//记录最小的消息seq
            groupMsgMap[groupMsgArray[j].ToGroupId].min = groupMsgArray[j].MsgSeq;
          }
          if (groupMsgArray[j].MsgSeq > groupMsgs.max) {//记录最大的消息seq
            groupMsgMap[groupMsgArray[j].ToGroupId].max = groupMsgArray[j].MsgSeq;
          }
        }

        for (var groupId in groupMsgMap) {
          var tempCount = groupMsgMap[groupId].max - groupMsgMap[groupId].min + 1; //收到的新的群消息数
          var curMaxMsgSeq = myGroupMaxSeqs[groupId]; //获取本地保存的群最大消息seq
          if (curMaxMsgSeq) {//存在这个群的最大消息seq
            //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
            //1、如果收到的新消息最小seq比当前最大群消息seq大于1，则表示收到的群消息发生跳跃，需要补齐
            //2、收到的新群消息seq存在不连续情况，也需要补齐
            if (groupMsgMap[groupId].min - curMaxMsgSeq > 1 || groupMsgMap[groupId].msgs.length < tempCount) {
              //发起一个拉群群消息请求
              log.warn("发起一次补齐群消息请求,curMaxMsgSeq=" + curMaxMsgSeq + ", minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
              getLostGroupMsgs(groupId, groupMsgMap[groupId].max, groupMsgMap[groupId].max - curMaxMsgSeq);
              //更新myGroupMaxSeqs中的群最大seq
              updateMyGroupCurMaxSeq(groupId, groupMsgMap[groupId].max);
            } else {
              new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
            }
          } else {//不存在该群的最大消息seq
            log.warn("不存在该群的最大消息seq，群id=" + groupId);
            //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
            //1、收到的新群消息seq存在不连续情况，也需要补齐
            if (groupMsgMap[groupId].msgs.length < tempCount) {
              //发起一个拉群群消息请求
              log.warn("发起一次补齐群消息请求,minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
              getLostGroupMsgs(groupId, groupMsgMap[groupId].max, tempCount);
              //更新myGroupMaxSeqs中的群最大seq
              updateMyGroupCurMaxSeq(groupId, groupMsgMap[groupId].max);
            } else {
              new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
            }
          }
        }
        if (new_group_msgs.length) {
          MsgStore.updateTimeline();
        }
        if (onMsgCallback && new_group_msgs.length) onMsgCallback(new_group_msgs);

      };

      //处理新的群提示消息
      var handlerGroupTips = function handlerGroupTips(groupTips) {
        var new_group_msgs = [];
        for (var o in groupTips) {
          var groupTip = groupTips[o];
          //添加event字段
          groupTip.Event = LONG_POLLINNG_EVENT_TYPE.GROUP_TIP;
          //更新群消息通知seq
          if (groupTip.NoticeSeq > noticeSeq) {
            noticeSeq = groupTip.NoticeSeq;
          }
          var msg = handlerGroupMsg(groupTip, false, true);
          if (msg) {
            new_group_msgs.push(msg);
          }
        }
        if (new_group_msgs.length) {
          MsgStore.updateTimeline();
        }
        if (onMsgCallback && new_group_msgs.length) onMsgCallback(new_group_msgs);
      };

      //处理新的群系统消息
      //isNeedValidRepeatMsg 是否需要判重
      var handlerGroupSystemMsgs = function handlerGroupSystemMsgs(groupSystemMsgs, isNeedValidRepeatMsg) {
        for (var k in groupSystemMsgs) {
          var groupTip = groupSystemMsgs[k];
          var groupReportTypeMsg = groupTip.MsgBody;
          var reportType = groupReportTypeMsg.ReportType;
          //当长轮询返回的群系统消息，才需要更新群消息通知seq
          if (isNeedValidRepeatMsg == false && groupTip.NoticeSeq && groupTip.NoticeSeq > noticeSeq) {
            noticeSeq = groupTip.NoticeSeq;
          }
          var toAccount = groupTip.GroupInfo.To_Account;
          //过滤本不应该给自己的系统消息
          /*if (!toAccount || toAccount != ctx.identifier) {
          log.error("收到本不应该给自己的系统消息: To_Account=" + toAccount);
          continue;
          }*/
          if (isNeedValidRepeatMsg) {
            //var key=groupTip.ToGroupId+"_"+reportType+"_"+groupTip.MsgTimeStamp+"_"+groupReportTypeMsg.Operator_Account;
            var key = groupTip.ToGroupId + "_" + reportType + "_" + groupReportTypeMsg.Operator_Account;
            var isExist = groupSystemMsgsCache[key];
            if (isExist) {
              log.warn("收到重复的群系统消息：key=" + key);
              continue;
            }
            groupSystemMsgsCache[key] = true;
          }

          var notify = {
            "SrcFlag": 0,
            "ReportType": reportType,
            "GroupId": groupTip.ToGroupId,
            "GroupName": groupTip.GroupInfo.GroupName,
            "Operator_Account": groupReportTypeMsg.Operator_Account,
            "MsgTime": groupTip.MsgTimeStamp,
            "groupReportTypeMsg": groupReportTypeMsg };

          switch (reportType) {
            case GROUP_SYSTEM_TYPE.JOIN_GROUP_REQUEST: //申请加群(只有管理员会接收到)
              notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
              notify["MsgKey"] = groupReportTypeMsg.MsgKey;
              notify["Authentication"] = groupReportTypeMsg.Authentication;
              notify["UserDefinedField"] = groupTip.UserDefinedField;
              notify["From_Account"] = groupTip.From_Account;
              notify["MsgSeq"] = groupTip.ClientSeq;
              notify["MsgRandom"] = groupTip.MsgRandom;
              break;
            case GROUP_SYSTEM_TYPE.JOIN_GROUP_ACCEPT: //申请加群被同意(只有申请人自己接收到)
            case GROUP_SYSTEM_TYPE.JOIN_GROUP_REFUSE: //申请加群被拒绝(只有申请人自己接收到)
              notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
              break;
            case GROUP_SYSTEM_TYPE.KICK: //被管理员踢出群(只有被踢者接收到)
            case GROUP_SYSTEM_TYPE.DESTORY: //群被解散(全员接收)
            case GROUP_SYSTEM_TYPE.CREATE: //创建群(创建者接收, 不展示)
            case GROUP_SYSTEM_TYPE.INVITED_JOIN_GROUP_REQUEST: //邀请加群(被邀请者接收)
            case GROUP_SYSTEM_TYPE.INVITED_JOIN_GROUP_REQUEST_AGREE: //邀请加群(被邀请者需同意)
            case GROUP_SYSTEM_TYPE.QUIT: //主动退群(主动退出者接收, 不展示)
            case GROUP_SYSTEM_TYPE.SET_ADMIN: //群设置管理员(被设置者接收)
            case GROUP_SYSTEM_TYPE.CANCEL_ADMIN: //取消管理员(被取消者接收)
            case GROUP_SYSTEM_TYPE.REVOKE: //群已被回收(全员接收, 不展示)
              break;
            case GROUP_SYSTEM_TYPE.READED: //群消息已读同步
              break;
            case GROUP_SYSTEM_TYPE.CUSTOM: //用户自定义通知(默认全员接收)
              notify["MsgSeq"] = groupTip.MsgSeq;
              notify["UserDefinedField"] = groupReportTypeMsg.UserDefinedField;
              break;
            default:
              log.error("未知群系统消息类型：reportType=" + reportType);
              break;}


          if (isNeedValidRepeatMsg) {
            if (reportType == GROUP_SYSTEM_TYPE.JOIN_GROUP_REQUEST) {
              //回调
              if (onGroupSystemNotifyCallbacks[reportType]) onGroupSystemNotifyCallbacks[reportType](notify);
            }
          } else {
            //回调
            if (onGroupSystemNotifyCallbacks[reportType]) {
              if (reportType == GROUP_SYSTEM_TYPE.READED) {
                var arr = notify.groupReportTypeMsg.GroupReadInfoArray;
                for (var i = 0, l = arr.length; i < l; i++) {
                  var item = arr[i];
                  onGroupSystemNotifyCallbacks[reportType](item);
                }
              } else {
                onGroupSystemNotifyCallbacks[reportType](notify);
              }
            }
          }
        } //loop
      };


      //处理新的好友系统通知
      //isNeedValidRepeatMsg 是否需要判重
      var handlerFriendSystemNotices = function handlerFriendSystemNotices(friendSystemNotices, isNeedValidRepeatMsg) {
        var friendNotice, type, notify;
        for (var k in friendSystemNotices) {
          friendNotice = friendSystemNotices[k];
          type = friendNotice.PushType;
          //当长轮询返回的群系统消息，才需要更新通知seq
          if (isNeedValidRepeatMsg == false && friendNotice.NoticeSeq && friendNotice.NoticeSeq > noticeSeq) {
            noticeSeq = friendNotice.NoticeSeq;
          }
          notify = { 'Type': type };
          switch (type) {
            case FRIEND_NOTICE_TYPE.FRIEND_ADD: //好友表增加
              notify["Accounts"] = friendNotice.FriendAdd_Account;
              break;
            case FRIEND_NOTICE_TYPE.FRIEND_DELETE: //好友表删除
              notify["Accounts"] = friendNotice.FriendDel_Account;
              break;
            case FRIEND_NOTICE_TYPE.PENDENCY_ADD: //未决增加
              notify["PendencyList"] = friendNotice.PendencyAdd;
              break;
            case FRIEND_NOTICE_TYPE.PENDENCY_DELETE: //未决删除
              notify["Accounts"] = friendNotice.FrienPencydDel_Account;
              break;
            case FRIEND_NOTICE_TYPE.BLACK_LIST_ADD: //黑名单增加
              notify["Accounts"] = friendNotice.BlackListAdd_Account;
              break;
            case FRIEND_NOTICE_TYPE.BLACK_LIST_DELETE: //黑名单删除
              notify["Accounts"] = friendNotice.BlackListDel_Account;
              break;
            /*case FRIEND_NOTICE_TYPE.PENDENCY_REPORT://未决已读上报
                     break;
                     case FRIEND_NOTICE_TYPE.FRIEND_UPDATE://好友数据更新
                     break;
                     */


            default:
              log.error("未知好友系统通知类型：friendNotice=" + JSON.stringify(friendNotice));
              break;}


          if (isNeedValidRepeatMsg) {
            if (type == FRIEND_NOTICE_TYPE.PENDENCY_ADD) {
              //回调
              if (onFriendSystemNotifyCallbacks[type]) onFriendSystemNotifyCallbacks[type](notify);
            }
          } else {
            //回调
            if (onFriendSystemNotifyCallbacks[type]) onFriendSystemNotifyCallbacks[type](notify);
          }
        } //loop
      };

      //处理新的资料系统通知
      //isNeedValidRepeatMsg 是否需要判重
      var handlerProfileSystemNotices = function handlerProfileSystemNotices(profileSystemNotices, isNeedValidRepeatMsg) {
        var profileNotice, type, notify;
        for (var k in profileSystemNotices) {
          profileNotice = profileSystemNotices[k];
          type = profileNotice.PushType;
          //当长轮询返回的群系统消息，才需要更新通知seq
          if (isNeedValidRepeatMsg == false && profileNotice.NoticeSeq && profileNotice.NoticeSeq > noticeSeq) {
            noticeSeq = profileNotice.NoticeSeq;
          }
          notify = { 'Type': type };
          switch (type) {
            case PROFILE_NOTICE_TYPE.PROFILE_MODIFY: //资料修改
              notify["Profile_Account"] = profileNotice.Profile_Account;
              notify["ProfileList"] = profileNotice.ProfileList;
              break;
            default:
              log.error("未知资料系统通知类型：profileNotice=" + JSON.stringify(profileNotice));
              break;}


          if (isNeedValidRepeatMsg) {
            if (type == PROFILE_NOTICE_TYPE.PROFILE_MODIFY) {
              //回调
              if (onProfileSystemNotifyCallbacks[type]) onProfileSystemNotifyCallbacks[type](notify);
            }
          } else {
            //回调
            if (onProfileSystemNotifyCallbacks[type]) onProfileSystemNotifyCallbacks[type](notify);
          }
        } //loop
      };

      //处理新的群系统消息(用于直播大群长轮询)
      var handlerGroupSystemMsg = function handlerGroupSystemMsg(groupTip) {
        var groupReportTypeMsg = groupTip.MsgBody;
        var reportType = groupReportTypeMsg.ReportType;
        var toAccount = groupTip.GroupInfo.To_Account;
        //过滤本不应该给自己的系统消息
        //if(!toAccount || toAccount!=ctx.identifier){
        //    log.error("收到本不应该给自己的系统消息: To_Account="+toAccount);
        //    continue;
        //}
        var notify = {
          "SrcFlag": 1,
          "ReportType": reportType,
          "GroupId": groupTip.ToGroupId,
          "GroupName": groupTip.GroupInfo.GroupName,
          "Operator_Account": groupReportTypeMsg.Operator_Account,
          "MsgTime": groupTip.MsgTimeStamp };

        switch (reportType) {
          case GROUP_SYSTEM_TYPE.JOIN_GROUP_REQUEST: //申请加群(只有管理员会接收到)
            notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
            notify["MsgKey"] = groupReportTypeMsg.MsgKey;
            notify["Authentication"] = groupReportTypeMsg.Authentication;
            notify["UserDefinedField"] = groupTip.UserDefinedField;
            notify["From_Account"] = groupTip.From_Account;
            notify["MsgSeq"] = groupTip.ClientSeq;
            notify["MsgRandom"] = groupTip.MsgRandom;
            break;
          case GROUP_SYSTEM_TYPE.JOIN_GROUP_ACCEPT: //申请加群被同意(只有申请人自己接收到)
          case GROUP_SYSTEM_TYPE.JOIN_GROUP_REFUSE: //申请加群被拒绝(只有申请人自己接收到)
            notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
            break;
          case GROUP_SYSTEM_TYPE.KICK: //被管理员踢出群(只有被踢者接收到)
          case GROUP_SYSTEM_TYPE.DESTORY: //群被解散(全员接收)
          case GROUP_SYSTEM_TYPE.CREATE: //创建群(创建者接收, 不展示)
          case GROUP_SYSTEM_TYPE.INVITED_JOIN_GROUP_REQUEST: //邀请加群(被邀请者接收)
          case GROUP_SYSTEM_TYPE.INVITED_JOIN_GROUP_REQUEST_AGREE: //邀请加群(被邀请者需要同意)
          case GROUP_SYSTEM_TYPE.QUIT: //主动退群(主动退出者接收, 不展示)
          case GROUP_SYSTEM_TYPE.SET_ADMIN: //群设置管理员(被设置者接收)
          case GROUP_SYSTEM_TYPE.CANCEL_ADMIN: //取消管理员(被取消者接收)
          case GROUP_SYSTEM_TYPE.REVOKE: //群已被回收(全员接收, 不展示)
            break;
          case GROUP_SYSTEM_TYPE.CUSTOM: //用户自定义通知(默认全员接收)
            notify["MsgSeq"] = groupTip.MsgSeq;
            notify["UserDefinedField"] = groupReportTypeMsg.UserDefinedField;
            break;
          default:
            log.error("未知群系统消息类型：reportType=" + reportType);
            break;}

        //回调
        if (onGroupSystemNotifyCallbacks[reportType]) onGroupSystemNotifyCallbacks[reportType](notify);

      };

      //处理C2C EVENT 消息通道Array
      var handlerC2cNotifyMsgArray = function handlerC2cNotifyMsgArray(arr) {
        for (var i = 0, l = arr.length; i < l; i++) {
          handlerC2cEventMsg(arr[i]);
        }
      };

      //处理C2C EVENT 消息通道Item
      var handlerC2cEventMsg = function handlerC2cEventMsg(notify) {
        var subType = notify.SubMsgType;
        switch (subType) {
          case C2C_EVENT_SUB_TYPE.READED: //已读通知
            // stopPolling = true;
            //回调onMsgReadCallback
            if (notify.ReadC2cMsgNotify.UinPairReadArray && onC2cEventCallbacks[subType]) {
              for (var i = 0, l = notify.ReadC2cMsgNotify.UinPairReadArray.length; i < l; i++) {
                var item = notify.ReadC2cMsgNotify.UinPairReadArray[i];
                onC2cEventCallbacks[subType](item);
              }
            }
            break;
          case C2C_EVENT_SUB_TYPE.KICKEDOUT: //已读通知
            if (onC2cEventCallbacks[subType]) {
              onC2cEventCallbacks[subType]();
            }
            break;
          default:
            log.error("未知C2c系统消息：subType=" + subType);
            break;}


      };

      //长轮询
      this.longPolling = function (cbOk, cbErr) {


        var opts = {
          'Timeout': longPollingDefaultTimeOut / 1000,
          'Cookie': {
            'NotifySeq': notifySeq,
            'NoticeSeq': noticeSeq } };


        if (LongPollingId) {
          opts.Cookie.LongPollingId = LongPollingId;
          doPolling();
        } else {
          proto_getLongPollingId({}, function (resp) {
            LongPollingId = opts.Cookie.LongPollingId = resp.LongPollingId;
            //根据回包设置超时时间，超时时长不能>60秒，因为webkit手机端的最长超时时间不能大于60s
            longPollingDefaultTimeOut = resp.Timeout > 60 ? longPollingDefaultTimeOut : resp.Timeout * 1000;
            doPolling();
          });
        }

        function doPolling() {
          proto_longPolling(opts, function (resp) {
            for (var i in resp.EventArray) {
              var e = resp.EventArray[i];
              switch (e.Event) {
                case LONG_POLLINNG_EVENT_TYPE.C2C: //c2c消息通知
                  //更新C2C消息通知seq
                  notifySeq = e.NotifySeq;
                  log.warn("longpolling: received new c2c msg");
                  //获取新消息
                  MsgManager.syncMsgs();
                  break;
                case LONG_POLLINNG_EVENT_TYPE.GROUP_COMMON: //普通群消息通知
                  log.warn("longpolling: received new group msgs");
                  handlerOrdinaryAndTipGroupMsgs(e.Event, e.GroupMsgArray);
                  break;
                case LONG_POLLINNG_EVENT_TYPE.GROUP_TIP: //（全员广播）群提示消息
                  log.warn("longpolling: received new group tips");
                  handlerOrdinaryAndTipGroupMsgs(e.Event, e.GroupTips);
                  break;
                case LONG_POLLINNG_EVENT_TYPE.GROUP_TIP2: //群提示消息
                  log.warn("longpolling: received new group tips");
                  handlerOrdinaryAndTipGroupMsgs(e.Event, e.GroupTips);
                  break;
                case LONG_POLLINNG_EVENT_TYPE.GROUP_SYSTEM: //（多终端同步）群系统消息
                  log.warn("longpolling: received new group system msgs");
                  //false 表示 通过长轮询收到的群系统消息，可以不判重
                  handlerGroupSystemMsgs(e.GroupTips, false);
                  break;
                case LONG_POLLINNG_EVENT_TYPE.FRIEND_NOTICE: //好友系统通知
                  log.warn("longpolling: received new friend system notice");
                  //false 表示 通过长轮询收到的好友系统通知，可以不判重
                  handlerFriendSystemNotices(e.FriendListMod, false);
                  break;
                case LONG_POLLINNG_EVENT_TYPE.PROFILE_NOTICE: //资料系统通知
                  log.warn("longpolling: received new profile system notice");
                  //false 表示 通过长轮询收到的资料系统通知，可以不判重
                  handlerProfileSystemNotices(e.ProfileDataMod, false);
                  break;
                case LONG_POLLINNG_EVENT_TYPE.C2C_COMMON: //c2c消息通知
                  noticeSeq = e.C2cMsgArray[0].NoticeSeq;
                  //更新C2C消息通知seq
                  log.warn("longpolling: received new c2c_common msg", noticeSeq);
                  handlerOrdinaryAndTipC2cMsgs(e.Event, e.C2cMsgArray);
                  break;
                case LONG_POLLINNG_EVENT_TYPE.C2C_EVENT: //c2c已读消息通知
                  noticeSeq = e.C2cNotifyMsgArray[0].NoticeSeq;
                  log.warn("longpolling: received new c2c_event msg");
                  handlerC2cNotifyMsgArray(e.C2cNotifyMsgArray);
                  break;
                default:
                  log.error("longpolling收到未知新消息类型: Event=" + e.Event);
                  break;}

            }
            var successInfo = {
              'ActionStatus': ACTION_STATUS.OK,
              'ErrorCode': 0 };

            updatecLongPollingStatus(successInfo);
          }, function (err) {
            //log.error(err);
            updatecLongPollingStatus(err);
            if (cbErr) cbErr(err);
          });
        }
      };


      //大群 长轮询
      this.bigGroupLongPolling = function (cbOk, cbErr) {

        var opts = {
          'StartSeq': bigGroupLongPollingStartSeq, //请求拉消息的起始seq
          'HoldTime': bigGroupLongPollingHoldTime, //客户端长轮询的超时时间，单位是秒
          'Key': bigGroupLongPollingKey //客户端加入群组后收到的的Key
        };

        proto_bigGroupLongPolling(opts, function (resp) {

          var msgObjList = [];
          bigGroupLongPollingStartSeq = resp.NextSeq;
          bigGroupLongPollingHoldTime = resp.HoldTime;
          bigGroupLongPollingKey = resp.Key;

          if (resp.RspMsgList && resp.RspMsgList.length > 0) {
            var msgCount = 0,
            msgInfo,event,msg;
            for (var i = resp.RspMsgList.length - 1; i >= 0; i--) {
              msgInfo = resp.RspMsgList[i];
              //如果是已经删除的消息或者发送者帐号为空或者消息内容为空
              //IsPlaceMsg=1
              if (msgInfo.IsPlaceMsg || !msgInfo.From_Account || !msgInfo.MsgBody || msgInfo.MsgBody.length == 0) {
                continue;
              }

              event = msgInfo.Event; //群消息类型
              switch (event) {
                case LONG_POLLINNG_EVENT_TYPE.GROUP_COMMON: //群普通消息
                  log.info("bigGroupLongPolling: return new group msg");
                  msg = handlerGroupMsg(msgInfo, false, false);
                  msg && msgObjList.push(msg);
                  msgCount = msgCount + 1;
                  break;
                case LONG_POLLINNG_EVENT_TYPE.GROUP_TIP: //群提示消息
                case LONG_POLLINNG_EVENT_TYPE.GROUP_TIP2: //群提示消息
                  log.info("bigGroupLongPolling: return new group tip");
                  msg = handlerGroupMsg(msgInfo, false, false);
                  msg && msgObjList.push(msg);
                  //msgCount=msgCount+1;
                  break;
                case LONG_POLLINNG_EVENT_TYPE.GROUP_SYSTEM: //群系统消息
                  log.info("bigGroupLongPolling: new group system msg");
                  handlerGroupSystemMsg(msgInfo);
                  break;
                default:
                  log.error("bigGroupLongPolling收到未知新消息类型: Event=" + event);
                  break;}

            } // for loop
            if (msgCount > 0) {
              MsgManager.setBigGroupLongPollingMsgMap(msgInfo.ToGroupId, msgCount); //
              log.warn("current bigGroupLongPollingMsgMap: " + JSON.stringify(bigGroupLongPollingMsgMap));
            }
          }
          curBigGroupLongPollingRetErrorCount = 0;
          //返回连接状态
          var successInfo = {
            'ActionStatus': ACTION_STATUS.OK,
            'ErrorCode': CONNECTION_STATUS.ON,
            'ErrorInfo': 'connection is ok...' };

          ConnManager.callBack(successInfo);

          if (cbOk) cbOk(msgObjList);else
          if (onBigGroupMsgCallback) onBigGroupMsgCallback(msgObjList); //返回新消息

          //重新启动长轮询
          bigGroupLongPollingOn && MsgManager.bigGroupLongPolling();

        }, function (err) {
          //
          if (err.ErrorCode != longPollingTimeOutErrorCode) {
            log.error(err.ErrorInfo);
            //记录长轮询返回错误次数
            curBigGroupLongPollingRetErrorCount++;
          }
          if (err.ErrorCode == longPollingKickedErrorCode) {
            //登出
            log.error("多实例登录，被kick");
            if (onKickedEventCall) {
              onKickedEventCall();
            }
          }
          //累计超过一定次数，不再发起长轮询请求
          if (curBigGroupLongPollingRetErrorCount < LONG_POLLING_MAX_RET_ERROR_COUNT) {
            bigGroupLongPollingOn && MsgManager.bigGroupLongPolling();
          } else {
            var errInfo = {
              'ActionStatus': ACTION_STATUS.FAIL,
              'ErrorCode': CONNECTION_STATUS.OFF,
              'ErrorInfo': 'connection is off' };

            ConnManager.callBack(errInfo);
          }
          if (cbErr) cbErr(err);

        }, bigGroupLongPollingHoldTime * 1000);
      };

      //更新连接状态
      var updatecLongPollingStatus = function updatecLongPollingStatus(errObj) {
        if (errObj.ErrorCode == 0 || errObj.ErrorCode == longPollingTimeOutErrorCode) {
          curLongPollingRetErrorCount = 0;
          longPollingOffCallbackFlag = false;
          var errorInfo;
          var isNeedCallback = false;
          switch (curLongPollingStatus) {
            case CONNECTION_STATUS.INIT:
              isNeedCallback = true;
              curLongPollingStatus = CONNECTION_STATUS.ON;
              errorInfo = "create connection successfully(INIT->ON)";
              break;
            case CONNECTION_STATUS.ON:
              errorInfo = "connection is on...(ON->ON)";
              break;
            case CONNECTION_STATUS.RECONNECT:
              curLongPollingStatus = CONNECTION_STATUS.ON;
              errorInfo = "connection is on...(RECONNECT->ON)";
              break;
            case CONNECTION_STATUS.OFF:
              isNeedCallback = true;
              curLongPollingStatus = CONNECTION_STATUS.RECONNECT;
              errorInfo = "reconnect successfully(OFF->RECONNECT)";
              break;}

          var successInfo = {
            'ActionStatus': ACTION_STATUS.OK,
            'ErrorCode': curLongPollingStatus,
            'ErrorInfo': errorInfo };

          isNeedCallback && ConnManager.callBack(successInfo);
          longPollingOn && MsgManager.longPolling();
        } else if (errObj.ErrorCode == longPollingKickedErrorCode) {
          //登出
          log.error("多实例登录，被kick");
          if (onKickedEventCall) {
            onKickedEventCall();
          }
        } else {
          //记录长轮询返回解析json错误次数
          curLongPollingRetErrorCount++;
          log.warn("longPolling接口第" + curLongPollingRetErrorCount + "次报错: " + errObj.ErrorInfo);
          //累计超过一定次数
          if (curLongPollingRetErrorCount <= LONG_POLLING_MAX_RET_ERROR_COUNT) {
            setTimeout(startNextLongPolling, 100); //
          } else {
            curLongPollingStatus = CONNECTION_STATUS.OFF;
            var errInfo = {
              'ActionStatus': ACTION_STATUS.FAIL,
              'ErrorCode': CONNECTION_STATUS.OFF,
              'ErrorInfo': 'connection is off' };

            longPollingOffCallbackFlag == false && ConnManager.callBack(errInfo);
            longPollingOffCallbackFlag = true;
            log.warn(longPollingIntervalTime + "毫秒之后,SDK会发起新的longPolling请求...");
            setTimeout(startNextLongPolling, longPollingIntervalTime); //长轮询接口报错次数达到一定值，每间隔5s发起新的长轮询
          }
        }
      };

      //处理收到的普通C2C消息
      var handlerOrdinaryAndTipC2cMsgs = function handlerOrdinaryAndTipC2cMsgs(eventType, C2cMsgArray) {
        //处理c2c消息
        var notifyInfo = [];
        var msgInfos = [];
        msgInfos = C2cMsgArray; //返回的消息列表
        // MsgStore.cookie = resp.Cookie;//cookies，记录当前读到的最新消息位置

        for (var i in msgInfos) {
          var msgInfo = msgInfos[i];
          var isSendMsg, id, headUrl;
          if (msgInfo.From_Account == ctx.identifier) {//当前用户发送的消息
            isSendMsg = true;
            id = msgInfo.To_Account; //读取接收者信息
            headUrl = '';
          } else {//当前用户收到的消息
            isSendMsg = false;
            id = msgInfo.From_Account; //读取发送者信息
            headUrl = '';
          }
          var sess = MsgStore.sessByTypeId(SESSION_TYPE.C2C, id);
          if (!sess) {
            sess = new Session(SESSION_TYPE.C2C, id, id, headUrl, 0, 0);
          }
          var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account);
          var msgBody = null;
          var msgContent = null;
          var msgType = null;
          for (var mi in msgInfo.MsgBody) {
            msgBody = msgInfo.MsgBody[mi];
            msgType = msgBody.MsgType;
            switch (msgType) {
              case MSG_ELEMENT_TYPE.TEXT:
                msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
                break;
              case MSG_ELEMENT_TYPE.FACE:
                msgContent = new Msg.Elem.Face(
                msgBody.MsgContent.Index,
                msgBody.MsgContent.Data);

                break;
              case MSG_ELEMENT_TYPE.IMAGE:
                msgContent = new Msg.Elem.Images(
                msgBody.MsgContent.UUID,
                msgBody.MsgContent.ImageFormat || "");

                for (var j in msgBody.MsgContent.ImageInfoArray) {
                  var tempImg = msgBody.MsgContent.ImageInfoArray[j];
                  msgContent.addImage(
                  new Msg.Elem.Images.Image(
                  tempImg.Type,
                  tempImg.Size,
                  tempImg.Width,
                  tempImg.Height,
                  tempImg.URL));


                }
                break;
              case MSG_ELEMENT_TYPE.SOUND:
                if (msgBody.MsgContent) {
                  msgContent = new Msg.Elem.Sound(
                  msgBody.MsgContent.UUID,
                  msgBody.MsgContent.Second,
                  msgBody.MsgContent.Size,
                  msgInfo.From_Account,
                  msgInfo.To_Account,
                  msgBody.MsgContent.Download_Flag,
                  SESSION_TYPE.C2C);

                } else {
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
                }
                break;
              case MSG_ELEMENT_TYPE.LOCATION:
                msgContent = new Msg.Elem.Location(
                msgBody.MsgContent.Longitude,
                msgBody.MsgContent.Latitude,
                msgBody.MsgContent.Desc);

                break;
              case MSG_ELEMENT_TYPE.FILE:
              case MSG_ELEMENT_TYPE.FILE + " ":
                msgType = MSG_ELEMENT_TYPE.FILE;
                if (msgBody.MsgContent) {
                  msgContent = new Msg.Elem.File(
                  msgBody.MsgContent.UUID,
                  msgBody.MsgContent.FileName,
                  msgBody.MsgContent.FileSize,
                  msgInfo.From_Account,
                  msgInfo.To_Account,
                  msgBody.MsgContent.Download_Flag,
                  SESSION_TYPE.C2C);

                } else {
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('[文件消息下载地址解析出错]');
                }
                break;
              case MSG_ELEMENT_TYPE.CUSTOM:
                try {
                  var data = JSON.parse(msgBody.MsgContent.Data);
                  if (data && data.userAction && data.userAction == FRIEND_WRITE_MSG_ACTION.ING) {//过滤安卓或ios的正在输入自定义消息
                    continue;
                  }
                } catch (e) {
                }

                msgType = MSG_ELEMENT_TYPE.CUSTOM;
                msgContent = new Msg.Elem.Custom(
                msgBody.MsgContent.Data,
                msgBody.MsgContent.Desc,
                msgBody.MsgContent.Ext);

                break;
              default:
                msgType = MSG_ELEMENT_TYPE.TEXT;
                msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
                break;}

            msg.elems.push(new Msg.Elem(msgType, msgContent));
          }

          if (msg.elems.length > 0 && MsgStore.addMsg(msg)) {
            notifyInfo.push(msg);
          }
        } // for loop
        if (notifyInfo.length > 0)
        MsgStore.updateTimeline();
        if (notifyInfo.length > 0) {
          if (onMsgCallback) onMsgCallback(notifyInfo);
        }
      };

      //发起新的长轮询请求
      var startNextLongPolling = function startNextLongPolling() {
        longPollingOn && MsgManager.longPolling();
      };

      //处理未决的加群申请消息列表
      var handlerApplyJoinGroupSystemMsgs = function handlerApplyJoinGroupSystemMsgs(eventArray) {
        for (var i in eventArray) {
          var e = eventArray[i];
          handlerGroupSystemMsgs(e.GroupTips, true);
          switch (e.Event) {
            case LONG_POLLINNG_EVENT_TYPE.GROUP_SYSTEM: //（多终端同步）群系统消息
              log.warn("handlerApplyJoinGroupSystemMsgs： handler new group system msg");
              //true 表示 解决加群申请通知存在重复的问题（已处理的通知，下次登录还会拉到），需要判重
              handlerGroupSystemMsgs(e.GroupTips, true);
              break;
            default:
              log.error("syncMsgs收到未知的群系统消息类型: Event=" + e.Event);
              break;}

        }
      };

      //拉取c2c消息(包含加群未决消息，需要处理)
      this.syncMsgs = function (cbOk, cbErr) {
        var notifyInfo = [];
        var msgInfos = [];
        //读取C2C消息
        proto_getMsgs(MsgStore.cookie, MsgStore.syncFlag, function (resp) {
          //拉取完毕
          if (resp.SyncFlag == 2) {
            MsgStore.syncFlag = 0;
          }
          //处理c2c消息
          msgInfos = resp.MsgList; //返回的消息列表
          MsgStore.cookie = resp.Cookie; //cookies，记录当前读到的最新消息位置

          for (var i in msgInfos) {
            var msgInfo = msgInfos[i];
            var isSendMsg, id, headUrl;
            if (msgInfo.From_Account == ctx.identifier) {//当前用户发送的消息
              isSendMsg = true;
              id = msgInfo.To_Account; //读取接收者信息
              headUrl = '';
            } else {//当前用户收到的消息
              isSendMsg = false;
              id = msgInfo.From_Account; //读取发送者信息
              headUrl = '';
            }
            var sess = MsgStore.sessByTypeId(SESSION_TYPE.C2C, id);
            if (!sess) {
              sess = new Session(SESSION_TYPE.C2C, id, id, headUrl, 0, 0);
            }
            var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account);
            var msgBody = null;
            var msgContent = null;
            var msgType = null;
            for (var mi in msgInfo.MsgBody) {
              msgBody = msgInfo.MsgBody[mi];
              msgType = msgBody.MsgType;
              switch (msgType) {
                case MSG_ELEMENT_TYPE.TEXT:
                  msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
                  break;
                case MSG_ELEMENT_TYPE.FACE:
                  msgContent = new Msg.Elem.Face(
                  msgBody.MsgContent.Index,
                  msgBody.MsgContent.Data);

                  break;
                case MSG_ELEMENT_TYPE.IMAGE:
                  msgContent = new Msg.Elem.Images(
                  msgBody.MsgContent.UUID,
                  msgBody.MsgContent.ImageFormat);

                  for (var j in msgBody.MsgContent.ImageInfoArray) {
                    var tempImg = msgBody.MsgContent.ImageInfoArray[j];
                    msgContent.addImage(
                    new Msg.Elem.Images.Image(
                    tempImg.Type,
                    tempImg.Size,
                    tempImg.Width,
                    tempImg.Height,
                    tempImg.URL));


                  }
                  break;
                case MSG_ELEMENT_TYPE.SOUND:
                  // var soundUrl = getSoundDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account);
                  if (msgBody.MsgContent) {
                    msgContent = new Msg.Elem.Sound(
                    msgBody.MsgContent.UUID,
                    msgBody.MsgContent.Second,
                    msgBody.MsgContent.Size,
                    msgInfo.From_Account,
                    msgInfo.To_Account,
                    msgBody.MsgContent.Download_Flag,
                    SESSION_TYPE.C2C);

                  } else {
                    msgType = MSG_ELEMENT_TYPE.TEXT;
                    msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
                  }
                  break;
                case MSG_ELEMENT_TYPE.LOCATION:
                  msgContent = new Msg.Elem.Location(
                  msgBody.MsgContent.Longitude,
                  msgBody.MsgContent.Latitude,
                  msgBody.MsgContent.Desc);

                  break;
                case MSG_ELEMENT_TYPE.FILE:
                case MSG_ELEMENT_TYPE.FILE + " ":
                  msgType = MSG_ELEMENT_TYPE.FILE;
                  // var fileUrl = getFileDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account, msgBody.MsgContent.FileName);
                  if (msgBody.MsgContent) {
                    msgContent = new Msg.Elem.File(
                    msgBody.MsgContent.UUID,
                    msgBody.MsgContent.FileName,
                    msgBody.MsgContent.FileSize,
                    msgInfo.From_Account,
                    msgInfo.To_Account,
                    msgBody.MsgContent.Download_Flag,
                    SESSION_TYPE.C2C);

                  } else {
                    msgType = MSG_ELEMENT_TYPE.TEXT;
                    msgContent = new Msg.Elem.Text('[文件消息下载地址解析出错]');
                  }
                  break;
                case MSG_ELEMENT_TYPE.CUSTOM:
                  try {
                    var data = JSON.parse(msgBody.MsgContent.Data);
                    if (data && data.userAction && data.userAction == FRIEND_WRITE_MSG_ACTION.ING) {//过滤安卓或ios的正在输入自定义消息
                      continue;
                    }
                  } catch (e) {
                  }

                  msgType = MSG_ELEMENT_TYPE.CUSTOM;
                  msgContent = new Msg.Elem.Custom(
                  msgBody.MsgContent.Data,
                  msgBody.MsgContent.Desc,
                  msgBody.MsgContent.Ext);

                  break;
                default:
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
                  break;}

              msg.elems.push(new Msg.Elem(msgType, msgContent));
            }

            if (msg.elems.length > 0 && MsgStore.addMsg(msg)) {
              notifyInfo.push(msg);
            }
          } // for loop

          //处理加群未决申请消息
          handlerApplyJoinGroupSystemMsgs(resp.EventArray);

          if (notifyInfo.length > 0)
          MsgStore.updateTimeline();
          if (cbOk) cbOk(notifyInfo);else
          if (notifyInfo.length > 0) {
            if (onMsgCallback) onMsgCallback(notifyInfo);
          }

        }, function (err) {
          log.error("getMsgs failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });
      };


      //拉取C2C漫游消息
      this.getC2CHistoryMsgs = function (options, cbOk, cbErr) {

        if (!options.Peer_Account) {
          if (cbErr) {
            cbErr(tool.getReturnError("Peer_Account is empty", -13));
            return;
          }
        }
        if (!options.MaxCnt) {
          options.MaxCnt = 15;
        }
        if (options.MaxCnt <= 0) {
          if (cbErr) {
            cbErr(tool.getReturnError("MaxCnt should be greater than 0", -14));
            return;
          }
        }
        if (options.MaxCnt > 15) {
          if (cbErr) {
            cbErr(tool.getReturnError("MaxCnt can not be greater than 15", -15));
            return;
          }
          return;
        }
        if (options.MsgKey == null || options.MsgKey === undefined) {
          options.MsgKey = '';
        }
        var opts = {
          'Peer_Account': options.Peer_Account,
          'MaxCnt': options.MaxCnt,
          'LastMsgTime': options.LastMsgTime,
          'MsgKey': options.MsgKey };

        //读取c2c漫游消息
        proto_getC2CHistoryMsgs(opts, function (resp) {
          var msgObjList = [];
          var msgInfos = [];
          //处理c2c消息
          msgInfos = resp.MsgList; //返回的消息列表
          var sess = MsgStore.sessByTypeId(SESSION_TYPE.C2C, options.Peer_Account);
          if (!sess) {
            sess = new Session(SESSION_TYPE.C2C, options.Peer_Account, options.Peer_Account, '', 0, 0);
          }
          for (var i in msgInfos) {
            var msgInfo = msgInfos[i];
            var isSendMsg, id, headUrl;
            if (msgInfo.From_Account == ctx.identifier) {//当前用户发送的消息
              isSendMsg = true;
              id = msgInfo.To_Account; //读取接收者信息
              headUrl = '';
            } else {//当前用户收到的消息
              isSendMsg = false;
              id = msgInfo.From_Account; //读取发送者信息
              headUrl = '';
            }
            var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account);
            var msgBody = null;
            var msgContent = null;
            var msgType = null;
            for (var mi in msgInfo.MsgBody) {
              msgBody = msgInfo.MsgBody[mi];
              msgType = msgBody.MsgType;
              switch (msgType) {
                case MSG_ELEMENT_TYPE.TEXT:
                  msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
                  break;
                case MSG_ELEMENT_TYPE.FACE:
                  msgContent = new Msg.Elem.Face(
                  msgBody.MsgContent.Index,
                  msgBody.MsgContent.Data);

                  break;
                case MSG_ELEMENT_TYPE.IMAGE:
                  msgContent = new Msg.Elem.Images(
                  msgBody.MsgContent.UUID,
                  msgBody.MsgContent.ImageFormat);

                  for (var j in msgBody.MsgContent.ImageInfoArray) {
                    var tempImg = msgBody.MsgContent.ImageInfoArray[j];
                    msgContent.addImage(
                    new Msg.Elem.Images.Image(
                    tempImg.Type,
                    tempImg.Size,
                    tempImg.Width,
                    tempImg.Height,
                    tempImg.URL));


                  }
                  break;
                case MSG_ELEMENT_TYPE.SOUND:

                  // var soundUrl = getSoundDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account);

                  if (msgBody.MsgContent) {
                    msgContent = new Msg.Elem.Sound(
                    msgBody.MsgContent.UUID,
                    msgBody.MsgContent.Second,
                    msgBody.MsgContent.Size,
                    msgInfo.From_Account,
                    msgInfo.To_Account,
                    msgBody.MsgContent.Download_Flag,
                    SESSION_TYPE.C2C);

                  } else {
                    msgType = MSG_ELEMENT_TYPE.TEXT;
                    msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
                  }
                  break;
                case MSG_ELEMENT_TYPE.LOCATION:
                  msgContent = new Msg.Elem.Location(
                  msgBody.MsgContent.Longitude,
                  msgBody.MsgContent.Latitude,
                  msgBody.MsgContent.Desc);

                  break;
                case MSG_ELEMENT_TYPE.FILE:
                case MSG_ELEMENT_TYPE.FILE + " ":
                  msgType = MSG_ELEMENT_TYPE.FILE;
                  // var fileUrl = getFileDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account, msgBody.MsgContent.FileName);

                  if (msgBody.MsgContent) {
                    msgContent = new Msg.Elem.File(
                    msgBody.MsgContent.UUID,
                    msgBody.MsgContent.FileName,
                    msgBody.MsgContent.FileSize,
                    msgInfo.From_Account,
                    msgInfo.To_Account,
                    msgBody.MsgContent.Download_Flag,
                    SESSION_TYPE.C2C);

                  } else {
                    msgType = MSG_ELEMENT_TYPE.TEXT;
                    msgContent = new Msg.Elem.Text('[文件消息下载地址解析出错]');
                  }
                  break;
                case MSG_ELEMENT_TYPE.CUSTOM:
                  msgType = MSG_ELEMENT_TYPE.CUSTOM;
                  msgContent = new Msg.Elem.Custom(
                  msgBody.MsgContent.Data,
                  msgBody.MsgContent.Desc,
                  msgBody.MsgContent.Ext);


                  break;
                default:
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
                  break;}

              msg.elems.push(new Msg.Elem(msgType, msgContent));
            }
            MsgStore.addMsg(msg);
            msgObjList.push(msg);
          } // for loop

          MsgStore.updateTimeline();
          if (cbOk) {

            var newResp = {
              'Complete': resp.Complete,
              'MsgCount': msgObjList.length,
              'LastMsgTime': resp.LastMsgTime,
              'MsgKey': resp.MsgKey,
              'MsgList': msgObjList };

            sess.isFinished(resp.Complete);
            cbOk(newResp);
          }

        }, function (err) {
          log.error("getC2CHistoryMsgs failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });
      };

      //拉群历史消息
      //不传cbOk 和 cbErr，则会调用新消息回调函数
      this.syncGroupMsgs = function (options, cbOk, cbErr) {
        if (options.ReqMsgSeq <= 0) {
          if (cbErr) {
            var errInfo = "ReqMsgSeq must be greater than 0";
            var error = tool.getReturnError(errInfo, -16);
            cbErr(error);
          }
          return;
        }
        var opts = {
          'GroupId': options.GroupId,
          'ReqMsgSeq': options.ReqMsgSeq,
          'ReqMsgNumber': options.ReqMsgNumber };

        //读群漫游消息
        proto_getGroupMsgs(opts, function (resp) {
          var notifyInfo = [];
          var group_id = resp.GroupId; //返回的群id
          var msgInfos = resp.RspMsgList; //返回的消息列表
          var isFinished = resp.IsFinished;

          if (msgInfos == null || msgInfos === undefined) {
            if (cbOk) {
              cbOk([]);
            }
            return;
          }
          for (var i = msgInfos.length - 1; i >= 0; i--) {
            var msgInfo = msgInfos[i];
            //如果是已经删除的消息或者发送者帐号为空或者消息内容为空
            //IsPlaceMsg=1
            if (msgInfo.IsPlaceMsg || !msgInfo.From_Account || !msgInfo.MsgBody || msgInfo.MsgBody.length == 0) {
              continue;
            }
            var msg = handlerGroupMsg(msgInfo, true, true, isFinished);
            if (msg) {
              notifyInfo.push(msg);
            }
          } // for loop
          if (notifyInfo.length > 0)
          MsgStore.updateTimeline();
          if (cbOk) cbOk(notifyInfo);else
          if (notifyInfo.length > 0) {
            if (onMsgCallback) onMsgCallback(notifyInfo);
          }

        }, function (err) {
          log.error("getGroupMsgs failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });
      };

      //处理群消息(普通消息+提示消息)
      //isSyncGroupMsgs 是否主动拉取群消息标志
      //isAddMsgFlag 是否需要保存到MsgStore，如果需要，这里会存在判重逻辑
      var handlerGroupMsg = function handlerGroupMsg(msgInfo, isSyncGroupMsgs, isAddMsgFlag, isFinished) {
        if (msgInfo.IsPlaceMsg || !msgInfo.From_Account || !msgInfo.MsgBody || msgInfo.MsgBody.length == 0) {
          return null;
        }
        var isSendMsg, id, headUrl, fromAccountNick, fromAccountHeadurl;
        var group_id = msgInfo.ToGroupId;
        var group_name = group_id;
        if (msgInfo.GroupInfo) {//取出群名称
          if (msgInfo.GroupInfo.GroupName) {
            group_name = msgInfo.GroupInfo.GroupName;
          }
        }
        //取出成员昵称
        fromAccountNick = msgInfo.From_Account;
        //fromAccountHeadurl = msgInfo.GroupInfo.From_AccountHeadurl;
        if (msgInfo.GroupInfo) {
          if (msgInfo.GroupInfo.From_AccountNick) {
            fromAccountNick = msgInfo.GroupInfo.From_AccountNick;
          }
          if (msgInfo.GroupInfo.From_AccountHeadurl) {
            fromAccountHeadurl = msgInfo.GroupInfo.From_AccountHeadurl;
          } else {
            fromAccountHeadurl = null;
          }
        }
        if (msgInfo.From_Account == ctx.identifier) {//当前用户发送的消息
          isSendMsg = true;
          id = msgInfo.From_Account; //读取接收者信息
          headUrl = '';
        } else {//当前用户收到的消息
          isSendMsg = false;
          id = msgInfo.From_Account; //读取发送者信息
          headUrl = '';
        }
        var sess = MsgStore.sessByTypeId(SESSION_TYPE.GROUP, group_id);
        if (!sess) {
          sess = new Session(SESSION_TYPE.GROUP, group_id, group_name, headUrl, 0, 0);
        }
        if (typeof isFinished !== "undefined") {
          sess.isFinished(isFinished || 0);
        }
        var subType = GROUP_MSG_SUB_TYPE.COMMON; //消息类型
        //群提示消息,重新封装下
        if (LONG_POLLINNG_EVENT_TYPE.GROUP_TIP == msgInfo.Event || LONG_POLLINNG_EVENT_TYPE.GROUP_TIP2 == msgInfo.Event) {
          subType = GROUP_MSG_SUB_TYPE.TIP;
          var groupTip = msgInfo.MsgBody;
          msgInfo.MsgBody = [];
          msgInfo.MsgBody.push({
            "MsgType": MSG_ELEMENT_TYPE.GROUP_TIP,
            "MsgContent": groupTip });

        } else if (msgInfo.MsgPriority) {//群点赞消息
          if (msgInfo.MsgPriority == GROUP_MSG_PRIORITY_TYPE.REDPACKET) {
            subType = GROUP_MSG_SUB_TYPE.REDPACKET;
          } else if (msgInfo.MsgPriority == GROUP_MSG_PRIORITY_TYPE.LOVEMSG) {
            subType = GROUP_MSG_SUB_TYPE.LOVEMSG;
          }

        }
        var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account, subType, fromAccountNick, fromAccountHeadurl);
        var msgBody = null;
        var msgContent = null;
        var msgType = null;
        for (var mi in msgInfo.MsgBody) {
          msgBody = msgInfo.MsgBody[mi];
          msgType = msgBody.MsgType;
          switch (msgType) {
            case MSG_ELEMENT_TYPE.TEXT:
              msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
              break;
            case MSG_ELEMENT_TYPE.FACE:
              msgContent = new Msg.Elem.Face(
              msgBody.MsgContent.Index,
              msgBody.MsgContent.Data);

              break;
            case MSG_ELEMENT_TYPE.IMAGE:
              msgContent = new Msg.Elem.Images(
              msgBody.MsgContent.UUID,
              msgBody.MsgContent.ImageFormat || "");

              for (var j in msgBody.MsgContent.ImageInfoArray) {
                msgContent.addImage(
                new Msg.Elem.Images.Image(
                msgBody.MsgContent.ImageInfoArray[j].Type,
                msgBody.MsgContent.ImageInfoArray[j].Size,
                msgBody.MsgContent.ImageInfoArray[j].Width,
                msgBody.MsgContent.ImageInfoArray[j].Height,
                msgBody.MsgContent.ImageInfoArray[j].URL));


              }
              break;
            case MSG_ELEMENT_TYPE.SOUND:
              if (msgBody.MsgContent) {
                msgContent = new Msg.Elem.Sound(
                msgBody.MsgContent.UUID,
                msgBody.MsgContent.Second,
                msgBody.MsgContent.Size,
                msgInfo.From_Account,
                msgInfo.To_Account,
                msgBody.MsgContent.Download_Flag,
                SESSION_TYPE.GROUP);

              } else {
                msgType = MSG_ELEMENT_TYPE.TEXT;
                msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
              }
              break;
            case MSG_ELEMENT_TYPE.LOCATION:
              msgContent = new Msg.Elem.Location(
              msgBody.MsgContent.Longitude,
              msgBody.MsgContent.Latitude,
              msgBody.MsgContent.Desc);

              break;
            case MSG_ELEMENT_TYPE.FILE:
            case MSG_ELEMENT_TYPE.FILE + " ":
              msgType = MSG_ELEMENT_TYPE.FILE;
              var fileUrl = getFileDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account, msgBody.MsgContent.FileName);

              if (msgBody.MsgContent) {
                msgContent = new Msg.Elem.File(
                msgBody.MsgContent.UUID,
                msgBody.MsgContent.FileName,
                msgBody.MsgContent.FileSize,
                msgInfo.From_Account,
                msgInfo.To_Account,
                msgBody.MsgContent.Download_Flag,
                SESSION_TYPE.GROUP);

              } else {
                msgType = MSG_ELEMENT_TYPE.TEXT;
                msgContent = new Msg.Elem.Text('[文件消息]地址解析出错');
              }
              break;
            case MSG_ELEMENT_TYPE.GROUP_TIP:
              var opType = msgBody.MsgContent.OpType;
              msgContent = new Msg.Elem.GroupTip(
              opType,
              msgBody.MsgContent.Operator_Account,
              group_id,
              msgInfo.GroupInfo.GroupName,
              msgBody.MsgContent.List_Account);

              if (GROUP_TIP_TYPE.JOIN == opType || GROUP_TIP_TYPE.QUIT == opType) {//加群或退群时，设置最新群成员数
                msgContent.setGroupMemberNum(msgBody.MsgContent.MemberNum);
              } else if (GROUP_TIP_TYPE.MODIFY_GROUP_INFO == opType) {//群资料变更
                var tempIsCallbackFlag = false;
                var tempNewGroupInfo = {
                  "GroupId": group_id,
                  "GroupFaceUrl": null,
                  "GroupName": null,
                  "OwnerAccount": null,
                  "GroupNotification": null,
                  "GroupIntroduction": null };

                var msgGroupNewInfo = msgBody.MsgContent.MsgGroupNewInfo;
                if (msgGroupNewInfo.GroupFaceUrl) {
                  var tmpNGIFaceUrl = new Msg.Elem.GroupTip.GroupInfo(
                  GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL,
                  msgGroupNewInfo.GroupFaceUrl);

                  msgContent.addGroupInfo(tmpNGIFaceUrl);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.GroupFaceUrl = msgGroupNewInfo.GroupFaceUrl;
                }
                if (msgGroupNewInfo.GroupName) {
                  var tmpNGIName = new Msg.Elem.GroupTip.GroupInfo(
                  GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME,
                  msgGroupNewInfo.GroupName);

                  msgContent.addGroupInfo(tmpNGIName);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.GroupName = msgGroupNewInfo.GroupName;
                }
                if (msgGroupNewInfo.Owner_Account) {
                  var tmpNGIOwner = new Msg.Elem.GroupTip.GroupInfo(
                  GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER,
                  msgGroupNewInfo.Owner_Account);

                  msgContent.addGroupInfo(tmpNGIOwner);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.OwnerAccount = msgGroupNewInfo.Owner_Account;
                }
                if (msgGroupNewInfo.GroupNotification) {
                  var tmpNGINotification = new Msg.Elem.GroupTip.GroupInfo(
                  GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION,
                  msgGroupNewInfo.GroupNotification);

                  msgContent.addGroupInfo(tmpNGINotification);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.GroupNotification = msgGroupNewInfo.GroupNotification;
                }
                if (msgGroupNewInfo.GroupIntroduction) {
                  var tmpNGIIntroduction = new Msg.Elem.GroupTip.GroupInfo(
                  GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION,
                  msgGroupNewInfo.GroupIntroduction);

                  msgContent.addGroupInfo(tmpNGIIntroduction);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.GroupIntroduction = msgGroupNewInfo.GroupIntroduction;
                }

                //回调群资料变化通知方法
                if (isSyncGroupMsgs == false && tempIsCallbackFlag && onGroupInfoChangeCallback) {
                  onGroupInfoChangeCallback(tempNewGroupInfo);
                }

              } else if (GROUP_TIP_TYPE.MODIFY_MEMBER_INFO == opType) {//群成员变更
                var memberInfos = msgBody.MsgContent.MsgMemberInfo;
                for (var n in memberInfos) {
                  var memberInfo = memberInfos[n];
                  msgContent.addMemberInfo(
                  new Msg.Elem.GroupTip.MemberInfo(
                  memberInfo.User_Account, memberInfo.ShutupTime));


                }
              }
              break;
            case MSG_ELEMENT_TYPE.CUSTOM:
              msgType = MSG_ELEMENT_TYPE.CUSTOM;
              msgContent = new Msg.Elem.Custom(
              msgBody.MsgContent.Data,
              msgBody.MsgContent.Desc,
              msgBody.MsgContent.Ext);

              break;
            default:
              msgType = MSG_ELEMENT_TYPE.TEXT;
              msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
              break;}

          msg.elems.push(new Msg.Elem(msgType, msgContent));
        }

        if (isAddMsgFlag == false) {//不需要保存消息
          return msg;
        }

        if (MsgStore.addMsg(msg)) {
          return msg;
        } else {
          return null;
        }
      };

      //初始化
      this.init = function (listeners, cbOk, cbErr) {
        if (!listeners.onMsgNotify) {
          log.warn('listeners.onMsgNotify is empty');
        }
        onMsgCallback = listeners.onMsgNotify;

        if (listeners.onBigGroupMsgNotify) {
          onBigGroupMsgCallback = listeners.onBigGroupMsgNotify;
        } else {
          log.warn('listeners.onBigGroupMsgNotify is empty');
        }

        if (listeners.onC2cEventNotifys) {
          onC2cEventCallbacks = listeners.onC2cEventNotifys;
        } else {
          log.warn('listeners.onC2cEventNotifys is empty');
        }
        if (listeners.onGroupSystemNotifys) {
          onGroupSystemNotifyCallbacks = listeners.onGroupSystemNotifys;
        } else {
          log.warn('listeners.onGroupSystemNotifys is empty');
        }
        if (listeners.onGroupInfoChangeNotify) {
          onGroupInfoChangeCallback = listeners.onGroupInfoChangeNotify;
        } else {
          log.warn('listeners.onGroupInfoChangeNotify is empty');
        }
        if (listeners.onFriendSystemNotifys) {
          onFriendSystemNotifyCallbacks = listeners.onFriendSystemNotifys;
        } else {
          log.warn('listeners.onFriendSystemNotifys is empty');
        }
        if (listeners.onProfileSystemNotifys) {
          onProfileSystemNotifyCallbacks = listeners.onProfileSystemNotifys;
        } else {
          log.warn('listeners.onProfileSystemNotifys is empty');
        }
        if (listeners.onKickedEventCall) {
          onKickedEventCall = listeners.onKickedEventCall;
        } else {
          log.warn('listeners.onKickedEventCall is empty');
        }

        if (listeners.onAppliedDownloadUrl) {
          onAppliedDownloadUrl = listeners.onAppliedDownloadUrl;
        } else {
          log.warn('listeners.onAppliedDownloadUrl is empty');
        }

        if (!ctx.identifier || !ctx.userSig) {
          if (cbOk) {
            var success = {
              'ActionStatus': ACTION_STATUS.OK,
              'ErrorCode': 0,
              'ErrorInfo': "login success(no login state)" };

            cbOk(success);
          }
          return;
        }

        //初始化
        initMyGroupMaxSeqs(
        function (resp) {
          log.info('initMyGroupMaxSeqs success');
          //初始化文件
          initIpAndAuthkey(
          function (initIpAndAuthkeyResp) {
            log.info('initIpAndAuthkey success');
            if (cbOk) {
              log.info('login success(have login state))');
              var success = {
                'ActionStatus': ACTION_STATUS.OK,
                'ErrorCode': 0,
                'ErrorInfo': "login success" };

              cbOk(success);
            }
            MsgManager.setLongPollingOn(true); //开启长轮询
            longPollingOn && MsgManager.longPolling(cbOk);
          }, cbErr);
        }, cbErr);
      };

      //发消息（私聊或群聊）
      this.sendMsg = function (msg, cbOk, cbErr) {
        proto_sendMsg(msg, function (resp) {
          //私聊时，加入自己的发的消息，群聊时，由于seq和服务器的seq不一样，所以不作处理
          if (msg.sess.type() == SESSION_TYPE.C2C) {
            if (!MsgStore.addMsg(msg)) {
              var errInfo = "sendMsg: addMsg failed!";
              var error = tool.getReturnError(errInfo, -17);
              log.error(errInfo);
              if (cbErr) cbErr(error);
              return;
            }
            //更新信息流时间
            MsgStore.updateTimeline();
          }
          if (cbOk) cbOk(resp);
        }, function (err) {
          if (cbErr) cbErr(err);
        });
      };
    }();

    //上传文件
    var FileUploader = new function () {
      this.fileMd5 = null;
      //获取文件MD5
      var getFileMD5 = function getFileMD5(file, cbOk, cbErr) {

        //FileReader pc浏览器兼容性
        //Feature   Firefox (Gecko) Chrome  Internet Explorer   Opera   Safari
        //Basic support 3.6 7   10                      12.02   6.0.2
        var fileReader = null;
        try {
          fileReader = new FileReader(); //分块读取文件对象
        } catch (e) {
          if (cbErr) {
            cbErr(tool.getReturnError('当前浏览器不支持FileReader', -18));
            return;
          }
        }
        //file的slice方法，注意它的兼容性，在不同浏览器的写法不同
        var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
        if (!blobSlice) {
          if (cbErr) {
            cbErr(tool.getReturnError('当前浏览器不支持FileAPI', -19));
            return;
          }
        }

        var chunkSize = 2 * 1024 * 1024; //分块大小，2M
        var chunks = Math.ceil(file.size / chunkSize); //总块数
        var currentChunk = 0; //当前块数
        var spark = new SparkMD5(); //获取MD5对象

        fileReader.onload = function (e) {//数据加载完毕事件

          var binaryStr = "";
          var bytes = new Uint8Array(e.target.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binaryStr += String.fromCharCode(bytes[i]); //二进制转换字符串
          }
          spark.appendBinary(binaryStr);
          currentChunk++;
          if (currentChunk < chunks) {
            loadNext(); //读取下一块数据
          } else {
            this.fileMd5 = spark.end(); //得到文件MD5值
            if (cbOk) {
              cbOk(this.fileMd5);
            }
          }
        };

        //分片读取文件
        function loadNext() {
          var start = currentChunk * chunkSize,
          end = start + chunkSize >= file.size ? file.size : start + chunkSize;
          //根据开始和结束位置，切割文件
          var b = blobSlice.call(file, start, end);
          //readAsBinaryString ie浏览器不兼容此方法
          //fileReader.readAsBinaryString(blobSlice.call(file, start, end));
          fileReader.readAsArrayBuffer(b); //ie，chrome，firefox等主流浏览器兼容此方法

        }

        loadNext(); //开始读取
      };
      //提交上传图片表单(用于低版本IE9以下)
      this.submitUploadFileForm = function (options, cbOk, cbErr) {
        var errInfo;
        var error;
        var formId = options.formId;
        var fileId = options.fileId;
        var iframeNum = uploadResultIframeId++;
        var iframeName = "uploadResultIframe_" + iframeNum;
        var toAccount = options.To_Account;
        var businessType = options.businessType;

        var form = document.getElementById(formId);
        if (!form) {
          errInfo = "获取表单对象为空: formId=" + formId + "(formId非法)";
          error = tool.getReturnError(errInfo, -20);
          if (cbErr) cbErr(error);
          return;
        }

        var fileObj = document.getElementById(fileId);
        if (!fileObj) {
          errInfo = "获取文件对象为空: fileId=" + fileId + "(没有选择文件或者fileId非法)";
          error = tool.getReturnError(errInfo, -21);
          if (cbErr) cbErr(error);
          return;
        }
        //fileObj.type="file";//ie8下不起作用，必须由业务自己设置
        fileObj.name = "file";

        var iframe = document.createElement("iframe");
        iframe.name = iframeName;
        iframe.id = iframeName;
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        var cmdName;
        if (isAccessFormalEnv()) {
          cmdName = 'pic_up';
        } else {
          cmdName = 'pic_up_test';
        }
        var uploadApiUrl = "https://pic.tim.qq.com/v4/openpic/" + cmdName + "?tinyid=" + ctx.tinyid + "&a2=" + ctx.a2 + "&sdkappid=" + ctx.sdkAppID + "&accounttype=" + ctx.accountType + "&contenttype=http";
        form.action = uploadApiUrl;
        form.method = 'post';
        //form.enctype='multipart/form-data';//ie8下不起作用，必须由业务自己设置
        form.target = iframeName;

        function createFormInput(name, value) {
          var tempInput = document.createElement("input");
          tempInput.type = "hidden";
          tempInput.name = name;
          tempInput.value = value;
          form.appendChild(tempInput);
        }

        createFormInput("App_Version", VERSION_INFO.APP_VERSION);
        createFormInput("From_Account", ctx.identifier);
        createFormInput("To_Account", toAccount);
        createFormInput("Seq", nextSeq().toString());
        createFormInput("Timestamp", unixtime().toString());
        createFormInput("Random", createRandom().toString());
        createFormInput("Busi_Id", businessType);
        createFormInput("PkgFlag", UPLOAD_RES_PKG_FLAG.RAW_DATA.toString());
        createFormInput("Auth_Key", authkey);
        createFormInput("Server_Ver", VERSION_INFO.SERVER_VERSION.toString());
        createFormInput("File_Type", options.fileType);


        //检测iframe.contentWindow.name是否有值
        function checkFrameName() {
          var resp;
          try {
            resp = JSON.parse(iframe.contentWindow.name) || {};
          } catch (e) {
            resp = {};
          }
          if (resp.ActionStatus) {//上传接口返回
            // We've got what we need. Stop the iframe from loading further content.
            iframe.src = "about:blank";
            iframe.parentNode.removeChild(iframe);
            iframe = null;

            if (resp.ActionStatus == ACTION_STATUS.OK) {
              cbOk && cbOk(resp);
            } else {
              cbErr && cbErr(resp);
            }
          } else {
            setTimeout(checkFrameName, 100);
          }
        }

        setTimeout(checkFrameName, 500);

        form.submit(); //提交上传图片表单
      };
      //上传图片或文件(用于高版本浏览器，支持FileAPI)
      this.uploadFile = function (options, cbOk, cbErr) {

        var file_upload = {
          //初始化
          init: function init(options, cbOk, cbErr) {
            var me = this;
            me.file = options.file;
            //分片上传进度回调事件
            me.onProgressCallBack = options.onProgressCallBack;
            //停止上传图片按钮
            if (options.abortButton) {
              options.abortButton.onclick = me.abortHandler;
            }
            me.total = me.file.size; //文件总大小
            me.loaded = 0; //已读取字节数
            me.step = 1080 * 1024; //分块大小，1080K
            me.sliceSize = 0; //分片大小
            me.sliceOffset = 0; //当前分片位置
            me.timestamp = unixtime(); //当前时间戳
            me.seq = nextSeq(); //请求seq
            me.random = createRandom(); //请求随机数
            me.fromAccount = ctx.identifier; //发送者
            me.toAccount = options.To_Account; //接收者
            me.fileMd5 = options.fileMd5; //文件MD5
            me.businessType = options.businessType; //图片或文件的业务类型，群消息:1; c2c消息:2; 个人头像：3; 群头像：4;
            me.fileType = options.fileType; //文件类型，不填为默认认为上传的是图片；1：图片；2：文件；3：短视频；4：PTT

            me.cbOk = cbOk; //上传成功回调事件
            me.cbErr = cbErr; //上传失败回调事件

            me.reader = new FileReader(); //读取文件对象
            me.blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice; //file的slice方法,不同浏览器不一样

            me.reader.onloadstart = me.onLoadStart; //开始读取回调事件
            me.reader.onprogress = me.onProgress; //读取文件进度回调事件
            me.reader.onabort = me.onAbort; //停止读取回调事件
            me.reader.onerror = me.onerror; //读取发生错误回调事件
            me.reader.onload = me.onLoad; //分片加载完毕回调事件
            me.reader.onloadend = me.onLoadEnd; //读取文件完毕回调事件
          },
          //上传方法
          upload: function upload() {
            var me = file_upload;
            //读取第一块
            me.readBlob(0);
          },
          onLoadStart: function onLoadStart() {
            var me = file_upload;
          },
          onProgress: function onProgress(e) {
            var me = file_upload;
            me.loaded += e.loaded;
            if (me.onProgressCallBack) {
              me.onProgressCallBack(me.loaded, me.total);
            }
          },
          onAbort: function onAbort() {
            var me = file_upload;
          },
          onError: function onError() {
            var me = file_upload;
          },
          onLoad: function onLoad(e) {
            var me = file_upload;
            if (e.target.readyState == FileReader.DONE) {
              var slice_data_base64 = e.target.result;
              //注意，一定要去除base64编码头部
              var pos = slice_data_base64.indexOf(",");
              if (pos != -1) {
                slice_data_base64 = slice_data_base64.substr(pos + 1);
              }
              //封装上传图片接口的请求参数
              var opt = {
                'From_Account': me.fromAccount,
                'To_Account': me.toAccount,
                'Busi_Id': me.businessType,
                'File_Type': me.fileType,
                'File_Str_Md5': me.fileMd5,
                'PkgFlag': UPLOAD_RES_PKG_FLAG.BASE64_DATA,
                'File_Size': me.total,
                'Slice_Offset': me.sliceOffset,
                'Slice_Size': me.sliceSize,
                'Slice_Data': slice_data_base64,
                'Seq': me.seq,
                'Timestamp': me.timestamp,
                'Random': me.random };


              //上传成功的成功回调
              var succCallback = function succCallback(resp) {
                if (resp.IsFinish == 0) {
                  me.loaded = resp.Next_Offset;
                  if (me.loaded < me.total) {
                    me.readBlob(me.loaded);
                  } else {
                    me.loaded = me.total;
                  }
                } else {

                  if (me.cbOk) {
                    var tempResp = {
                      'ActionStatus': resp.ActionStatus,
                      'ErrorCode': resp.ErrorCode,
                      'ErrorInfo': resp.ErrorInfo,
                      'File_UUID': resp.File_UUID,
                      'File_Size': resp.Next_Offset,
                      'URL_INFO': resp.URL_INFO,
                      'Download_Flag': resp.Download_Flag };

                    if (me.fileType == UPLOAD_RES_TYPE.FILE) {//如果上传的是文件，下载地址需要sdk内部拼接
                      tempResp.URL_INFO = getFileDownUrl(resp.File_UUID, ctx.identifier, me.file.name);
                    }
                    me.cbOk(tempResp);
                  }
                }
                Upload_Retry_Times = 0;
              };
              //上传失败的回调
              var errorCallback = function errorCallback(resp) {
                if (Upload_Retry_Times < Upload_Retry_Max_Times) {
                  Upload_Retry_Times++;
                  setTimeout(function () {
                    proto_uploadPic(opt, succCallback, errorCallback);
                  }, 1000);
                } else {
                  me.cbErr(resp);
                }
                //me.cbErr
              };
              //分片上传图片接口
              proto_uploadPic(opt, succCallback, errorCallback);
            }
          },
          onLoadEnd: function onLoadEnd() {
            var me = file_upload;
          },
          //分片读取文件方法
          readBlob: function readBlob(start) {
            var me = file_upload;
            var blob,file = me.file;
            var end = start + me.step;
            if (end > me.total) {
              end = me.total;
              me.sliceSize = end - start;
            } else {
              me.sliceSize = me.step;
            }
            me.sliceOffset = start;
            //根据起始和结束位置，分片读取文件
            blob = me.blobSlice.call(file, start, end);
            //将分片的二进制数据转换为base64编码
            me.reader.readAsDataURL(blob);
          },
          abortHandler: function abortHandler() {
            var me = file_upload;
            if (me.reader) {
              me.reader.abort();
            }
          } };


        //读取文件MD5
        getFileMD5(options.file,
        function (fileMd5) {
          log.info('fileMd5: ' + fileMd5);
          options.fileMd5 = fileMd5;
          //初始化上传参数
          file_upload.init(options, cbOk, cbErr);
          //开始上传文件
          file_upload.upload();
        },
        cbErr);

      };
    }();


    //web im 基础对象

    //常量对象

    //会话类型
    webim.SESSION_TYPE = SESSION_TYPE;

    webim.MSG_MAX_LENGTH = MSG_MAX_LENGTH;

    //c2c消息子类型
    webim.C2C_MSG_SUB_TYPE = C2C_MSG_SUB_TYPE;

    //群消息子类型
    webim.GROUP_MSG_SUB_TYPE = GROUP_MSG_SUB_TYPE;

    //消息元素类型
    webim.MSG_ELEMENT_TYPE = MSG_ELEMENT_TYPE;

    //群提示消息类型
    webim.GROUP_TIP_TYPE = GROUP_TIP_TYPE;

    //图片类型
    webim.IMAGE_TYPE = IMAGE_TYPE;

    //群系统消息类型
    webim.GROUP_SYSTEM_TYPE = GROUP_SYSTEM_TYPE;

    //好友系统通知子类型
    webim.FRIEND_NOTICE_TYPE = FRIEND_NOTICE_TYPE;

    //群提示消息-群资料变更类型
    webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE = GROUP_TIP_MODIFY_GROUP_INFO_TYPE;

    //浏览器信息
    webim.BROWSER_INFO = BROWSER_INFO;

    //表情对象
    webim.Emotions = webim.EmotionPicData = emotions;
    //表情标识符和index Map
    webim.EmotionDataIndexs = webim.EmotionPicDataIndex = emotionDataIndexs;

    //腾讯登录服务错误码(托管模式)
    webim.TLS_ERROR_CODE = TLS_ERROR_CODE;

    //连接状态
    webim.CONNECTION_STATUS = CONNECTION_STATUS;

    //上传图片业务类型
    webim.UPLOAD_PIC_BUSSINESS_TYPE = UPLOAD_PIC_BUSSINESS_TYPE;

    //最近联系人类型
    webim.RECENT_CONTACT_TYPE = RECENT_CONTACT_TYPE;

    //上传资源类型
    webim.UPLOAD_RES_TYPE = UPLOAD_RES_TYPE;


    /**************************************/

    //类对象
    //
    //工具对象
    webim.Tool = tool;
    //控制台打印日志对象
    webim.Log = log;

    //消息对象
    webim.Msg = Msg;
    //会话对象
    webim.Session = Session;
    //会话存储对象
    webim.MsgStore = {
      sessMap: function sessMap() {
        return MsgStore.sessMap();
      },
      sessCount: function sessCount() {
        return MsgStore.sessCount();
      },
      sessByTypeId: function sessByTypeId(type, id) {
        return MsgStore.sessByTypeId(type, id);
      },
      delSessByTypeId: function delSessByTypeId(type, id) {
        return MsgStore.delSessByTypeId(type, id);
      },
      resetCookieAndSyncFlag: function resetCookieAndSyncFlag() {
        return MsgStore.resetCookieAndSyncFlag();
      } };


    webim.Resources = Resources;

    /**************************************/

    // webim API impl
    //
    //基本接口
    //登录
    webim.login = webim.init = function (loginInfo, listeners, opts, cbOk, cbErr) {

      //初始化连接状态回调函数
      ConnManager.init(listeners.onConnNotify, cbOk, cbErr);

      //设置ie9以下浏览器jsonp回调
      if (listeners.jsonpCallback) jsonpCallback = listeners.jsonpCallback;
      //登录
      _login(loginInfo, listeners, opts, cbOk, cbErr);
    };
    //登出
    //需要传长轮询id
    //这样登出之后其他的登录实例还可以继续收取消息
    webim.logout = webim.offline = function (cbOk, cbErr) {
      return proto_logout('instance', cbOk, cbErr);
    };

    //登出
    //这种登出方式，所有的实例都将不会收到消息推送，直到重新登录
    webim.logoutAll = function (cbOk, cbErr) {
      return proto_logout('all', cbOk, cbErr);
    };


    //消息管理接口
    //发消息接口（私聊和群聊）
    webim.sendMsg = function (msg, cbOk, cbErr) {
      return MsgManager.sendMsg(msg, cbOk, cbErr);
    };
    //拉取未读c2c消息
    webim.syncMsgs = function (cbOk, cbErr) {
      return MsgManager.syncMsgs(cbOk, cbErr);
    };
    //拉取C2C漫游消息
    webim.getC2CHistoryMsgs = function (options, cbOk, cbErr) {
      return MsgManager.getC2CHistoryMsgs(options, cbOk, cbErr);
    };
    //拉取群漫游消息
    webim.syncGroupMsgs = function (options, cbOk, cbErr) {
      return MsgManager.syncGroupMsgs(options, cbOk, cbErr);
    };

    //上报c2c消息已读
    webim.c2CMsgReaded = function (options, cbOk, cbErr) {
      return MsgStore.c2CMsgReaded(options, cbOk, cbErr);
    };

    //上报群消息已读
    webim.groupMsgReaded = function (options, cbOk, cbErr) {
      return proto_groupMsgReaded(options, cbOk, cbErr);
    };

    //设置聊天会话自动标记已读
    webim.setAutoRead = function (selSess, isOn, isResetAll) {
      return MsgStore.setAutoRead(selSess, isOn, isResetAll);
    };

    //群组管理接口
    //
    //创建群
    webim.createGroup = function (options, cbOk, cbErr) {
      return proto_createGroup(options, cbOk, cbErr);
    };
    //创建群-高级接口
    webim.createGroupHigh = function (options, cbOk, cbErr) {
      return proto_createGroupHigh(options, cbOk, cbErr);
    };
    //申请加群
    webim.applyJoinGroup = function (options, cbOk, cbErr) {
      return proto_applyJoinGroup(options, cbOk, cbErr);
    };
    //处理加群申请(同意或拒绝)
    webim.handleApplyJoinGroupPendency = function (options, cbOk, cbErr) {
      return proto_handleApplyJoinGroupPendency(options, cbOk, cbErr);
    };

    //获取群组未决列表
    webim.getPendencyGroup = function (options, cbOk, cbErr) {
      return proto_getPendencyGroup(options, cbOk, cbErr);
    };

    //群未决已读上报
    webim.getPendencyGroupRead = function (options, cbOk, cbErr) {
      return proto_getPendencyGroupRead(options, cbOk, cbErr);
    };

    //处理邀请进群申请(同意或拒绝)
    webim.handleInviteJoinGroupRequest = function (options, cbOk, cbErr) {
      return proto_handleInviteJoinGroupRequest(options, cbOk, cbErr);
    };

    //删除加群申请
    webim.deleteApplyJoinGroupPendency = function (options, cbOk, cbErr) {
      return proto_deleteC2CMsg(options, cbOk, cbErr);
    };

    //主动退群
    webim.quitGroup = function (options, cbOk, cbErr) {
      return proto_quitGroup(options, cbOk, cbErr);
    };
    //搜索群组(根据名称)
    webim.searchGroupByName = function (options, cbOk, cbErr) {
      return proto_searchGroupByName(options, cbOk, cbErr);
    };
    //获取群组公开资料(根据群id搜索)
    webim.getGroupPublicInfo = function (options, cbOk, cbErr) {
      return proto_getGroupPublicInfo(options, cbOk, cbErr);
    };
    //获取群组详细资料-高级接口
    webim.getGroupInfo = function (options, cbOk, cbErr) {
      return proto_getGroupInfo(options, cbOk, cbErr);
    };
    //修改群基本资料
    webim.modifyGroupBaseInfo = function (options, cbOk, cbErr) {
      return proto_modifyGroupBaseInfo(options, cbOk, cbErr);
    };
    //获取群成员列表
    webim.getGroupMemberInfo = function (options, cbOk, cbErr) {
      return proto_getGroupMemberInfo(options, cbOk, cbErr);
    };
    //邀请好友加群
    webim.addGroupMember = function (options, cbOk, cbErr) {
      return proto_addGroupMember(options, cbOk, cbErr);
    };
    //修改群成员资料
    webim.modifyGroupMember = function (options, cbOk, cbErr) {
      return proto_modifyGroupMember(options, cbOk, cbErr);
    };
    //删除群成员
    webim.deleteGroupMember = function (options, cbOk, cbErr) {
      return proto_deleteGroupMember(options, cbOk, cbErr);
    };
    //解散群
    webim.destroyGroup = function (options, cbOk, cbErr) {
      return proto_destroyGroup(options, cbOk, cbErr);
    };
    //转让群组
    webim.changeGroupOwner = function (options, cbOk, cbErr) {
      return proto_changeGroupOwner(options, cbOk, cbErr);
    };

    //获取我的群组列表-高级接口
    webim.getJoinedGroupListHigh = function (options, cbOk, cbErr) {
      return proto_getJoinedGroupListHigh(options, cbOk, cbErr);
    };
    //获取群成员角色
    webim.getRoleInGroup = function (options, cbOk, cbErr) {
      return proto_getRoleInGroup(options, cbOk, cbErr);
    };
    //设置群成员禁言时间
    webim.forbidSendMsg = function (options, cbOk, cbErr) {
      return proto_forbidSendMsg(options, cbOk, cbErr);
    };
    //发送自定义群系统通知
    webim.sendCustomGroupNotify = function (options, cbOk, cbErr) {
      return proto_sendCustomGroupNotify(options, cbOk, cbErr);
    };

    //进入大群
    webim.applyJoinBigGroup = function (options, cbOk, cbErr) {
      return proto_applyJoinBigGroup(options, cbOk, cbErr);
    };
    //退出大群
    webim.quitBigGroup = function (options, cbOk, cbErr) {
      return proto_quitBigGroup(options, cbOk, cbErr);
    };

    //资料关系链管理接口
    //
    //获取个人资料接口，可用于搜索用户
    webim.getProfilePortrait = function (options, cbOk, cbErr) {
      return proto_getProfilePortrait(options, cbOk, cbErr);
    };
    //设置个人资料
    webim.setProfilePortrait = function (options, cbOk, cbErr) {
      return proto_setProfilePortrait(options, cbOk, cbErr);
    };
    //申请加好友
    webim.applyAddFriend = function (options, cbOk, cbErr) {
      return proto_applyAddFriend(options, cbOk, cbErr);
    };
    //获取好友申请列表
    webim.getPendency = function (options, cbOk, cbErr) {
      return proto_getPendency(options, cbOk, cbErr);
    };
    //好友申请列表已读上报
    webim.getPendencyReport = function (options, cbOk, cbErr) {
      return proto_getPendencyReport(options, cbOk, cbErr);
    };
    //删除好友申请
    webim.deletePendency = function (options, cbOk, cbErr) {
      return proto_deletePendency(options, cbOk, cbErr);
    };
    //处理好友申请
    webim.responseFriend = function (options, cbOk, cbErr) {
      return proto_responseFriend(options, cbOk, cbErr);
    };
    //获取我的好友
    webim.getAllFriend = function (options, cbOk, cbErr) {
      return proto_getAllFriend(options, cbOk, cbErr);
    };
    //删除会话
    webim.deleteChat = function (options, cbOk, cbErr) {
      return proto_deleteChat(options, cbOk, cbErr);
    };
    //删除好友
    webim.deleteFriend = function (options, cbOk, cbErr) {
      return proto_deleteFriend(options, cbOk, cbErr);
    };
    //拉黑
    webim.addBlackList = function (options, cbOk, cbErr) {
      return proto_addBlackList(options, cbOk, cbErr);
    };
    //删除黑名单
    webim.deleteBlackList = function (options, cbOk, cbErr) {
      return proto_deleteBlackList(options, cbOk, cbErr);
    };
    //获取我的黑名单
    webim.getBlackList = function (options, cbOk, cbErr) {
      return proto_getBlackList(options, cbOk, cbErr);
    };

    //获取最近会话
    webim.getRecentContactList = function (options, cbOk, cbErr) {
      return proto_getRecentContactList(options, cbOk, cbErr);
    };

    //图片或文件服务接口
    //
    //上传文件接口（高版本浏览器）
    webim.uploadFile = webim.uploadPic = function (options, cbOk, cbErr) {
      return FileUploader.uploadFile(options, cbOk, cbErr);
    };
    //提交上传图片表单接口（用于低版本ie）
    webim.submitUploadFileForm = function (options, cbOk, cbErr) {
      return FileUploader.submitUploadFileForm(options, cbOk, cbErr);
    };
    //上传图片或文件(Base64)接口
    webim.uploadFileByBase64 = webim.uploadPicByBase64 = function (options, cbOk, cbErr) {
      //请求参数
      var opt = {
        'To_Account': options.toAccount,
        'Busi_Id': options.businessType,
        'File_Type': options.File_Type,
        'File_Str_Md5': options.fileMd5,
        'PkgFlag': UPLOAD_RES_PKG_FLAG.BASE64_DATA,
        'File_Size': options.totalSize,
        'Slice_Offset': 0,
        'Slice_Size': options.totalSize,
        'Slice_Data': options.base64Str,
        'Seq': nextSeq(),
        'Timestamp': unixtime(),
        'Random': createRandom() };

      return proto_uploadPic(opt, cbOk, cbErr);
    };

    //设置jsonp返回的值
    webim.setJsonpLastRspData = function (rspData) {
      jsonpLastRspData = typeof rspData == "string" ? JSON.parse(rspData) : rspData;
    };

    //获取长轮询ID
    webim.getLongPollingId = function (options, cbOk, cbErr) {
      return proto_getLongPollingId(options, cbOk, cbErr);
    };

    //获取下载地址
    webim.applyDownload = function (options, cbOk, cbErr) {
      return proto_applyDownload(options, cbOk, cbErr);
    };

    //获取下载地址
    webim.onDownFile = function (uuid) {
      window.open(Resources.downloadMap["uuid_" + uuid]);
    };

    //检查是否登录
    webim.checkLogin = function (cbErr, isNeedCallBack) {
      return checkLogin(cbErr, isNeedCallBack);
    };
  })(webim);
  return webim;
}();

/***/ }),

/***/ "../../../../../myapps/store/index.js":
/*!********************************!*\
  !*** D:/myapps/store/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // store
_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {
    appKey: null, //存储服务器发送给客户端的sessionkey
    // hostUrl:'http://192.168.10.22/services',
    // url:'http://192.168.10.58:8080/blade/services?f=',
    url: 'http://192.168.10.22/services?f=',
    uploadHostUrl: 'http://up.qiniup.com?token=',
    userInfo: null,
    statusHeight: 44,
    IMSDKAPPID: 1400132581,
    loginInfo: '', //聊天信息
    constants: {
      brand_type: 29, //品牌类别
      repair_type: 39, //维修类别
      serviceorder_file: 18, //报修附件
      shop_file: 26 //门店附件
    },
    notice: {
      todo: 1, //代办
      info: 2 //通知
    },
    noticeType: {
      'unSign': 0,
      'distributeWork': 1,
      'agressWork': 2,
      'refuseWork': 3,
      'applyCheck': 4,
      'passCheck': 5,
      'unpassCheck': 6,
      'applyDelay': 7,

      'applyEnd': 8,
      'agressDelay': 9,
      'unagressDelay': 10,
      'endWork': 11,
      'unagreeEndWork': 12,
      'deleteWork': 13,

      'resignWork': 14,
      'editWork': 15,
      'applyShenpi': 16,
      'shenqiPass': 17,
      'applyRefuse': 18,
      'newApplyCopy': 19,
      'checkFinish': 20,
      'point': 30 },

    noticeTypeZn: {
      0: '未分配',
      1: '分派任务',
      2: '接收任务',
      3: '拒收任务',
      4: '申请验收',
      5: '通过验收',
      6: '未通过验收',
      7: '申请延期',
      8: '申请终止',
      9: '同意延期',
      10: '未同意延期',
      11: '终止任务',
      12: '未同意终止',
      13: '删除任务',
      14: '转派任务',
      15: '修改任务',
      16: '申请审批',
      17: '审批通过',
      18: '审批驳回',
      19: '新建审批抄送',
      20: '审批完成',
      30: '指定流程负责人' },

    noticeTypeColor: {

      0: '#8c8c8c',
      1: '#5cdbd3',
      2: '#096dd9',
      3: '#ff7a45',
      4: '#9254de',
      5: '#52c41a',
      6: '#f5222d',
      7: '#d46b08',


      8: '#ffa940',
      9: '#614700',
      10: '#612500',
      11: '#002329',
      12: '#ad8b00',
      13: '#cf1322',

      14: '#69c0ff',
      15: '#14B4F2',
      16: '#14B4F2',
      17: '#14B4F2',
      18: '#14B4F2',
      19: '#14B4F2',
      20: '#7cb305',
      30: '#7cb305' },

    repairStatusZn: {
      0: '全部',
      1: '未处理',
      2: '处理中',
      3: '无效',
      4: '已完成' },

    repairStatus: {
      'all': 0,
      'untreated': 1,
      'treating': 2,
      'refuse': 3,
      'finish': 4 },

    repairStatusColor: {
      1: 'bg-green',
      2: 'bg-blue',
      3: 'bg-red',
      4: 'bg-purple' },

    userStatusZn: {
      1: '正常',
      2: '无业',
      3: '邀请中',
      4: '申请中',
      5: '离职' },

    userStatus: {
      'normal': 1,
      'free': 2,
      'inviting': 3,
      'applying': 4,
      'quit': 5 },

    province: '', //省份
    address: '', //详细地址
    repairSubID: '' //用于新增保修的报修ID;
  },

  mutations: {
    setUserInfo: function setUserInfo(state, userInfo) {
      this.state.userInfo = userInfo;
    },
    setProvince: function setProvince(state, province) {
      this.state.province = province;
    },
    setAddress: function setAddress(state, address) {
      this.state.address = address;
    },
    setLoginInfo: function setLoginInfo(state, loginInfo) {
      this.state.loginInfo = loginInfo;
    } } });var _default =




store;exports.default = _default;

/***/ }),

/***/ "./node_modules/@dcloudio/uni-app-plus/dist/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-app-plus/dist/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createPage = createPage;exports.createComponent = createComponent;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var SYNC_API_RE = /requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {params[_key - 1] = arguments[_key];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(void 0, [options].concat(params));
    }
    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(void 0, [Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      Promise.prototype.finally = function (callback) {
        var promise = this.constructor;
        return this.then(
        function (value) {return promise.resolve(callback()).then(function () {return value;});},
        function (reason) {return promise.resolve(callback()).then(function () {
            throw reason;
          });});

      };
    }));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var protocols = {};

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("app-plus ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("app-plus \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var returnValue = wx[options.name || methodName](arg1, arg2);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

function requireNativePlugin(pluginName) {
  /* eslint-disable no-undef */
  if (typeof weex !== 'undefined') {
    return weex.requireModule(pluginName);
  }
  /* eslint-disable no-undef */
  return __requireNativePlugin__(pluginName);
}

var api = /*#__PURE__*/Object.freeze({
  requireNativePlugin: requireNativePlugin });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {args[_key2 - 1] = arguments[_key2];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = 'onLoad';
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}
      return oldHook.apply(this, args);
    };
  }
  return MPPage(options);
};

var behavior = Behavior({
  created: function created() {
    initTriggerEvent(this);
  } });


Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (options.behaviors || (options.behaviors = [])).unshift(behavior);
  return MPComponent(options);
};

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function triggerLink(mpInstance, vueOptions) {
  mpInstance.triggerEvent('__l', mpInstance.$vm || vueOptions, {
    bubbles: true,
    composed: true });

}

function handleLink(event) {
  if (event.detail.$mp) {// vm
    if (!event.detail.$parent) {
      event.detail.$parent = this.$vm;
      event.detail.$parent.$children.push(event.detail);

      event.detail.$root = this.$vm.$root;
    }
  } else {// vueOptions
    if (!event.detail.parent) {
      event.detail.parent = this.$vm;
    }
  }
}

function initPage$1(pageOptions) {
  initComponent$1(pageOptions);
}

function initComponent$1(componentOptions) {
  componentOptions.methods.$getAppWebview = function () {
    return plus.webview.getWebviewById("".concat(this.__wxWebviewId__));
  };
}

function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function initHooks(mpOptions, hooks) {
  hooks.forEach(function (hook) {
    mpOptions[hook] = function (args) {
      return this.$vm.__call_hook(hook, args);
    };
  });
}

function getData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"app-plus","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function getBehaviors(vueOptions) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = String;
          vueProps['value'] = null;
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    Behavior({
      properties: getProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        Behavior({
          properties: getProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function getProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *'test'
                                                  */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var eventOpts = (event.currentTarget || event.target).dataset.eventOpts;
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && eventType === type) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handler = _this.$vm[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          handler.apply(_this.$vm, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName));

        }
      });
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$mp[vm.mpType];
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

var hooks = [
'onHide',
'onError',
'onPageNotFound',
'onUniNViewMessage'];


function initVm(vm) {
  if (this.$vm) {// 百度竟然 onShow 在 onLaunch 之前？
    return;
  }

  this.$vm = vm;

  this.$vm.$mp = {
    app: this };

}

function createApp(vm) {
  // 外部初始化时 Vue 还未初始化，放到 createApp 内部初始化 mixin
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        {// 头条的 selectComponent 竟然是异步的
          initRefs(this);
        }
        initMocks(this, mocks);
      }
    },
    created: function created() {// 处理 injections
      this.__init_injections(this);
      this.__init_provide(this);
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      initVm.call(this, vm);

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');

      this.$vm.__call_hook('onLaunch', args);
    },
    onShow: function onShow(args) {
      initVm.call(this, vm);

      this.$vm.__call_hook('onShow', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks); // 延迟执行，因为 App 的注册在 main.js 之前，可能导致生命周期内 Vue 原型上开发者注册的属性无法访问

  App(appOptions);

  return vm;
}

var hooks$1 = [
'onShow',
'onHide',
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap',
'onBackPress',
'onNavigationBarButtonTap',
'onNavigationBarSearchInputChanged',
'onNavigationBarSearchInputConfirmed',
'onNavigationBarSearchInputClicked'];


function initVm$1(VueComponent) {// 百度的 onLoad 触发在 attached 之前
  if (this.$vm) {
    return;
  }

  this.$vm = new VueComponent({
    mpType: 'page',
    mpInstance: this });


  this.$vm.__call_hook('created');
  this.$vm.$mount();
}

function createPage(vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = _vue.default.extend(vueOptions);
  }
  var pageOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: getData(vueOptions, _vue.default.prototype),
    lifetimes: { // 当页面作为组件时
      attached: function attached() {
        initVm$1.call(this, VueComponent);
      },
      ready: function ready() {
        this.$vm.__call_hook('beforeMount');
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    methods: { // 作为页面时
      onLoad: function onLoad(args) {
        initVm$1.call(this, VueComponent);
        this.$vm.$mp.query = args; // 又要兼容 mpvue
        this.$vm.__call_hook('onLoad', args); // 开发者可能会在 onLoad 时赋值，提前到 mount 之前
      },
      onUnload: function onUnload() {
        this.$vm.__call_hook('onUnload');
      },
      __e: handleEvent,
      __l: handleLink } };



  initHooks(pageOptions.methods, hooks$1);

  initPage$1(pageOptions);

  return Component(pageOptions);
}

function initVm$2(VueComponent) {
  if (this.$vm) {
    return;
  }

  var options = {
    mpType: 'component',
    mpInstance: this,
    propsData: this.properties };

  // 初始化 vue 实例
  this.$vm = new VueComponent(options);

  // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
  var vueSlots = this.properties.vueSlots;
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    this.$vm.$scopedSlots = this.$vm.$slots = $slots;
  }
  // 性能优先，mount 提前到 attached 中，保证组件首次渲染数据被合并
  // 导致与标准 Vue 的差异，data 和 computed 中不能使用$parent，provide等组件属性
  this.$vm.$mount();
}

function createComponent(vueOptions) {
  vueOptions = vueOptions.default || vueOptions;

  var behaviors = getBehaviors(vueOptions);

  var properties = getProperties(vueOptions.props, false, vueOptions.__file);

  var VueComponent = _vue.default.extend(vueOptions);

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: getData(vueOptions, _vue.default.prototype),
    behaviors: behaviors,
    properties: properties,
    lifetimes: {
      attached: function attached() {
        initVm$2.call(this, VueComponent);
      },
      ready: function ready() {
        initVm$2.call(this, VueComponent); // 目前发现部分情况小程序 attached 不触发
        triggerLink(this); // 处理 parent,children

        // 补充生命周期
        this.$vm.__call_hook('created');
        this.$vm.__call_hook('beforeMount');
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __e: handleEvent,
      __l: handleLink } };



  initComponent$1(componentOptions);

  return Component(componentOptions);
}

var uni = {};

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'upx2px') {
        return upx2px;
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  uni.upx2px = upx2px;

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$mp && vm.$mp[vm.mpType]){
        return vm.$mp[vm.mpType].is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          !vm._getFormData && warn(//fixed by xxxxxx uni://form-field 时不告警
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"app-plus","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$mp[vm.mpType];
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"app-plus","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$mp[vm.mpType];
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"app-plus","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$mp[vm.mpType];
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
    // 确保当前 vm 所有数据被同步
    var dataKeys = [].concat(
        Object.keys(vm._data || {}),
        Object.keys(vm._computedWatchers || {}));

    var ret = dataKeys.reduce(function(ret, key) {
        ret[key] = vm[key];
        return ret
    }, Object.create(null));
    //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
    Object.assign(ret, vm.$mp.data || {});
    if (
        Array.isArray(vm.$options.behaviors) &&
        vm.$options.behaviors.indexOf('uni://form-field') !== -1
    ) { //form-field
        ret['name'] = vm.name;
        ret['value'] = vm.value;
    }
    return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
    var this$1 = this;

    if (vnode === null) { //destroy
        return
    }
    if (this.mpType === 'page' || this.mpType === 'component') {
        var mpInstance = this.$mp[this.mpType];
        var data = cloneWithData(this);
        data.__webviewId__ = mpInstance.data.__webviewId__;
        var mpData = Object.create(null);
        Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
            mpData[key] = mpInstance.data[key];
        });
        var diffData = diff(data, mpData);
        if (Object.keys(diffData).length) {
            if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"app-plus","BASE_URL":"/"}).VUE_APP_DEBUG) {
                console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
                    ']差量更新',
                    JSON.stringify(diffData));
            }
            this.__next_tick_pending = true;
            mpInstance.setData(diffData, function () {
                this$1.__next_tick_pending = false;
                flushCallbacks$1(this$1);
            });
        } else {
            flushCallbacks$1(this);
        }
    }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
    var parts = path.split('.');
    var key = parts[0];
    if (key.indexOf('__$n') === 0) { //number index
        key = parseInt(key.replace('__$n', ''));
    }
    if (parts.length === 1) {
        return obj[key]
    }
    return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

    var oldEmit = Vue.prototype.$emit;

    Vue.prototype.$emit = function(event) {
        if (this.$mp && event) {
            this.$mp[this.mpType]['triggerEvent'](event, {
                __args__: toArray(arguments, 1)
            });
        }
        return oldEmit.apply(this, arguments)
    };
    
    Vue.prototype.$nextTick = function (fn) {
      return nextTick$1(this, fn)
    };

    MP_METHODS.forEach(function (method) {
        Vue.prototype[method] = function(args) {
            if (this.$mp) {
                return this.$mp[this.mpType][method](args)
            }
        };
    });

    Vue.prototype.__init_provide = initProvide;

    Vue.prototype.__init_injections = initInjections;

    Vue.prototype.__call_hook = function(hook, args) {
        var vm = this;
        // #7573 disable dep collection when invoking lifecycle hooks
        pushTarget();
        var handlers = vm.$options[hook];
        var info = hook + " hook";
        var ret;
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit('hook:' + hook);
        }
        popTarget();
        return ret
    };

    Vue.prototype.__set_model = function(target, key, value, modifiers) {
        if (Array.isArray(modifiers)) {
            if (modifiers.indexOf('trim') !== -1) {
                value = value.trim();
            }
            if (modifiers.indexOf('number') !== -1) {
                value = this._n(value);
            }
        }
        target[key] = value;
    };

    Vue.prototype.__set_sync = function(target, key, value) {
        target[key] = value;
    };

    Vue.prototype.__get_orig = function(item) {
        if (isPlainObject(item)) {
            return item['$orig'] || item
        }
        return item
    };

    Vue.prototype.__get_value = function(dataPath, target) {
        return getTarget(target || this, dataPath)
    };


    Vue.prototype.__get_class = function(dynamicClass, staticClass) {
        return renderClass(staticClass, dynamicClass)
    };

    Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
        if (!dynamicStyle && !staticStyle) {
            return ''
        }
        var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
        var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
        return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
    };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vuex/dist/vuex.esm.js":
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

}]);