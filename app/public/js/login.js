webpackJsonp([7],{

/***/ 12:
/***/ (function(module, exports) {

module.exports = hdbr;

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var config_1 = __webpack_require__(62);
var handlebars_1 = __webpack_require__(196);
function default_1() {
    handlebars_1.registerHelper('BASE_URL', function () {
        return config_1.get().BASE_URL;
    });
}
exports["default"] = default_1;
;


/***/ }),

/***/ 268:
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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var Component_1 = __webpack_require__(33);
var request_1 = __webpack_require__(39);
var config_1 = __webpack_require__(62);
var BASE_URL_1 = __webpack_require__(234);
BASE_URL_1["default"]();
var template = __webpack_require__(479);
var datas = {
    username: 'admin',
    password: 'admin',
    captcha: ''
};
var login = (function (_super) {
    __extends(login, _super);
    function login(el) {
        return _super.call(this, { el: el, template: template }) || this;
    }
    login.prototype.beforeRender = function () {
    };
    login.prototype.afterRender = function () {
        var _this = this;
        document.onkeydown = function (e) {
            if ((e.keyCode || e.which) == 13) {
                _this.onLogins();
            }
        };
    };
    login.prototype.warning = function (ss) {
        var war = document.getElementById("warning");
        war.style.color = '#e2644c';
        document.getElementById("warText").innerText = ss;
    };
    login.prototype.onLogins = function () {
        var _this = this;
        datas.username = document.getElementById("userName").value;
        datas.password = document.getElementById("userId").value;
        datas.captcha = document.getElementById("imgPassword").value;
        if (datas.username.match("[0-9.a-zA-Z]{0,26}@[0-9.a-z]{0,20}.[0-9a-z]{0,8}") != null && datas.password.match("[0-9a-z]{6,15}") != null) {
            //-----------------------------注册操作操作
            request_1.post('./appdist/login', {
                data: __assign({}, datas),
                responseType: 'json',
                timeout: 1000,
                async: true
            }).then(function (_a) {
                var data = _a.data;
                if (data.returnCode == 0 && data.bean.code == '0') {
                    window.location.href = 'homePage.html';
                }
                else if (data.returnCode == 0 && data.bean.code == '1') {
                    _this.warning(data.returnMessage);
                    document.getElementById('imgPass').src = config_1.get().BASE_URL + "appdist/imgVerification?" + Date.now();
                    datas.captcha = '';
                }
            });
        }
        else {
            this.warning("帐号或密码不规范");
        }
    };
    login.prototype.onRegists = function () {
        window.location.href = 'register.html';
    };
    login.prototype.onImgClick = function () {
        document.getElementById('imgPass').src = config_1.get().BASE_URL + "appdist/imgVerification?" + Date.now();
        datas.captcha = '';
    };
    return login;
}(Component_1["default"]));
exports["default"] = login;


/***/ }),

/***/ 479:
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(12);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	<div id=\"indexImg\">\n        <a href=\"login.html\"> <img src=\"img/logo.png\" alt=\"首页\"> </a>\n    </div>\n 	<div id=\"title\"><span>登录</span></div>\n	<div id=\"warning\"><ul><li id=\"warText\"></li></ul></div>\n 	<input type=\"text\" id=\"userName\" placeholder=\"邮箱\"></input>\n 	<input type=\"password\" id=\"userId\" placeholder=\"密码\"></input>\n 	<div id=\"ff\">\n 	<img id=\"imgPass\" src=\""
    + container.escapeExpression(((helper = (helper = helpers.BASE_URL || (depth0 != null ? depth0.BASE_URL : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"BASE_URL","hash":{},"data":data}) : helper)))
    + "appdist/imgVerification\" data-event=\"click:imgClick\">\n 	<input type=\"text\" id=\"imgPassword\" placeholder=\"验证码\"></input>\n 	</div>\n 	<a id=\"loginBtn\" data-event=\"click:logins\">登录</a>\n 	<a id=\"registerBtn\" data-event=\"click:regists\">注册</a>";
},"useData":true});

/***/ }),

/***/ 507:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(25));
var login1_1 = __webpack_require__(268);
new login1_1["default"]('#login');


/***/ })

},[507]);