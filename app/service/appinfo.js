'use strict';

module.exports = app => {
	return class AppInfo extends app.Service {
		* find(id) {
			const appinfo = yield this.ctx.model.Appinfo.findById(id, {
				include: [{
					model: this.ctx.model.User,
					as: 'user',
					attributes: ['id', 'username', 'email', 'pno', 'department', 'pass', 'remember_token']
				}]
			});
			if(!appinfo) {
				this.ctx.throw(404, 'app not found');
			}
			return appinfo;
		}

		* getAppList(bundleid, uid) {
			const appinfo = yield this.ctx.model.Appinfo.findByBundleId(bundleid, uid);
			if(!appinfo) {
				this.ctx.throw(404, 'app not found');
			}
			return appinfo;
		}

		* editAppInfo({
			id,
			updates
		}) {
			const appinfo = yield this.ctx.model.Appinfo.findById(id);
			if(!appinfo) {
				this.ctx.throw(404, 'app not found');
			}
			return yield appinfo.update(updates, {
				'where': {
					'id': {
						eq: id
					}
				}
			});
		}

		* findByUid(uid) {
			const appinfo = yield this.ctx.model.Appinfo.findByUid(uid);
			if(!appinfo) {
				this.ctx.throw(404, 'app not found');
			}
			return appinfo;
		}

		* del(id) {
			const appinfo = yield this.ctx.model.Appinfo.findById(id);
			if(!appinfo) {
				this.ctx.throw(404, 'app not found');
			}
			return appinfo.destroy();
		}

		* addinfo(body) {
				return yield this.ctx.model.Appinfo.create(body);
			}
			* query(id) {
				const appinfo = yield this.ctx.model.Appinfo.findById(id, {
					include: [{
						model: this.ctx.model.User,
						as: 'user',
						attributes: ['id', 'username', 'email', 'pno', 'department', 'pass', 'remember_token']
					}]
				});
				return appinfo;
			}

	};
};