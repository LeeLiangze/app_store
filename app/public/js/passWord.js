webpackJsonp([9],{

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(24);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<header>\n	<!-- 头部logo 和退出按钮 -->\n	<div class=\"indexImg\">\n		<a href=\"homePage.html\"> <img src=\"http://www.10086.cn/ha_head/images/logo.png\" alt=\"首页\"> </a>\n	</div>\n	<a id=\"signout_button\" class=\"signout_button\" href=\"javascript:void(0);\" data-event=\"click:logout\">退出登录</a>\n</header>\n<form action=\"\">\n	<input type=\"text\" value=\""
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "\" name=\"user_name\" class=\"user_name\" id=\"user_name\">\n</form>\n<nav id=\"tabs\">\n	<ul>\n		<li id=\"tabs_info\">\n			<a href=\"userCenter.html?id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n				<div class=\"icon icon_user\"></div>\n				<div class=\"text\">个人资料</div>\n			</a>\n		</li>\n		<li id=\"tabs_pwd\" class=\"tab_selected\">\n			<a href=\"javascript:void(0);\">\n				<div class=\"icon icon_pwd\"></div>\n				<div class=\"text\">修改密码</div>\n			</a>\n		</li>\n	</ul>\n</nav>\n<form action=\"\" id=\"user_input_pwd\">\n	<ul>\n		<li>\n			<input type=\"password\" name=\"pwd_now\" id=\"pwd_now\" placeholder=\"当前密码\">\n		</li>\n		<li>\n			<input type=\"password\" name=\"pwd_new\" id=\"pwd_new\" placeholder=\"新密码\">\n		</li>\n		<li>\n			<input type=\"password\" name=\"pwd_again\" id=\"pwd_again\" placeholder=\"确认密码\">\n		</li>\n	</ul>\n	<div id=\"pwd_submit\" class=\"pwd_submit\" data-event=\"click:change\">修改密码</div>\n</form>";
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
exports.__esModule = true;
var Component_1 = __webpack_require__(29);
var request_1 = __webpack_require__(30);
var url_1 = __webpack_require__(47);
__webpack_require__(23);
var template = __webpack_require__(261);
var passWord = (function (_super) {
    __extends(passWord, _super);
    function passWord(el) {
        return _super.call(this, { el: el, template: template }) || this;
    }
    passWord.prototype.beforeRender = function () {
        var id = url_1.queryToObj().id;
        if (!id) {
            alert('请登录');
            window.location.href = 'login.html';
        }
        return request_1.get("./appdist/userCenter/" + id, {}).then(function (_a) {
            var data = _a.data;
            var datas = data.beans;
            return datas;
        });
    };
    passWord.prototype.afterRender = function () {
    };
    passWord.prototype.onChange = function () {
        var pwdNow = document.getElementById("pwd_now").value;
        var pwdNew = document.getElementById("pwd_new").value;
        var pwdAgain = document.getElementById("pwd_again").value;
        if (pwdNow.match("[0-9a-z]{6,15}") == null) {
            alert("原密码为空或不规范");
            return;
        }
        if (pwdNew.match("[0-9a-z]{6,15}") == null) {
            alert("新密码为空或不规范");
            return;
        }
        if (pwdAgain.match("[0-9a-z]{6,15}") == null) {
            alert("确认密码为空或不规范");
            return;
        }
        if (pwdNew != pwdAgain) {
            alert('两次输入的密码不一致');
            return;
        }
        this.data.pass = pwdAgain;
        this.data.oldPass = pwdNow;
        request_1.put("./appdist/passUpdate", { data: this.data }).then(function (_a) {
            var data = _a.data;
            var datas = data.beans;
            if (datas == '修改成功') {
                alert('修改成功');
            }
            else if (datas == '原密码错误') {
                alert('原密码错误');
            }
        });
    };
    passWord.prototype.onLogout = function () {
        request_1.post("./appdist/logout", {}).then(function (_a) {
            var data = _a.data;
            var datas = data.beans;
            if (datas == "退出成功") {
                alert('退出成功');
                window.location.href = 'login.html';
            }
            else {
                alert('请重试');
            }
        });
    };
    return passWord;
}(Component_1["default"]));
new passWord('#passWord');


/***/ })

},[503]);