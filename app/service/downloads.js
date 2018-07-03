'use strict';
const DateObj = require('@cmos/web/date').default;
const CITYS = ["北京", "广东", "山东", "江苏", "河南", "上海", "河北", "浙江", "香港", "陕西", "湖南", "重庆", "福建", "天津", "云南", "四川", "广西", "安徽", "海南", "江西", "湖北", "山西", "辽宁", "台湾", "黑龙江", "内蒙古", "澳门", "贵州", "甘肃", "青海", "新疆", "西藏", "吉林", "宁夏"];
module.exports = app => {
	return class DownLoads extends app.Service {
		* find(id) {
				const data = yield this.ctx.model.Downloads.findById(id);
				if(!data) {
					this.ctx.throw(404, 'data not found');
				}
				return data;
			}
			* create(data) {
				return yield this.ctx.model.Downloads.create(data);
			}
			* dailyDownloads(data) {
				const {
					appid,
					day
				} = data;
				var list = [],
					dateobj = new DateObj(day);
				const gteDay = dateobj.format("YYYY-MM-DD");
				dateobj.setDayOfMonth(dateobj.geDayOfMonth() + 1);
				const ltDay = dateobj.format("YYYY-MM-DD");
				for(let i = 0, len = CITYS.length; i < len; i++) {
					const name = CITYS[i];
					const value = yield this.ctx.model.Downloads.count({
						where: {
							appid: appid,
							proname: name,
							download_at: {
								$gte: new Date(gteDay),
								$lt: new Date(ltDay),
							}
						}
					});
					list.push({
						name,
						value
					});
				}
				const totle = yield this.ctx.model.Downloads.count({
					where: {
						appid: appid,
						download_at: {
							$gte: new Date(gteDay),
							$lt: new Date(ltDay),
						}
					}
				});
				return {
					totle,
					list
				};
			}

		* latelyDownloads(data) {
			const {
				appid,
				days
			} = data;
			let x = [],
				y = [],
				totle = 0,
				dateobj = new DateObj();
			if(days > 1) {
				for(var i = 1; i <= days; i++) {
					const ltDay = dateobj.format("YYYY-MM-DD");
					dateobj.setDayOfMonth(dateobj.geDayOfMonth() - 1);
					const day = dateobj.format("MM-DD");
					const gteDay = dateobj.format("YYYY-MM-DD");
					x.unshift(day);
					const count = yield this.ctx.model.Downloads.count({
						where: {
							appid: appid,
							download_at: {
								$gte: new Date(gteDay),
								$lt: new Date(ltDay),
							}
						}
					});
					totle += count;
					y.unshift(count);
				}
			} else if(days == 1) {
				x = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
				var today = dateobj.format("YYYY-MM-DD");
				dateobj.setDayOfMonth(dateobj.geDayOfMonth() - 1);
				var yesterday = dateobj.format("YYYY-MM-DD");
				for(var i = 0, len = x.length; i < len; i++) {
					var getTime = new DateObj(`${yesterday} ${x[i]}`).format("YYYY-MM-DD hh:mm");
					if(i + 1 == 24) {
						var ltTime = new DateObj(`${today} 00:00`).format("YYYY-MM-DD hh:mm");
					} else {
						var ltTime = new DateObj(`${yesterday} ${x[i+1]}`).format("YYYY-MM-DD hh:mm");
					}
					const count = yield this.ctx.model.Downloads.count({
						where: {
							appid: appid,
							download_at: {
								$gte: new Date(getTime),
								$lt: new Date(ltTime),
							}
						}
					});
					totle += count;
					y.push(count);
				}

			}
			return {
				totle,
				data: {
					x,
					y
				}
			}
		}
	};
};