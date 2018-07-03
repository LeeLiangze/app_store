
'use strict';

module.exports = app => {
  class ClientController extends app.Controller {
    * index() {
      const ctx = this.ctx;
      ctx.body = yield ctx.renderView('login.html');
    }
  }
  return ClientController;
};