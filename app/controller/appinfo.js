'use strict';
const fs = require('fs-extra');
const path = require('path');
const mustache = require('mustache');
var https = require('https');
const ipaIP = "192.168.100.5";

module.exports = app => {
	return class UserController extends app.Controller {

		* find() {
			const ctx = this.ctx;
			const user = ctx.session.adminUser;
			if(user === null || typeof(user) === 'undefined') {
				this.retError({
					data: '用户不存在'
				});
				return;
			}
			var success = yield ctx.service.appinfo.find(ctx.params.id);
			if(success) {
				this.retSuccess({
					data: success
				});
			} else {
				this.retError({
					data: '数据获取失败'
				});
			}
		}

		* getPlist() {
			const ctx = this.ctx;       
			var rendered = yield readfile(ctx.params.filename);      
			ctx.status = 200;
			ctx.type = 'text/plain; charset=utf-8';        
			ctx.body = rendered;
		  }

		* getAppList() {
			const ctx = this.ctx;
			const user = ctx.session.adminUser;
			if(user === null || typeof(user) === 'undefined') {
				this.retError({
					data: '用户不存在'
				});
				return;
			}
			var success = yield ctx.service.appinfo.getAppList(ctx.params.bundleid, user.id);
			if(success) {
				this.retSuccess({
					data: success
				});
			} else {
				this.retError({
					data: '数据获取失败'
				});
			}
		}

		* editAppInfo() {
				const ctx = this.ctx;
				const user = ctx.session.adminUser;
				if(user === null || typeof(user) === 'undefined') {
					this.retError({
						data: '用户不存在'
					});
					return;
				}
				const id = ctx.params.id;
				const body = ctx.request.body;
				var success = yield ctx.service.appinfo.editAppInfo({
					id,
					updates: body
				});
				if(success) {
					this.retSuccess({
						data: success
					});
				} else {
					this.retError({
						data: '修改失败'
					});
				}
			}
			* findByUid() {
				const ctx = this.ctx;
				const user = ctx.session.adminUser;
				if(user === null || typeof(user) === 'undefined') {
					this.retError({
						data: '用户不存在'
					});
					return;
				}
				var success = yield ctx.service.appinfo.findByUid(user.id);
				if(success) {
					let arr = [],
						arrNew = [];
					success.map((val, index) => {
						let b = val.bundleid;
						let c = val.created_at;
						if(!arr.includes(b)) {
							//不存在
							arr.push(b);
							arrNew.push(val);
						} else {
							//存在
							let i = arr.indexOf(b);
							if(c > arrNew[i].created_at) {
								arrNew[i] = val;
							}
						}
					});
					this.retSuccess({
						data: arrNew
					});
				} else {
					this.retError({
						data: '查询失败'
					});
				}
			}

		* del() {
			const ctx = this.ctx;
			const user = ctx.session.adminUser;
			if(user === null || typeof(user) === 'undefined') {
				this.retError({
					data: '用户不存在'
				});
				return;
			}
			const id = ctx.params.id;
			let success = yield ctx.service.appinfo.del(id);
			ctx.status = 200;
			if(success) {
				this.retSuccess({
					data: success
				});
			} else {
				this.retError({
					data: '删除失败'
				});
			}
		}

		* addinfo() {
				const ctx = this.ctx;
				const user = ctx.session.adminUser;
				if(user === null || typeof(user) === 'undefined') {
					this.retError({
						data: '用户不存在'
					});
					return;
				}
				let success = yield ctx.service.appinfo.addinfo(ctx.request.body);
				ctx.status = 200;
				if(success) {
					this.retSuccess({
						data: success
					});
				} else {
					this.retError({
						data: '添加失败'
					});
				}
			}
			* getAppinfo() {
				const ctx = this.ctx;
				var success = yield ctx.service.appinfo.query(ctx.params.id);
				if(success) {
					this.retSuccess({
						data: success
					});
				} else {
					this.retError({
						data: '数据获取失败'
					});
				}
			}

	};
};

function readfile(filename){
	return new Promise((resolve, reject)=>{
	  fs.readFile(path.join(__dirname, 'appinfoPlist') + '/appinfo.plist', function(err, data) {
		if (err)
		  reject(err);
		var template = data.toString();
		var rendered = mustache.render(template, {
		  encodedName: filename,
		  name: "App下载",
		  ip: ipaIP,
		  port: "7001",
		});
		resolve(rendered);
	  })
	})
  }