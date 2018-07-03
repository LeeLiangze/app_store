'use strict';
module.exports = app => {
	return class UserController extends app.Controller {
		* find() {
				const ctx = this.ctx;
				var data = yield ctx.service.downloads.find(ctx.params.id);
				ctx.body = {
					returnCode: 0,
					returnMessage: '成功',
					bean: {},
					beans: data
				}
			}
			* add() {
				const ctx = this.ctx;
				const body = ctx.request.body;
				const appid = body.appid;
				const ip = body.ip;
				//如果参数校验未通过，将会抛出一个的异常
				ctx.validate({
					ip: {
						type: 'string',
						required: true
					},
					appid: {
						type: 'int',
						required: true
					}
				});
				const {
					proid,
					proname
				} = getProInfoByIp(ip);
				// 调用 service 创建一个 topic
				var data = yield ctx.service.downloads.create({
					ip,
					proid,
					proname,
					appid
				});
				// 设置响应体
				if(data) {
					this.retSuccess({
						data: data
					});
				} else {
					this.retError({
						data: '数据添加失败，请稍后重试'
					});
				}
			}
			* dailyDownloads() {
				const ctx = this.ctx;
				const appid = ctx.params.id;
				const day = ctx.params.day;
				var data = yield ctx.service.downloads.dailyDownloads({
					appid,
					day
				});
				ctx.body = {
					returnCode: 0,
					returnMessage: '成功',
					bean: data
				}
			}
			* latelyDownloads() {
				const ctx = this.ctx;
				const appid = ctx.params.id;
				const days = ctx.params.days;
				var data = yield ctx.service.downloads.latelyDownloads({
					appid,
					days
				});
				ctx.body = {
					returnCode: 0,
					returnMessage: '成功',
					bean: data
				}
			}
	};
};
//等方案等下来再完善，这里先用随机生成的替代
function getProInfoByIp(ip) {
	const CITYS = ["北京", "广东", "山东", "江苏", "河南", "上海", "河北", "浙江", "香港", "陕西", "湖南", "重庆", "福建", "天津", "云南", "四川", "广西", "安徽", "海南", "江西", "湖北", "山西", "辽宁", "台湾", "黑龙江", "内蒙古", "澳门", "贵州", "甘肃", "青海", "新疆", "西藏", "吉林", "宁夏"];
	const index = parseInt(Math.random() * 10);
	return {
		proid: index,
		proname: CITYS[index]
	}
}