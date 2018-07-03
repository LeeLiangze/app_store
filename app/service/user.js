'use strict';
const crypto = require('crypto');
module.exports = app => {
  return class User extends app.Service {
    * login(info = {}) {
      const { ctx } = this;
      const { verifyCaptcha } = require('cmos-captcha');
      if (!verifyCaptcha(ctx)) {
        return { returnCode: 0, returnMessage: '验证码错误', bean: { code: 1 } }
      } else {
        const user = yield this.ctx.model.User.findByUser(info.username);
        if (user) {
          const md5 = crypto.createHash('md5');
          const password = md5.update(info.username + info.password).digest('hex');
          if (password === user.pass) {
            ctx.session.adminUser = { id: user.id, name: user.username };
            ctx.rotateCsrfSecret();
            return { returnCode: 0, returnMessage: '成功', bean: { code: 0, id: user.id } }
          }
          return { returnCode: 0, returnMessage: '密码错误', bean: { code: 1 } }
        } else {
          return { returnCode: 0, returnMessage: '用户不存在', bean: { code: 1 } }
          //this.ctx.throw(-9999, 'this user is not exist');
        }
      }
    }
    * register(info = {}) {
      const { ctx } = this;
      const { verifyCaptcha } = require('cmos-captcha');
      //const encrypt = ctx.helper.createRandomStr(6);
      if (!verifyCaptcha(ctx)) {
        return { returnCode: 0, returnMessage: '验证码错误', bean: { code: 1 } };
      } else {
        const users = yield this.ctx.model.User.findByUser(info.username);
        if (!users) {
          const md5 = crypto.createHash('md5');
          const password = md5.update(info.username + info.password).digest('hex');
          const user = {
            username: info.username,
            email: info.username,
            pass: password,
          };
          yield ctx.model.User.create(user)
          return { returnCode: 0, returnMessage: '注册成功', bean: { code: 0 } };
        } else {
          //this.ctx.throw(-9999, 'this email has hean used!!');
          return { returnCode: 0, returnMessage: '邮箱已注册', bean: { code: 1 } };
        }
      }
    }
    * list({ offset = 0, limit = 10, order_by = 'created_at', order = 'ASC' }) {
      return yield this.ctx.model.User.findAndCountAll({
        offset,
        limit,
        order: [[order_by, order.toUpperCase()]],
      });
    }
    * find(id) {
      const user = yield this.ctx.model.User.findById(id);
      if (!user) {
        this.ctx.throw(404, 'user not found');
      }
      return user;
    }

    * create(user) {
      return yield this.ctx.model.User.create(user);
    }

    * update({ id, updates }) {
      const user = yield this.ctx.model.User.findById(id);
      if (!user) {
        this.ctx.throw(404, 'user not found');
      }
      return yield user.update(updates);
    }
    //查询个人信息
    * userInfo(id) {
      return yield this.ctx.model.User.findByUserInfo(id) ;
    }
    //修改个人信息
    * userUpdate(updates) {
      const user = yield this.ctx.model.User.findByUserInfo(updates.id);
      return  yield user.update(updates) ;
    }
    //修改密码
    * passUpdate(updates) {
      const userPass = yield this.ctx.model.User.findByPass(updates.id);
      const md5 = crypto.createHash('md5');
      // 对传入的明文原密码加密，以便和数据库中比对      
      updates.oldPass = md5.update(updates.username + updates.oldPass).digest('hex');
      if (userPass.pass == updates.oldPass) {
        yield userPass.update(updates);
        return { returnCode: 1, returnMessage: '修改成功', };
      } else if (userPass.pass != updates.oldPass) {
        return { returnCode: 2, returnMessage: '原密码错误' };
      } else {
        return { returnCode: 0, returnMessage: '用户不存在' };
      }
    }


    * del(id) {
      const user = yield this.ctx.model.User.findById(id);
      if (!user) {
        this.ctx.throw(404, 'user not found');
      }
      return user.destroy();
    }
  };
};
