'use strict';
const crypto = require('crypto');
const CryptoJS = require("crypto-js");

module.exports = app => {
    return class UserController extends app.Controller {
        * login() {
            const { ctx } = this;
            ctx.body = yield ctx.service.user.login(ctx.request.body);
        };
        * imgVerification() {
            const { ctx } = this;
            const { drawCaptcha } = require('cmos-captcha');
            return yield drawCaptcha(ctx);
        }
        * logout() {
            const { ctx } = this;
            ctx.session.adminUser = null;
            this.retSuccess({ data: '退出成功' });
        };

        * register() {
            const { ctx } = this;
            const { data } = ctx.request.body;
            //console.log(data)
            ctx.body = yield ctx.service.user.register(ctx.request.body);
        }

        * index() {
            const ctx = this.ctx;
            ctx.body = 'hello admin';
        }

        * success() {
            const ctx = this.ctx;
            ctx.body = yield ctx.state.user;
        }

        * users() {
            const ctx = this.ctx;
            ctx.body = yield ctx.service.user.list(ctx.query);
        }

        * user() {
            const ctx = this.ctx;
            const success = yield ctx.service.user.find(ctx.params.id);
            if (success) {
                this.retSuccess({ data: success });
            } else {
                this.retError({ data: '数据获取失败，请稍后重试' });
            }
        }
        //查询个人信息
        * userInfo() {
            const ctx = this.ctx;
            const user = ctx.session.adminUser;
            // if (user === null || typeof (user) === 'undefined') {
            //     this.retError({ data:'请登录' });
            //     return ;
            // }
            var data = yield ctx.service.user.userInfo(ctx.params.id);
            if (data) {
                this.retSuccess({ data: data });
            } else {
                this.retError({ data: '用户不存在' });
            }
        }
        //修改个人信息
        * userUpdate() {
            const ctx = this.ctx;
            const user = ctx.session.adminUser;
            // if (user === null || typeof (user) === 'undefined') {
            //     this.retError({ data:'请登录' });
            //     return ;
            // }
            const body = ctx.request.body;
            const data = yield ctx.service.user.userUpdate(body);
            if (data) {
                this.retSuccess({ data: data });
            } else {
                this.retError({ data: '用户不存在' });
            }
        }
        // 修改密码
        * passUpdate() {
            const ctx = this.ctx;
            const user = ctx.session.adminUser;
            // if (user === null || typeof (user) === 'undefined') {
            //     this.retError({ data:'请登录' });
            //     return ;
            // }
            const body = ctx.request.body;
            //将密码加密，需将旧密码和新密码都加密，但是因为未知原因，在同一位置加密会报错，所以将新密码放到controller层加密。
            const md5 = crypto.createHash('md5');
            body.pass = md5.update(body.username + body.pass).digest('hex');
            const data = yield ctx.service.user.passUpdate(body);
            if (data.returnCode == 1) {
                this.retSuccess({ data: '修改成功' });
            } else if (data.returnCode == 2) {
                this.retError({ data: '原密码错误' });
            } else {
                this.retError({ data: '修改失败，请稍后重试' });
            }
        }

        * update() {
            const ctx = this.ctx;
            const id = ctx.params.id;
            const body = ctx.request.body;
            const success = yield ctx.service.user.update({ id, updates: body });
            if (success) {
                this.retSuccess({ data: '修改成功' });
            } else {
                this.retError({ data: '数据获取失败，请稍后重试' });
            }
        }

        * del() {
            const ctx = this.ctx;
            const id = ctx.params.id;
            yield ctx.service.user.del(id);
            ctx.status = 200;
        }
        //登录后查询个人信息
        * userLogInfo() {
            const ctx = this.ctx;
            const user = ctx.session.adminUser;
            if (user === null || typeof (user) === 'undefined') {
                this.retError({ data: '用户不存在' });
                return;
            }
            var data = yield ctx.service.user.userInfo(user.id);
            if (data) {
                this.retSuccess({ data: data });
            } else {
                this.retError({ data: '数据获取失败，请稍后重试' });
            }
        }
    };
};
