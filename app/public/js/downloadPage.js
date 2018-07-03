webpackJsonp([5],{

/***/ 12:
/***/ (function(module, exports) {

module.exports = hdbr;

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function isLeapYear(year) {
    var date = new Date(year, 1, 29);
    return date.getDate() === 29;
}
function strPad(str, len, salat) {
    if (salat === void 0) { salat = '0'; }
    if (str.length === len) {
        return str;
    }
    else if (str.length > len) {
        return str.substr(-len);
    }
    else {
        return salat.repeat(len - str.length) + str;
    }
}
var format_reg = /YYYY|YY|MM|DD|hh|mm|ss|ms/g;
var DateObj = (function () {
    function DateObj(value) {
        var _date;
        if (!value) {
            _date = new Date();
        }
        else if (value instanceof Date) {
            _date = new Date(+value);
        }
        else if (typeof value === 'number' || typeof value === 'string') {
            _date = new Date(value);
        }
        else {
            console.error('arguments is not avalible');
            throw 'arguments is not avalible';
        }
        this._date = _date;
    }
    /**
     * 字符串实例化为Date对象
     * @static
     */
    DateObj.parse = function (string) {
        return new DateObj(Date.parse(string));
    };
    /**
     * 当前日期时间对象
     * @static
     */
    DateObj.now = function () {
        return new DateObj(Date.now());
    };
    /**
     * 会否为闰年
     * @readonly 只读属性
     */
    DateObj.prototype.isLeapYear = function () {
        return isLeapYear(this.getYear());
    };
    /**
     * 获取当前年份，4位字符串
     */
    DateObj.prototype.getYear = function () {
        return this._date.getFullYear();
    };
    DateObj.prototype.seYear = function (year) {
        this._date.setFullYear(year);
    };
    DateObj.prototype.getMonth = function () {
        return this._date.getMonth() + 1;
    };
    DateObj.prototype.seMonth = function (month) {
        this._date.setMonth(month - 1);
    };
    DateObj.prototype.geDayOfMonth = function () {
        return this._date.getDate();
    };
    DateObj.prototype.setDayOfMonth = function (day) {
        this._date.setDate(day);
    };
    DateObj.prototype.getHours = function () {
        return this._date.getHours();
    };
    DateObj.prototype.setHours = function (hours) {
        this._date.setHours(hours);
    };
    DateObj.prototype.getMinutes = function () {
        return this._date.getMinutes();
    };
    DateObj.prototype.setMinutes = function (minutes) {
        this._date.setMinutes(minutes);
    };
    DateObj.prototype.getSeconds = function () {
        return this._date.getSeconds();
    };
    DateObj.prototype.setSeconds = function (seconds) {
        this._date.setSeconds(seconds);
    };
    DateObj.prototype.getMilliseconds = function () {
        return this._date.getMilliseconds();
    };
    DateObj.prototype.setMilliseconds = function (milliseconds) {
        this._date.setMilliseconds(milliseconds);
    };
    DateObj.prototype.getTime = function () {
        return this._date.getTime();
    };
    DateObj.prototype.setTime = function (time) {
        this._date.setTime(time);
    };
    DateObj.prototype.toString = function () {
        return this._date.toString();
    };
    DateObj.prototype.toJSON = function (key) {
        return this._date.toJSON(key);
    };
    DateObj.prototype.valueOf = function () {
        return this._date.valueOf();
    };
    /**
     * 格式化日期对象
     * Example:
     * -
     * ```
     * format('YYYY-MM-DD') == > 2017-08-08
     * ```
     * -
     * ```
     * format('YYYY-MM-DD hh:mm:ss') == > 2017-08-08 20:05:40
     * ```
     */
    DateObj.prototype.format = function (formatstr) {
        var _this = this;
        return formatstr.replace(format_reg, function (str) {
            var result = '';
            switch (str) {
                case "YYYY":
                    result = '' + _this.getYear();
                    break;
                case "YY":
                    result = strPad('' + _this.getYear(), 2);
                    break;
                case "MM":
                    result = strPad('' + _this.getMonth(), 2);
                    break;
                case "DD":
                    result = strPad('' + _this.geDayOfMonth(), 2);
                    break;
                case "hh":
                    result = strPad('' + _this.getHours(), 2);
                    break;
                case "mm":
                    result = strPad('' + _this.getMinutes(), 2);
                    break;
                case "ss":
                    result = strPad('' + _this.getSeconds(), 2);
                    break;
                case "ms":
                    result = '' + _this.getMilliseconds();
                    break;
                default:
                    break;
            }
            return result;
        });
    };
    return DateObj;
}());
exports["default"] = DateObj;


/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(12);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"container\">\n	<div class=\"left\">\n		<img src=\"img/download_pattern_left.png\" />\n	</div>\n	<div id=\"main\" class=\"main\">\n		<div class=\"top\">\n			<div class=\"logo\">\n				<img src="
    + alias4(((helper = (helper = helpers.iconurl || (depth0 != null ? depth0.iconurl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"iconurl","hash":{},"data":data}) : helper)))
    + " />\n			</div>\n			<div class=\"qrcode\">\n				<img src="
    + alias4(((helper = (helper = helpers.qrcode || (depth0 != null ? depth0.qrcode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"qrcode","hash":{},"data":data}) : helper)))
    + " />\n			</div>\n		</div>\n		<h1 class=\"appname\">\n					<img src="
    + alias4(((helper = (helper = helpers.iconurl || (depth0 != null ? depth0.iconurl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"iconurl","hash":{},"data":data}) : helper)))
    + " />\n					<span>"
    + alias4(((helper = (helper = helpers.appname || (depth0 != null ? depth0.appname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"appname","hash":{},"data":data}) : helper)))
    + "</span>\n				</h1>\n		<p class=\"scan-tip\">扫描二维码下载<br>或用手机浏览器输入这个网址:&nbsp;&nbsp;<span class=\"text-black\">"
    + alias4(((helper = (helper = helpers.downurl || (depth0 != null ? depth0.downurl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"downurl","hash":{},"data":data}) : helper)))
    + "</span></p>\n		<div class=\"release-info\">\n			<p><span itemprop=\"softwareVersion\">"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + " (Build "
    + alias4(((helper = (helper = helpers.bundleid || (depth0 != null ? depth0.bundleid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bundleid","hash":{},"data":data}) : helper)))
    + ")\n                - "
    + alias4(((helper = (helper = helpers.size || (depth0 != null ? depth0.size : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"size","hash":{},"data":data}) : helper)))
    + " MB</span></p>\n			<p>更新于: <span itemprop=\"datePublished\">"
    + alias4(((helper = (helper = helpers.updated_at || (depth0 != null ? depth0.updated_at : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"updated_at","hash":{},"data":data}) : helper)))
    + "</span></p>\n		</div>\n		<!--<div id=\"actions\" class=\"actions type-android\">\n	<button data-event=\"click:addRecord\">下载安装</button>\n</div>-->\n		<div class=\"store-section section\">\n			"
    + ((stack1 = ((helper = (helper = helpers.loadButton || (depth0 != null ? depth0.loadButton : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"loadButton","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n		</div>\n		<div class=\"desc-section section\">\n			<h2>应用描述</h2>\n			<pre>【软件介绍】 "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "\n</pre>\n		</div>\n	</div>\n	<div class=\"right\">\n		<img src=\"img/download_pattern_right.png\" />\n	</div>\n</div>\n<div class=\"footer-wrapper\"></div>";
},"useData":true});

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(12);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"footer\">\n	<div class=\"footer-text\">为了获取更佳的操作体验，建议请使用：1200*768及以上分辨率，IE11及以上版本浏览器</div>\n	<div class=\"footer-text\">版权所有©中移在线服务有限公司</div>\n</div>";
},"useData":true});

/***/ }),

/***/ 503:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(25));
var Component_1 = __webpack_require__(33);
var dom_1 = __webpack_require__(56);
var request_1 = __webpack_require__(39);
var url_1 = __webpack_require__(57);
var date_1 = __webpack_require__(191);
var template = __webpack_require__(261);
var errTpl = __webpack_require__(80);
var footerTpl = __webpack_require__(47);
var test = (function (_super) {
    __extends(test, _super);
    function test(el) {
        return _super.call(this, {
            el: el,
            template: template
        }) || this;
    }
    test.prototype.beforeRender = function () {
        var _this = this;
        //获取url中参数
        var id = url_1.queryToObj().id || 1;
        //获取对应的app信息
        return request_1.get("./appdist/getappinfo/" + id, {}).then(function (_a) {
            var data = _a.data;
            var bean = data.beans;
            var apkurl = bean.apkurl, ipaurl = bean.ipaurl;
            bean.loadButton = _this.getLoadButton(apkurl, ipaurl);
            bean.updated_at = new date_1["default"](bean.updated_at).format('YYYY-MM-DD hh:mm:ss');
            return bean;
        }, function (err) {
            _this.renderTplToNode(errTpl, { err: err }, _this.domNode, dom_1.IPosition.Replace);
        });
    };
    test.prototype.afterRender = function () {
        this.renderTplToNode(footerTpl, {}, this.domNode.querySelector(".footer-wrapper"), dom_1.IPosition.LastIn);
    };
    test.prototype.getLoadButton = function (apkurl, ipaurl) {
        var agent = navigator.userAgent;
        var btnHtml = '';
        //不同设备返回不同的下载链接按钮
        if (agent.indexOf('Android') > -1 || agent.indexOf('Adr') > -1) {
            if (apkurl) {
                btnHtml = "<a href=" + apkurl + " class=\"store-link\" data-event=\"click:addRecord\">\u7ACB\u5373\u4E0B\u8F7D(android)</a>";
            }
            else {
                btnHtml = "<a class=\"store-link\" >\u6CA1\u6709android\u7248\u672C</a>";
            }
        }
        else if (!!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            if (ipaurl) {
                btnHtml = "<a href=" + ipaurl + " class=\"store-link\" data-event=\"click:addRecord\">\u7ACB\u5373\u4E0B\u8F7D(ios)</a>";
            }
            else {
                btnHtml = "<a class=\"store-link\" >\u6CA1\u6709ios\u7248\u672C</a>";
            }
        }
        else {
            if (ipaurl) {
                btnHtml += "<a href=" + ipaurl + " class=\"store-link\" data-event=\"click:addRecord\"><img src=\"img/iosx.png\"/></a>";
            }
            if (apkurl) {
                btnHtml += "<a  href=" + apkurl + " class=\"store-link\" data-event=\"click:addRecord\"><img src=\"img/azx.png\"/></a>";
            }
            if (!ipaurl && !apkurl) {
                btnHtml = "<a class=\"store-link\" >\u4E0B\u8F7D\u8D44\u6E90\u4E0D\u5B58\u5728</a>";
            }
        }
        return btnHtml;
    };
    test.prototype.onAddRecord = function () {
        var appid = parseInt(url_1.queryToObj().id) || 1;
        var ip = returnCitySN["cip"]; //搜狐接口提供
        request_1.post('./appdist/downloads/add', {
            data: {
                appid: appid,
                ip: ip
            }
        }).then(function (_a) {
            var data = _a.data;
            alert(data.returnMessage);
        });
    };
    return test;
}(Component_1["default"]));
new test('#container');


/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(12);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"alert-bar\">\n    <div class=\"inner\">\n        <p ng-bind=\"errors\" class=\"ng-binding\">请求出错："
    + container.escapeExpression(((helper = (helper = helpers.err || (depth0 != null ? depth0.err : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"err","hash":{},"data":data}) : helper)))
    + "</p>\n    </div>\n</div>";
},"useData":true});

/***/ })

},[503]);