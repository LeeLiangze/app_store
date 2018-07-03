export * from './main';
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入折线图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

import Component from '@cmos/web/Component';
import { get } from '@cmos/web/request';
import { queryToObj } from '@cmos/web/url';
import { IPosition } from '@cmos/web/dom';

const template = require('./coms/downloadsChart/main.tpl');
const errTpl = require('./coms/downloadPage/loginErr.tpl');
const footerTpl = require('./coms/footer/footer.tpl');
const appid: number = parseInt(queryToObj().id) || 1; //获取url中参数
let searchBtnList: HTMLCollectionOf<Element>; //用于存储获取到的按钮dom,莫名其妙的类型，有知道的联系我zhaphaipeng
let myChart: any; //echarts实例
let appname: string; //应用名称
let totleDom: any;
let totle: number = 0;

class Chart extends Component {
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
		if (this.data) {
			appname = this.data.appname
			totleDom = document.getElementById("totle");
			myChart = echarts.init(document.getElementById("table") as HTMLDivElement);
			searchBtnList = document.getElementsByClassName('btn-hook');
			this.getDatas();
			this.renderTplToNode(footerTpl, {}, this.domNode.querySelector(".footer-wrapper"), IPosition.LastIn);
		}
	}
	onSearch(e: MouseEvent) {
		const currentDom: Element = e.target as Element;
		if (currentDom.classList.contains('active')) {
			return;
		}
		searchBtnList[0].classList.remove('active');
		searchBtnList[1].classList.remove('active');
		searchBtnList[2].classList.remove('active');
		currentDom.classList.add('active');
		this.getDatas(currentDom.getAttribute('key'))
	}
	getDatas(key: string = "7") {
		get<{ totle: number, data: any }>(`./appdist/downloads/lateldownloas/${appid}/${key}`, {}).then(({
			data
		}) => {
			if (data.returnCode === 0) {
				totle = data.bean.totle;
				this.setCharts(data.bean.data);
			} else {
				alert(data.returnMessage);
			}
		}, (err) => {
			alert(err)
		})
	}
	setCharts(data: any) {
		// 绘制图表
		myChart.setOption({
			title: {
				text: `应用名称：${appname}\n总下载量：${totle}`
			},
			tooltip: {},
			xAxis: {
				boundaryGap: false,
				data: data.x
			},
			yAxis: {},
			series: [{
				name: '下载量',
				type: 'line',
				smooth: true,
				symbolSize: 10,
				data: data.y,
				areaStyle: {
					normal: {
						color: new (<any>echarts).graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: 'rgba(216, 244, 247,1)'
						}, {
							offset: 1,
							color: 'rgba(216, 244, 247,1)'
						}], false)
						//						color:'rgba(216, 244, 247,1)'
					}
				},
				itemStyle: {
					normal: {
						color: '#58c8da'
					}
				},
				lineStyle: {
					normal: {
						width: 2
					}
				}
			}]
		});
	}
}
new Chart('#container');