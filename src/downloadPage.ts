export * from './main';
import Component from '@cmos/web/Component';
import { IPosition } from '@cmos/web/dom';
import { get, post } from '@cmos/web/request';
import { queryToObj } from '@cmos/web/url';
import DateObj from '@cmos/web/date';

// 解决搜狐接口提供的returnCitySN,页面中引入对应js文件
declare var returnCitySN: {
	cip: string;
};

const template = require('./coms/downloadPage/main.tpl');
const errTpl = require('./coms/downloadPage/loginErr.tpl');
const footerTpl = require('./coms/footer/footer.tpl');

class test extends Component {
	constructor(el: string) {
		super({
			el,
			template
		});
	}
	beforeRender() {
		//获取url中参数
		const id = queryToObj().id || 1;
		//获取对应的app信息
		return get(`./appdist/getappinfo/${id}`, {}).then(({ data }) => {
			let bean: any = data.beans;
			const { apkurl, ipaurl } = bean;
			bean.loadButton = this.getLoadButton(apkurl, ipaurl);
			bean.updated_at = new DateObj(bean.updated_at).format('YYYY-MM-DD hh:mm:ss');
			return bean
		}, (err) => {
			this.renderTplToNode(errTpl, { err }, this.domNode, IPosition.Replace);
		})
	}
	afterRender() {
		this.renderTplToNode(footerTpl, {}, this.domNode.querySelector(".footer-wrapper"), IPosition.LastIn);
	}
	getLoadButton(apkurl: string, ipaurl: string) {
		const agent = navigator.userAgent;
		let btnHtml = '';
		//不同设备返回不同的下载链接按钮
		if (agent.indexOf('Android') > -1 || agent.indexOf('Adr') > -1) {//安卓
			if (apkurl) {
				btnHtml = `<a href=${apkurl} class="store-link" data-event="click:addRecord">立即下载(android)</a>`
			} else {
				btnHtml = `<a class="store-link" >没有android版本</a>`
			}
		} else if (!!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {//IOS
			if (ipaurl) {
				btnHtml = `<a href=${ipaurl} class="store-link" data-event="click:addRecord">立即下载(ios)</a>`
			} else {
				btnHtml = `<a class="store-link" >没有ios版本</a>`
			}
		} else {//PC
			if (ipaurl) {
				btnHtml += `<a href=${ipaurl} class="store-link" data-event="click:addRecord"><img src="img/iosx.png"/></a>`
			}
			if (apkurl) {
				btnHtml += `<a  href=${apkurl} class="store-link" data-event="click:addRecord"><img src="img/azx.png"/></a>`
			}
			if (!ipaurl && !apkurl) {
				btnHtml = `<a class="store-link" >下载资源不存在</a>`;
			}
		}
		return btnHtml;
	}
	onAddRecord() {
		const appid = parseInt(queryToObj().id) || 1;
		const ip = returnCitySN["cip"];//搜狐接口提供
		post('./appdist/downloads/add', {
			data: {
				appid,
				ip
			}
		}).then(({
			data
		}) => {
			alert(data.returnMessage)
		})
	}
}
new test('#container');