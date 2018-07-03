export * from './main';

// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入地图
require('echarts/lib/chart/map');
// 引入提示框和标题组件
require('echarts/lib/component/visualMap');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

import Component from '@cmos/web/Component';
import { IPosition } from '@cmos/web/dom';
import { get } from '@cmos/web/request';
import { queryToObj } from '@cmos/web/url';
require('laydate');
declare var laydate: any; //declare?

const template = require('./coms/downloadsMap/main.tpl');
const errTpl = require('./coms/downloadPage/loginErr.tpl');
const footerTpl = require('./coms/footer/footer.tpl');
const chinaJson = require('./coms/downloadsMap/china.json');
echarts.registerMap('china', chinaJson);

let myChart: any; //echarts实例
let appname: string; //应用名称
const appid: number = parseInt(queryToObj().id) || 1; //获取url中参数

class DownloadsMap extends Component {
	constructor(el: string) {
		super({
			el,
			template
		});
	}
	beforeRender() {
		//获取对应的app信息
		return get(`./appdist/getappinfo/${appid}`, {}).then(({
			data
		}) => {
			return data.beans
		}, (err) => {
			this.renderTplToNode(errTpl, {
				err
			}, this.domNode, IPosition.Replace);
		})
	}
	afterRender() {
		if(this.data) {
			appname = this.data.appname;
			myChart = echarts.init(document.getElementById("map") as HTMLDivElement);
			this.getDatasThenSetChart(laydate.now(-1));
			this.initDatePicker();
			this.renderTplToNode(footerTpl,{}, this.domNode.querySelector(".footer-wrapper"), IPosition.LastIn);
		}
	}
	getDatasThenSetChart(day: string) {
		myChart.showLoading({
			color: '#0081cc'
		});
		get(`./appdist/downloads/dailyDownloads/${appid}/${day}`, {}).then(({
			data
		}) => {
			if(data.returnCode === 0) {
				this.setCharts(data.bean);
			} else {
				alert(data.returnMessage);
			}
			myChart.hideLoading();
		}, (err) => {
			alert(err);
			myChart.hideLoading();
		})
	}
	initDatePicker() {
		const elem: HTMLInputElement = document.getElementById('datePicker') as HTMLInputElement;
		let oldValue: string = laydate.now(-1);
		let thisClass: any = this;
		elem.value = laydate.now(-1);
		new laydate({
			elem: elem,
			type: "date",
			isclear: false,
			istoday: false,
			max: laydate.now(-1),
			choose: function(value: string) {
				if(value != oldValue) {
					oldValue = value;
					thisClass.getDatasThenSetChart(value);
				}
			}
		});
	}
	setCharts(data: any) {
		var totle: number = data.totle || 10;
		// 绘制图表
		myChart.setOption({
			animation: true,
			title: {
				text: `应用名称：${appname}\n总下载量：${data.totle}`
			},
			tooltip: {
				trigger: 'item'
			},
			visualMap: {
				min: 0,
				max: totle,
				text: ['高', '低'], // 文本，默认为数值文本
				calculable: true,
				inRange: {
					color: ['#e0ffff', '#006edd']
				},
			},
			series: [{
				name: '下载量',
				type: 'map',
				mapType: 'china',
				roam: false,
				label: {
					normal: {
						show: true
					},
					emphasis: {
						show: true
					}
				},
				data: data.list
			}]
		});
	}
}
new DownloadsMap('#container');