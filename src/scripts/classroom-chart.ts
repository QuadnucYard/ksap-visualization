import _ from 'underscore';
import buildingDataRaw from './building-data';
import badgeUrl from '@/assets/badge.png'

import * as echarts from 'echarts/core';
import {
  GraphicComponent,
  GraphicComponentOption,
  GridComponent,
  GridComponentOption,
} from 'echarts/components';
import { CustomChart, CustomSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  GridComponent,
  GraphicComponent,
  CustomChart,
  CanvasRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  | GridComponentOption
  | CustomSeriesOption
  | GraphicComponentOption
>;

let buildingData = _.map(buildingDataRaw, p =>
  p.d.rooms.map((t, i) =>
    t.map((u, j) => [
      p.d.x + p.d.width * j / t.length, // 0: x
      p.d.y + p.d.height * (i + 1) / p.d.rooms.length, // 1: y
      p.d.width / t.length, // 2: width
      p.d.height / p.d.rooms.length, // 3: height
      p.d.index, // 4: index
      p.p + u, // 5: classroom-num
      false, // 6: ks
      p.p + u, // 7: label
    ])
  )
).flat(2);

console.log(buildingData);

let classroomChart = echarts.init(document.getElementById('classroom-chart')!);
let option2: EChartsOption;

let colors = [
  '#63b2ee',
  '#76da91',
  '#f8cb7f',
  '#f89588',
  '#7cd6cf',
  //'#9192ab',
  //'#7898e1',
  //'#efa666',
  //'#eddd86',
  '#9987ce',
];

declare type RectLike = {
  x: number;
  y: number;
  width: number;
  height: number;
};

option2 = {
  xAxis: { show: false, scale: true, max: 250 },
  yAxis: { show: false, scale: true },
  grid: {
    show: false,
    left: 10,
    right: 10,
    top: 10,
  },
  series: [{
    type: 'custom',
    label: {
      show: true,
      position: "inside",
      lineHeight: 17,
    },
    renderItem: function (params, api) {
      let startPoint = api.coord([Number(api.value(0)), Number(api.value(1))]);
      let endPoint = api.coord([Number(api.value(0)) + Number(api.value(2)), Number(api.value(1)) + Number(api.value(3))]);

      var rectShape = echarts.graphic.clipRectByRect({
        x: startPoint[0],
        y: startPoint[1],
        width: endPoint[0] - startPoint[0],
        height: startPoint[1] - endPoint[1],
      }, params.coordSys as any as RectLike);

      return rectShape && {
        type: 'rect',
        shape: rectShape,
        style: api.style({
          fill: colors[Number(api.value(4))],
          opacity: api.value(6) ? 0.75 : 0.5,
          stroke: "#777",
          strokeOpacity: 0.5,
        }),
      };
    },
    data: buildingData,
    encode: {
      x: [0],
      y: [1],
      label: [7]
    },
  }],
  graphic: [
    {
      type: "text",
      z: 100,
      left: 180,
      top: 370,
      style: {
        fill: '#efa666',
        text: '教一',
        font: 'bold 16px sans-serif'
      }
    },
    {
      type: "text",
      z: 100,
      left: 180,
      top: 160,
      style: {
        fill: '#efa666',
        text: '教三',
        font: 'bold 16px sans-serif'
      }
    },
    {
      type: "text",
      z: 100,
      right: 210,
      top: 90,
      style: {
        fill: '#efa666',
        text: '教八',
        font: 'bold 16px sans-serif'
      }
    },
    {
      type: "text",
      z: 100,
      right: 210,
      top: 300,
      style: {
        fill: '#efa666',
        text: '教六',
        font: 'bold 16px sans-serif'
      }
    },
    {
      type: "text",
      z: 100,
      right: 210,
      top: 510,
      style: {
        fill: '#efa666',
        text: '教四',
        font: 'bold 16px sans-serif'
      }
    },
    {
      type: "text",
      z: 100,
      right: 210,
      top: 720,
      style: {
        fill: '#efa666',
        text: '教二',
        font: 'bold 16px sans-serif'
      }
    },
    {
      type: "text",
      z: -100,
      left: 250,
      bottom: 50,
      style: {
        fill: '#777',
        text: '  东 南 大 学 \n考试周可视化',
        font: 'bold 80px sans-serif',
        opacity: 0.1,
        lineHeight: 100,
      }
    },
    {
      type: 'image',
      left: 415,
      bottom: 260,
      z: -100,
      bounding: 'raw',
      style: {
        image: badgeUrl,
        width: 160,
        height: 160,
        opacity: 0.1,
      }
    }
  ]
};

option2 && classroomChart.setOption(option2);

export { buildingData, classroomChart };