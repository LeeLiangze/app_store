'use strict';

module.exports = app => {
  return class UserController extends app.Controller {
    * posts() {
      const response = {success: false, message: '操作失败' };
      const ctx = this.ctx;
      const posts = yield ctx.service.post.list(ctx.query);
      if ( posts ) {
        this.retSuccess({ message: '恭喜你获取数据成功',
                          data: posts
                      });
      } else {
        this.retError({data:'数据获取失败，请稍后重试'});
      }
    }

    * post() {
      const ctx = this.ctx;
      const post = yield ctx.service.post.find(ctx.params.title);
      ctx.body = {
        returnCode: 0,
        returnMessage: '成功',
        bean: {},
        beans: post
      }
    }

    /**
     * validate:
     * 1.rule type must be one of number, int, integer, string, id, date, dateTime, datetime, boolean, bool, array, object, enum, email, password, url
     * 2.eg: 'email' => {type: 'email', required: true, allowEmpty: false, format: EMAIL_RE}
     * 3.eg: 'password' => {type: 'password', required: true, allowEmpty: false, format: PASSWORD_RE, min: 6}
     * 4.eg: [1, 2] => {type: 'enum', values: [1, 2]}
     *
     * 返回数据：
     * 1.在controller/app.js里封装了两个方法，retSuccess和retError分别用来返回成功和失败的数据
     * 2.retSuccess里面直接返回提交的数据，默认已经封装code和msg；
     * 3.retError返回错误信息，默认已经封装code和msg
     *
     * session：
     * 1.提交时判断是否有权限，暂时用简单判断是否有session，通过注释的地方，如果session为空或者undefined，则不能提交。
     **/

    * create() {
      const ctx = this.ctx;
      const createRule = {
        title: { type: 'string', required: true },
        content: { type: 'string', required: true },
      };
      // 校验参数
      ctx.validate(createRule);
      const body = ctx.request.body;
      body.user_id = +ctx.params.user_id;
      // const user = ctx.session.adminUser;
      // if (user === null || typeof (user) === 'undefined') {
      //   this.retError({data:'用户不存在'});
      //   return;
      // }
      const success = yield ctx.service.post.create(ctx.request.body);
      if ( success ) {
        this.retSuccess({ data: success });
      } else {
        this.retError({data:'数据提交失败，请稍后重试'});
      }
    }

    * update() {
      const ctx = this.ctx;
      const id = ctx.params.id;
      const user_id = +ctx.params.user_id;
      const body = ctx.request.body;
      ctx.body = yield ctx.service.post.update({ id, user_id, updates: body });
    }

    * del() {
      const ctx = this.ctx;
      const id = ctx.params.id;
      yield ctx.service.post.del(id);
      ctx.status = 200;
    }
  };
};
