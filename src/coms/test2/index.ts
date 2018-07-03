import Component from '@cmos/web/Component';
require('blueimp-file-upload');
require('laydate');
declare var laydate: any;

const template = require('./test2.tpl');

export default class test extends Component {
	constructor(el: string) {
		super({ el, template });
	}
	beforeRender() {
		console.info('1111111111');
		return {
			data: "test_data__22"
		}
	}
	afterRender() {
		new laydate({
			elem: document.getElementById('testDate')
		});
	}
	onChooseDate() {
		console.info('choose date!!!');
	}
	onClickdiv1() {
		console.info('aaaaaa');
	}
	onChange() {
		console.info('file change');
		$('#testfile').fileupload({
			dataType: 'json',
			url: 'http://localhost:7001/api/upload',
			done: function () {
				console.info('done:', arguments);
			},
			fail: function () {
				console.info('fail:', arguments);
			}
		})
	}
	test_event(...args: any[]) {
		console.info('组件1test_event事件参数：', args);
	}
}
