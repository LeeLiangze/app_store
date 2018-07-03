import Component from '@cmos/web/Component';
import { post, get, del } from '@cmos/web/request';
import { addClass, removeClass, IPosition, remove, empty, hasClass } from '@cmos/web/dom';
import { get as getConfig } from '@cmos/web/config';

require('blueimp-file-upload');

const template = require('./homePage.tpl');
const formTpl = require('./form.tpl');
const delTpl = require('./delete.tpl');
const errTpl = require('./loginErr.tpl');
const footerTpl = require('./../footer/footer.tpl');

let uid: number;
let uploadData: any;

export default class login extends Component {
	constructor(el: string) {
		super({ el, template });
	}
	beforeRender() {
		let user = new Promise(
			(resolve) => {
				get(`./appdist/userloginfo`, {}).then(
					({data}) => {
						let beans:any = data.beans;
						uid = beans.id;
						resolve(beans);
					},
					() => {
						this.renderTplToNode(errTpl, {}, this.domNode, IPosition.LastIn);
						setTimeout(()=>{
							window.location.href = 'login.html';
						},2000);
					}
				)
			}
		)
		let appList = new Promise(
			(resolve) => {
				get(`./appdist/app/findbyuid`, {}).then(
					({data}) => {
						let beans:any = data.beans;
						resolve(beans);
					},
					() => {
						if(!this.domNode.querySelector(".alert-bar")){
							this.renderTplToNode(errTpl, {}, this.domNode, IPosition.LastIn);
							setTimeout(()=>{
								window.location.href = 'login.html';
							},2000);
						}else{
							return;
						}
					}
				)
			}
		)
		return Promise.all([user, appList]).then((result) => {
			let data: any = {
				"user": result[0],
				"appList": result[1]
			}
			return data;
		})
	}
	afterRender() {
		this.renderTplToNode(footerTpl,{}, this.domNode.querySelector(".footer-wrapper"), IPosition.LastIn);
	}
	//隐藏上传第一个项目
	hideFirst() {
		let uploadFirst:Element = document.getElementById("uploadFirst");
		if(hasClass(uploadFirst, 'ng-show')){
			removeClass(uploadFirst, 'ng-show');
			addClass(uploadFirst, 'ng-hide');
		}
	}
	//显示上传第一个项目
	showFirst() {
		let uploadFirst:Element = document.getElementById("uploadFirst");
		if(hasClass(uploadFirst, 'ng-hide')){
			addClass(uploadFirst, 'ng-show');
			removeClass(uploadFirst, 'ng-hide');
		}
	}
	//显示信息弹窗
	showmodal() {
		removeClass(document.getElementById("modal"), "ng-hide");
		removeClass(document.getElementById("message"), "hidden");
		removeClass(this.domNode.querySelector("#message .state-parsing"), 'ng-hide');
	}
	//显示弹窗中的表单
	showForm(data: any) {
		addClass(this.domNode.querySelector("#message .state-parsing"), 'ng-hide');
		addClass(this.domNode.querySelector("#message .upload-modal"), 'state-form');
		this.renderTplToNode(formTpl, data, this.domNode.querySelector('#message .upload-modal .modal-form'), IPosition.LastIn);
	}
	//关闭信息弹窗
	onClose() {
		addClass(document.getElementById("message"), "hidden");
		addClass(document.getElementById("modal"), "ng-hide");
		empty(this.domNode.querySelector('#message .upload-modal .modal-form'));
		removeClass(this.domNode.querySelector("#message .upload-modal"), 'state-form');
	}
	//删除
	onDelete(e: MouseEvent) {
		let eDom = (e.target || e.currentTarget) as Element ;
		if (eDom.nodeName == 'I') {
			eDom = eDom.parentElement;
		}
		let classname:string[] = eDom.getAttribute('class').split("-");
		const id:string = classname[classname.length - 1];

		let appname:string = this.domNode.querySelector(`#appList-${id} .app-name`).innerHTML;
		let app: Object = {
			"appname": appname,
			"id": id
		}
		this.renderTplToNode(delTpl, app, this.domNode.querySelector('.modal-delete'), IPosition.LastIn);
	}
	//取消删除
	onCancelDelete() {
		empty(this.domNode.querySelector('.modal-delete'));
	}
	//确定删除
	onDoDelete(e: MouseEvent) {
		let eDom = (e.target || e.currentTarget) as Element;
		let classname:string[] = eDom.getAttribute('class').split("-");
		const id:string = classname[classname.length - 1];
		del(`./appdist/app/appdel/${id}`, {}).then(
			() => {
				empty(this.domNode.querySelector('.modal-delete'));
				remove(this.domNode.querySelector(`#appList-${id}`));
				if(!this.domNode.querySelector('.applist .appcard')){
					this.showFirst();
				}
			},
			() => {
				addClass(this.domNode.querySelector('.modal-delete'), 'error');
			}
		)
	}
	//删除失败，关闭弹窗
	onDelclose() {
		removeClass(this.domNode.querySelector('.modal-delete'), 'error');
		empty(this.domNode.querySelector('.modal-delete'));
	}
	//上传失败，关闭弹窗
	onBtnclose() {
		removeClass(this.domNode.querySelector('.uploading'), 'ng-hide');
		addClass(this.domNode.querySelector('.parse-error-content'), 'ng-hide');
		this.onClose();
	}
	//提交表单信息
	onSave() {
		let appDetail: Object = {
			"uid": uid,
			"appname": (<HTMLInputElement>this.domNode.querySelector('.appname .name-input')).value,
			"bundleid": uploadData.bundleid,
			"build":uploadData.build,
			"iconurl": uploadData.iconurl,
			"version": uploadData.version,
			"platform": uploadData.platform,
			"packtype": uploadData.packtype,
			"downurl": uploadData.downurl,
			"size": uploadData.size,
			"qrcode": uploadData.qrcode,
			"packagename":uploadData.packagename,
			"description": (<HTMLInputElement>this.domNode.querySelector('.release-body .description')).value
		};
		post('./appdist/addappinfo', {
			data: appDetail,
			responseType: 'json',
			timeout: 1000,
			async: true
		}).then(
			({ data }) => {
				let beans:any = data.beans;
				window.location.href = `./detail.html?id=${beans.id}`;
			},
			() => {
				removeClass(this.domNode.querySelector('.upload-failed-tips.ng-scope'), 'ng-hide');
				addClass(this.domNode.querySelector('.state-form .save'), 'ng-hide');
				setTimeout(() => {
					this.onClose();
				}, 3000);
			})
	}
	onFailClose() {
		this.onClose();
	}
	onUpload() {
		$('#uploadfile').fileupload({
			dataType: 'json',
			url: `${getConfig().BASE_URL}appdist/upload`,
			add: (...args: any[]) => {
				this.showmodal();
				args[1].submit();
			},
			done: (...args: any[]) => {
				uploadData = args[1].result.bean;
				this.showForm(args[1].result.bean);
			},
			fail: () => {
				addClass(this.domNode.querySelector('.uploading'), 'ng-hide');
				removeClass(this.domNode.querySelector('.parse-error-content'), 'ng-hide');
			}
		})
	}
	onLogout(){
		post(`./appdist/logout`, {}).then(
			() => {
                window.location.href = 'login.html';
			}
		)
	}
}