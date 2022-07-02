import * as echarts from 'echarts/core';
import {
	DatasetComponent,
	DatasetComponentOption,
	GridComponent,
	GridComponentOption,
	TitleComponent,
	TitleComponentOption,
	TransformComponent,
	VisualMapComponent,
	VisualMapComponentOption,
} from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
	DatasetComponent,
	GridComponent,
	TitleComponent,
	TransformComponent,
	VisualMapComponent,
	BarChart,
	CanvasRenderer
]);

type EChartsOption = echarts.ComposeOption<
	| DatasetComponentOption
	| GridComponentOption
	| TitleComponentOption
	| VisualMapComponentOption
	| BarSeriesOption
>;

let numberChart = echarts.init(document.getElementById('number-chart')!);
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
	title: {
		textStyle: {
			color: '#7898e1',
			fontSize: 16,
		},
		top: 10,
	},
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
		label: {
			show: true,
			color: '#b03a5b',
			fontSize: 10,
			position: 'right',
			verticalAlign: 'middle',
		},
	},
	animationDuration: 400
};

option && numberChart.setOption(option);

export { numberChart }