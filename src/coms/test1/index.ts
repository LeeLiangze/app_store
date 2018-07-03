// import { Hash } from '@cmos/web/interfaces';
import * as echarts from 'echarts';

import Component from '@cmos/web/Component';
import { IPosition } from '@cmos/web/dom';
import { get } from '@cmos/web/request';

const template = require('./test.tpl');
const tmp1 = require('./test2.tpl');
const chinaJson = require('./china.json');

const options = {
	tooltip: {
		trigger: 'item',
		formatter: '{b}'
	},
	series: [
		{
			name: '中国',
			type: 'map',
			mapType: 'china',
			selectedMode: 'multiple',
			label: {
				normal: {
					show: true
				},
				emphasis: {
					show: true
				}
			}
		}
	]
};

export default class test extends Component {
	constructor(el: string) {
		super({ el, template });
	}
	beforeRender() {
		return get('./appdist/posts', {}).then(({ data }) => {
			console.info(data);
			return data;
		})
	}
	afterRender() {
		console.info('异步获取数据：：', `${this.data}`);
		this.initCharts();
	}
	initCharts() {
		echarts.registerMap('china', chinaJson);
		const myChart = echarts.init(this.domNode.querySelector('#echart') as HTMLDivElement);
		myChart.setOption(options);
	}

	onClickdiv1(evt: MouseEvent) {
		console.info('div 1 clicked！！', evt);
		this.renderTplToNode(tmp1, [], this.domNode.querySelector('#div2'), IPosition.LastIn);
		get('./appdist/posts', {}).then(({ data }) => {
			console.info(data);
		}).catch((err) => {
			console.error('err', err);
		});
	}

	onClickdiv2() {
		console.info('div2 click...');
		this.emit('test_event', 'param1', 'param2');
	}
	aa: string;
}
