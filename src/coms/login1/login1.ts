import Component from '@cmos/web/Component';
import { post } from '@cmos/web/request';
import { get as getConfig } from '@cmos/web/config';
import baseUrlHelper from '../../helpers/BASE_URL';
baseUrlHelper();

const template = require('./login1.tpl');
var datas = {
	username: 'admin',
	password: 'admin',
	captcha: ''
}
export default class login extends Component {
	constructor(el: string) {
		super({ el, template });
	}
	beforeRender() {

	}
	afterRender() {
		document.onkeydown = (e: KeyboardEvent) => {
			if ((e.keyCode || e.which) == 13) {
				this.onLogins();
			}
		}
	}
	warning(ss: String) {
		var war = (<HTMLInputElement>document.getElementById("warning"));
		war.style.color = '#e2644c';
		(<String>(<HTMLInputElement>document.getElementById("warText")).innerText) = ss;
	}
	onLogins() {
		datas.username = (<HTMLInputElement>document.getElementById("userName")).value;
		datas.password = (<HTMLInputElement>document.getElementById("userId")).value;
		datas.captcha = (<HTMLInputElement>document.getElementById("imgPassword")).value;
		if (datas.username.match("[0-9.a-zA-Z]{0,26}@[0-9.a-z]{0,20}.[0-9a-z]{0,8}") != null && datas.password.match("[0-9a-z]{6,15}") != null) {
			//-----------------------------注册操作操作
			post<{ code: string }>('./appdist/login', {
				data: { ...datas },
				responseType: 'json',
				timeout: 1000,
				async: true
			}).then(({ data }) => {
				if (data.returnCode == 0 && data.bean.code == '0') {
					window.location.href = 'homePage.html';
				} else if (data.returnCode == 0 && data.bean.code == '1') {
					this.warning(data.returnMessage);
					(<HTMLInputElement>document.getElementById('imgPass')).src = `${getConfig().BASE_URL}appdist/imgVerification?${Date.now()}`;
					datas.captcha = '';
				}
			});
		} else {
			this.warning("帐号或密码不规范");
		}
	}
	onRegists() {
		window.location.href = 'register.html';
	}
	onImgClick() {
		(<HTMLInputElement>document.getElementById('imgPass')).src = `${getConfig().BASE_URL}appdist/imgVerification?${Date.now()}`;
		datas.captcha = '';
	}
}