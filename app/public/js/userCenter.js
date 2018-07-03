webpackJsonp([8],{

/***/ 12:
/***/ (function(module, exports) {

module.exports = hdbr;

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(12);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<header>\n    <!-- 头部logo 和退出按钮 -->\n    <div class=\"indexImg\">\n        <a href=\"homePage.html\"> <img src=\"img/logo.png\" alt=\"首页\"> </a>\n    </div>\n    <a id=\"signout_button\" class=\"signout_button\" href=\"javascript:void(0);\" data-event=\"click:logout\">退出登录</a>\n</header>\n<div class=\"user_name\" id=\"user_name\">"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</div>\n<nav id=\"tabs\">\n    <ul>\n        <li id=\"tabs_info\" class=\"tab_selected\" data-event=\"click:tabsInfo\">\n            <div class=\"icon icon_user\"></div>\n            <div class=\"text\">个人资料</div>\n        </li>\n        <li id=\"tabs_pwd\" class=\"\" data-event=\"click:tabsPwd\">\n            <div class=\"icon icon_pwd\"></div>\n            <div class=\"text\">修改密码</div>\n        </li>\n    </ul>\n</nav>\n<div class=\"user_box\">\n\n    <div id=\"user_input\" style=\"left:0px;\">\n        <ul>\n            <li class=\"user_email\">\n                <label for=\"user_email\" class=\"label\">邮箱</label>\n                <div class=\"show_value\">\n                    <input type=\"text\" name=\"user_email\" value=\""
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "\" readonly=\"\">\n                </div>\n                <div class=\"icon_edit hide\"></div>\n            </li>\n            <li class=\"input_edit user_tel \">\n                <label for=\"tel_value\">电话</label>\n                <div class=\"show_value\">\n                    <input type=\"text\" name=\"user_null\" id=\"tel_showValue\" value=\""
    + alias4(((helper = (helper = helpers.pno || (depth0 != null ? depth0.pno : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pno","hash":{},"data":data}) : helper)))
    + "\" readonly=\"\">\n                </div>\n                <div class=\"icon_edit\" id=\"tel_icon\"></div>\n                <div class=\"edit_value hide\">\n                    <input class=\"\" type=\"text\" id=\"tel_value\" value=\""
    + alias4(((helper = (helper = helpers.pno || (depth0 != null ? depth0.pno : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pno","hash":{},"data":data}) : helper)))
    + "\">\n                    <div class=\"btn tel_save\" id=\"tel_save\" data-event=\"click:telSave\">保存</div>\n                </div>\n            </li>\n            <li class=\"input_edit user_dep \">\n                <label for=\"dep_value\">部门</label>\n                <div class=\"show_value\">\n                    <input type=\"text\" id=\"dep_showValue\" value=\""
    + alias4(((helper = (helper = helpers.department || (depth0 != null ? depth0.department : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"department","hash":{},"data":data}) : helper)))
    + "\" readonly=\"\">\n                </div>\n                <div class=\"icon_edit\" id=\"dep_icon\"></div>\n                <div class=\"edit_value hide\">\n                    <input class=\"\" type=\"text\" id=\"dep_value\" placeholder=\"可选\" value=\""
    + alias4(((helper = (helper = helpers.department || (depth0 != null ? depth0.department : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"department","hash":{},"data":data}) : helper)))
    + "\">\n                    <div class=\"btn dep_save\" id=\"dep_save\" data-event=\"click:depSave\">保存</div>\n                </div>\n            </li>\n        </ul>\n\n    </div>\n    <div id=\"user_input_pwd\" style=\"right:-500px;\">\n        <ul>\n            <li>\n                <input type=\"password\" name=\"pwd_now\" id=\"pwd_now\" placeholder=\"当前密码\">\n            </li>\n            <li>\n                <input type=\"password\" name=\"pwd_new\" id=\"pwd_new\" placeholder=\"新密码\">\n            </li>\n            <li>\n                <input type=\"password\" name=\"pwd_again\" id=\"pwd_again\" placeholder=\"确认密码\">\n            </li>\n        </ul>\n        <div id=\"pwd_submit\" class=\"pwd_submit\" data-event=\"click:change\">修改密码</div>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ 510:
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
var request_1 = __webpack_require__(39);
var url_1 = __webpack_require__(57);
var template = __webpack_require__(264);
var userCenter = (function (_super) {
    __extends(userCenter, _super);
    function userCenter(el) {
        return _super.call(this, { el: el, template: template }) || this;
    }
    userCenter.prototype.beforeRender = function () {
        // 用户中心
        var id = url_1.queryToObj().id;
        if (!id) {
            alert('请登录');
            window.location.href = 'login.html';
        }
        return request_1.get("./appdist/userCenter/" + id, {}).then(function (_a) {
            var data = _a.data;
            return data.beans;
        }, function (data) {
            if (data == '请登录') {
                alert('登录超时，请重新登录');
                window.location.href = 'login.html';
            }
            else {
                window.location.href = '404.html';
            }
        });
    };
    userCenter.prototype.afterRender = function () {
        this.clickChange('tel');
        this.clickChange('dep');
    };
    //获取id
    userCenter.prototype.$id = function (id) { return document.getElementById(id); };
    //添加类
    userCenter.prototype.addClass = function (obj, Class) { obj.setAttribute("class", obj.getAttribute("class") + " " + Class); };
    //删除/替换类
    userCenter.prototype.repClass = function (obj, Class1, Class2) { obj.setAttribute("class", obj.getAttribute("class").replace(Class1, Class2 || '')); };
    //改变点击/保存按钮的状态
    userCenter.prototype.clickChange = function (select) {
        var that = this;
        this.$id(select + '_icon').onclick = function () {
            that.addClass(this.parentNode, 'now_edit');
            var thatDom = that.$id(select + '_value');
            thatDom.focus();
            if (thatDom.setSelectionRange)
                thatDom.setSelectionRange(0, thatDom.value.length);
        };
    };
    //点击保存按钮时执行的公共方法
    userCenter.prototype.clickSave = function (select, value) {
        var _this = this;
        //和数据库中的字段相对应。
        var mySqlConfig = {
            'tel': 'pno',
            'dep': 'department'
        };
        var mysqlSel = mySqlConfig[select];
        this.data[mysqlSel] = value;
        request_1.put("./appdist/userUpdate", { data: this.data }).then(function (_a) {
            var data = _a.data;
            var dataValue = data.beans[mysqlSel];
            if (dataValue) {
                // 将后台返回的数据添加到页面中
                _this.$id(select + '_showValue').value = dataValue;
            }
        }, function (data) {
            if (data == '请登录') {
                alert('登录超时，请重新登录');
                window.location.href = 'login.html';
            }
            else {
                window.location.href = '404.html';
            }
        });
        this.repClass(this.$id(select + '_icon').parentNode, 'now_edit');
    };
    //点击保存手机号按钮
    userCenter.prototype.onTelSave = function () {
        var value = this.$id('tel_value').value;
        if (!value.match(/^1[34578]\d{9}$/)) {
            alert('手机号输入错误');
            return;
        }
        this.clickSave('tel', value);
    };
    // 点击保存部门按钮
    userCenter.prototype.onDepSave = function () {
        var value = this.$id('dep_value').value;
        this.clickSave('dep', value);
    };
    // 点击修改密码按钮
    userCenter.prototype.onChange = function () {
        var checkPwd = this.checkPwd();
        if (!checkPwd) {
            return;
        }
        ;
        this.data.pass = checkPwd.pwdAgain;
        this.data.oldPass = checkPwd.pwdNow;
        request_1.put("./appdist/passUpdate", { data: this.data }).then(function (_a) {
            var data = _a.data;
            var datas = data.beans;
            if (datas == '修改成功')
                alert('修改成功');
        }, function (data) {
            if (data == '原密码错误') {
                alert('原密码错误');
            }
            else if (data == '请登录') {
                alert('登录超时，请重新登录');
                window.location.href = 'login.html';
            }
            else {
                window.location.href = '404.html';
            }
        });
    };
    //退出登录
    userCenter.prototype.onLogout = function () {
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
    // 点击切换到修改个人信息tab
    userCenter.prototype.onTabsInfo = function () {
        var tabsInfo = this.$id('tabs_info');
        var tabsPwd = this.$id('tabs_pwd');
        var Info = this.$id('user_input');
        var Pwd = this.$id('user_input_pwd');
        //当点击自己时，啥都不干。
        if (tabsInfo.getAttribute("class").indexOf('tab_selected') != '-1') {
            return;
        }
        this.addClass(tabsInfo, 'tab_selected');
        Info.setAttribute('style', 'left:0px;');
        Pwd.setAttribute('style', 'right:-500px;');
        this.repClass(tabsPwd, 'tab_selected');
    };
    // 点击切换到修改密码tab
    userCenter.prototype.onTabsPwd = function () {
        var tabsInfo = this.$id('tabs_info');
        var tabsPwd = this.$id('tabs_pwd');
        var Info = this.$id('user_input');
        var Pwd = this.$id('user_input_pwd');
        //当点击自己时，啥都不干。
        if (tabsPwd.getAttribute("class").indexOf('tab_selected') != '-1') {
            return;
        }
        this.addClass(tabsPwd, 'tab_selected');
        Info.setAttribute('style', 'left:-500px;');
        Pwd.setAttribute('style', 'right:0px;');
        this.repClass(tabsInfo, 'tab_selected');
    };
    // 密码验证公用方法
    userCenter.prototype.checkPwd = function () {
        var pwdNow = this.$id('pwd_now').value;
        var pwdNew = this.$id('pwd_new').value;
        var pwdAgain = this.$id('pwd_again').value;
        if (pwdNow.match("[0-9a-z]{6,15}") == null) {
            alert("原密码为空或不规范");
            return false;
        }
        if (pwdNew.match("[0-9a-z]{6,15}") == null) {
            alert("新密码为空或不规范");
            return false;
        }
        if (pwdAgain.match("[0-9a-z]{6,15}") == null) {
            alert("确认密码为空或不规范");
            return false;
        }
        if (pwdNew != pwdAgain) {
            alert('两次输入的密码不一致');
            return false;
        }
        return {
            pwdNow: pwdNow,
            pwdAgain: pwdAgain
        };
    };
    return userCenter;
}(Component_1["default"]));
new userCenter('#userCenter');


/***/ })

},[510]);