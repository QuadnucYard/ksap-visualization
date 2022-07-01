import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;
let chartDom = document.getElementById('number-chart')!;
let numberChart = echarts.init(chartDom);
let option: EChartsOption;

option = {
	dataset: [
		{
			dimensions: ['name', 'number'],
			source: []
		},
		{
			transform: {
				type: 'sort',
				config: { dimension: 'number', order: 'asc' }
			}
		}
	],
	yAxis: {
		type: 'category',
		axisLabel: {
			interval: 0,
			//rotate: 60
		}
	},
	xAxis: { position: 'top', },
	visualMap: {
		show: false,
		//orient: 'horizontal',
		//left: 'center',
		min: 10,
		max: 1000,
		text: ['High Score', 'Low Score'],
		dimension: 1,
		inRange: {
			color: ['#65B581', '#FFCE34', '#FD665F']
		}
	},
	grid: {
		bottom: 0,
		left: 200,
	},
	series: {
		type: 'bar',
		encode: { x: 'number', y: 'name' },
		datasetIndex: 1,
	},
	animationDuration: 400
};

option && numberChart.setOption(option);

export { numberChart }