import Component from '@cmos/web/Component';
import { IPosition, addClass, removeClass, hasClass, empty } from '@cmos/web/dom';
import { get, post } from '@cmos/web/request';
import { queryToObj } from '@cmos/web/url';
import { get as getConfig } from '@cmos/web/config';


require('blueimp-file-upload');

const template = require('./detail.tpl'),
	timeline = require('./timeline.tpl'),
	uploadpanel = require('./upload.tpl'),
	appInfo = require('./info.tpl'),
	willOnLine = require('./willonline.tpl'),
	footerTpl = require('../footer/footer.tpl');
let uploadData: any;
let id: number;
let uid: number;
let appinfo: any;
let bundleid: number;
let appname: string;
let description: string;


export default class detail extends Component {
	constructor(el: string) {
		super({ el, template });
	}
	beforeRender() {
		//获取url中参数
		id = queryToObj().id;
		return get(`./appdist/app/${id}`, {}).then(({ data }) => {
			appinfo = data.beans;
			bundleid = appinfo.bundleid;
			uid = appinfo.uid;
			return appinfo;
		},
		()=>{
			this.errorBar("连接超时，请重新登录，正在跳回登录页...", "overTime");
		});
	}
	afterRender() {
		let hash:String = (window.location.hash.length > 0 ? window.location.hash.substring(1) : ""),
			pageApp:Element = this.domNode.querySelector('#page-app'),
			appScope:Element = this.domNode.querySelector('#app-scope');
			pageApp.className = "";
			addClass(pageApp, 'page-app', `app-${hash}`);
		if(hash == ''){
			get(`./appdist/applist/${bundleid}`, {}).then(({
				data
			}) => {
				empty(appScope);
				this.renderTplToNode(timeline, data.beans, appScope, IPosition.LastIn);
			});
		}else {
			if (hash == 'info') {
				appname = appinfo.appname;
				description = appinfo.description;
				empty(appScope);
				this.renderTplToNode(appInfo, appinfo, appScope, IPosition.LastIn);
			} else {
				empty(appScope);
				this.renderTplToNode(willOnLine, appinfo, appScope, IPosition.LastIn);
			}
		}
		this.renderTplToNode(footerTpl,{}, this.domNode.querySelector(".footer-wrapper"), IPosition.LastIn);
	}
	// hash改变的时候重新render
	onHashChange(evt: MouseEvent) {
		let evtTarget:any = evt.target;
		let removeActive:Element = this.domNode.querySelector('#toggle-active .active');
		if(removeActive){removeClass(removeActive, 'active');}
		addClass(evtTarget, 'active');
		window.location.hash = evtTarget.getAttribute('data-hash') || evtTarget.parentNode.getAttribute('data-hash');
		this.afterRender();
	}
	onHashClear() {
		let removeActive:Element = this.domNode.querySelector('#toggle-active .active');
		if(removeActive){removeClass(removeActive, 'active');}
		window.location.hash = "";
		this.afterRender();
	}
	// 退出登录
	onLogout(){
 		post(`./appdist/logout`, {}).then(
 			() => {
                 window.location.href = 'login.html';
 			}
 		)
 	}
	onUploadFile() {
		let uploadwarp: Element = this.domNode.querySelector('#uploadwarp');
		$('#uploadApp').fileupload({
			dataType: 'json',
			url: `${getConfig().BASE_URL}appdist/upload`,
			add: (...args: any[]) => {
				removeClass(uploadwarp, 'app-hide');
				args[1].submit();
			},
			done: (...args: any[]) => {
				uploadData = args[1].result.bean;
				// 上传加载父容器的隐藏——添加
				addClass(uploadwarp.querySelector('.state-parsing'), 'app-hide');
				// 根据获取的数据对新版本表单进行渲染
				this.renderTplToNode(uploadpanel, uploadData, uploadwarp.querySelector('#stateForm'), IPosition.LastIn);
			},
			fail: function () {
				removeClass(uploadwarp.querySelector('.parse-error-content'), 'app-hide');
			}
		});
	}
	//提交上传版本的修改
	onUploadEdit() {
		let stateForm: any = this.domNode.querySelector('#stateForm');
		let appDetail: any = {
			"uid": uid,
			"appname": stateForm.querySelector('#nameInput').value,
			"bundleid": uploadData.bundleid,
			"iconurl": uploadData.iconurl,
			"version": uploadData.version,
			"platform": uploadData.platform,
			"packtype": uploadData.packtype,
			"downurl": uploadData.downurl,
			"size": uploadData.size,
			"qrcode": uploadData.qrcode,
			"description": stateForm.querySelector('#newReleaseChangelog').value
		};
		post('./appdist/addappinfo', {
			data: appDetail,
			responseType: 'json',
			timeout: 1000,
			async: true
		}).then(() => {
			// 提交成功——重新Render版本详情、关闭模态
			this.afterRender();
			this.onCloseUpnload();
		}, () => {
			// 提交失败——提示错误
			addClass(stateForm.querySelector('.action button'), 'app-hide');
			removeClass(stateForm.querySelector('.action .upload-failed-tips'), 'app-hide');
		});
	};

	// 关闭上传
	onCloseUpnload() {
		// 获取上传父容器
		let uploadwarp: Element = this.domNode.querySelector('#uploadwarp');
		// 上传加载父容器的隐藏——去除
		removeClass(uploadwarp.querySelector('.state-parsing'), 'app-hide');
		// 上传错误的隐藏——添加
		addClass(uploadwarp.querySelector('.parse-error-content'), 'app-hide');
		// 上传父容器的隐藏——添加
		addClass(uploadwarp, 'app-hide');
		// 新版本信息表单——清除
		empty(uploadwarp.querySelector('#stateForm'));
	}
	//开始修改版本信息
	onStartEdit(evt: MouseEvent) {
		this.toggleHide(evt, '.app-edited', '.app-editing');
	}
	//结束修改版本信息
	onEndEdit(evt: MouseEvent) {
		let thisedit: any = this.findClosest(evt.target, 'directive-view-release');
		//如果返回值类型为string则判断为查找失败，输出错误并return掉。
		if ((typeof thisedit) === 'string') { console.log(thisedit); return; }
		(<HTMLInputElement>thisedit.querySelector("textarea.app-editing")).value = "";
		this.toggleHide(evt, '.app-editing', '.app-edited');
	}
	//提交修改版本信息
	onSubEdit(evt: MouseEvent) {
		let thisedit: any = this.findClosest(evt.target, 'directive-view-release');
		//如果返回值类型为string则判断为查找失败，输出错误并return掉。
		if ((typeof thisedit) == 'string') { console.log(thisedit); return; }
		let queryVal: any = thisedit.querySelector("textarea.app-editing").value;
		if (queryVal !== '') {
			const getId: number = thisedit.querySelector(".icon-upload-cloud2").getAttribute('data-appId');
			post(`./appdist/appinfoedit/${getId}`, { data: { description: queryVal } }).then(
				({ data }) => {
					const retdata:any = data.beans;
					const desc = retdata.description;
					thisedit.querySelector("pre.app-edited").innerText = desc;
					thisedit.querySelector("textarea.app-editing").setAttribute('placeholder', desc);
				},
				({ data }) => {
					if(data == '用户不存在'){
						this.errorBar("用户不存在，请重新登录，正在跳回登录页...", "overTime");
					}else if(data == '修改失败'){
						this.errorBar("修改失败，请重新操作...");
					}else{
						this.errorBar("未知错误发生，请重新操作...");
					}
				}
			);
			(<HTMLInputElement>thisedit.querySelector("textarea.app-editing")).value = "";
			this.toggleHide(evt, '.app-editing', '.app-edited');
		}
	}
	//基本信息
	onEdit() {
		let namevalue: string = (<HTMLInputElement>this.domNode.querySelector('.app-name .appname')).value;
		let desValue: string = (<HTMLInputElement>this.domNode.querySelector('.form-control')).value;
		namevalue = this.trim(namevalue);
		desValue = this.trim(desValue);
		if (appname !== namevalue || description !== desValue) {
			(<HTMLInputElement>this.domNode.querySelector('.apps-app-info .save')).disabled = false;
			removeClass(this.domNode.querySelector('.apps-app-info .cancel'), 'app-hide');
		}
	}
	onCancel() {
		(<HTMLInputElement>this.domNode.querySelector('.app-name .appname')).value = appname;
		(<HTMLInputElement>this.domNode.querySelector('.form-control')).value = description;
		(<HTMLInputElement>this.domNode.querySelector('.apps-app-info .save')).disabled = true;
		addClass(this.domNode.querySelector('.apps-app-info .cancel'), 'app-hide');
	}
	onEditSave() {
		let namevalue: string = (<HTMLInputElement>this.domNode.querySelector('.app-name .appname')).value;
		let desValue: string = (<HTMLInputElement>this.domNode.querySelector('.form-control')).value;
		post(`./appdist/appinfoedit/${id}`, {
			data: { appname: namevalue, description: desValue },
			responseType: 'json',
			timeout: 1000,
			async: true
		}).then(({ data }) => {
			appinfo = data.beans;
			this.domNode.querySelector('.secondary-title').innerHTML = namevalue;
			this.onHashClear();
		},
		() => {
			addClass(this.domNode.querySelector('.apps-app-info .info-btns'),'app-hide');
			removeClass(this.domNode.querySelector('.apps-app-info .sucMes'),'app-hide');
			(<HTMLInputElement>this.domNode.querySelector('.apps-app-info .save')).disabled = true;
			addClass(this.domNode.querySelector('.apps-app-info .cancel'), 'app-hide');
			setTimeout(()=>{
				addClass(this.domNode.querySelector('.apps-app-info .sucMes'),'app-hide');
				removeClass(this.domNode.querySelector('.apps-app-info .info-btns'),'app-hide');
			},2000);
		})
	}
	/**
	 * 
	 * 
	 * @param {*} evt 获取相应起始元素对象
	 * @param {string} addName 需要添加app-hide的元素类名
	 * @param {string} remName 需要移除app-hide的元素类名
	 * @memberof detail 切换指定元素的app-hide类
	 */
	toggleHide(evt: any, addName: string, remName: string) {
		let thisedit: any = this.findClosest(evt.target, 'directive-view-release');
		//如果返回值类型为string则判断为查找失败，输出错误并return掉。
		if ((typeof thisedit) === 'string') { console.log(thisedit); return;}
		let queryEle: any = thisedit.querySelectorAll(addName);
		addClass(queryEle, 'app-hide');
		queryEle = thisedit.querySelectorAll(remName);
		removeClass(queryEle, 'app-hide');
	}
	/**
	 * 
	 * 
	 * @param {*} findEle 获取相应起始元素对象
	 * @param {string} findCls 需要查找的元素类名
	 * @returns 返回查找到的元素
	 * @memberof detail 类似JQuery中.closest()方法;
	 */
	findClosest(findEle: any, findCls: string) {
		if (findEle.parentNode === null) { return "未找到含有指定class的元素"; }
		findEle = findEle.parentNode;
		const isHas: boolean = hasClass(findEle, findCls);
		if (isHas) {
			return findEle;
		} else {
			let ret: Object = this.findClosest(findEle, findCls);
			return ret;
		}
	}
	/**
	 * 
	 * 
	 * @param {string} str 需要去除前后空格的字符串
	 * @returns 返回查找到的元素
	 * @memberof detail 类似JQuery中.trim()方法;
	 */
	trim(str: string) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	/**
	 * 
	 * 
	 * @param {string} text 错误信息
	 * @param {string} [type] 可选参数，如果为overTime则设定定时器跳转到登录页
	 * @memberof detail 对错误提示栏使用的封装
	 */
	errorBar(text:string, type?: string){
		this.domNode.querySelector('#errBar p').innerHTML = text;
		removeClass(this.domNode.querySelector('#errBar'), 'app-hide');
		if(type && type == 'overTime'){
			setTimeout(()=>{
				window.location.href = 'login.html';
			},2000);
		}else{
			setTimeout(()=>{
				addClass(this.domNode.querySelector('#errBar'), 'app-hide');
				this.domNode.querySelector('#errBar p').innerHTML = "";
			},2000);
		}
	}
}