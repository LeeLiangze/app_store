'use strict';

module.exports = app => {
    class CustomController extends app.Controller {
        get adminUser() {
            return this.ctx.session.adminUser;
        }
        isAdminLogin() {
            if (this.ctx.session.hasOwnProperty('adminUser') && this.ctx.session.adminUser !== null) {
                return true;
            }
            return false;
        }
        retSuccess(res) {
            this.ctx.body = { returnCode: 0, returnMessage: res.hasOwnProperty('message') ? res.message : '成功', beans: res.hasOwnProperty('data') ? res.data : '', bean:{} };
        }
        retError(res) {
            this.ctx.body = { returnCode: -9999, returnMessage: res.data };
        }
        notFound(msg) {
            msg = msg || 'not found';
            this.ctx.throw(404, msg);
        }
    }
    app.Controller = CustomController;

};
