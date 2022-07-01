import _ from 'underscore';
import * as echarts from 'echarts';
import buildingDataRaw from './building-data';

let buildingData = _.map(buildingDataRaw, p =>
  p.d.rooms.map((t, i) =>
    t.map((u, j) => [
      p.d.x + p.d.width * j / t.length, // 0: x
      p.d.y + p.d.height * (i + 1) / p.d.rooms.length, // 1: y
      p.d.width / t.length, // 2: width
      p.d.height / p.d.rooms.length, // 3: height
      p.d.index, // 4: index
      p.p + u, // 5: num
      null, // 6: ks
      p.p + u, // 7: label
    ])
  )
).flat(2);

console.log(buildingData);

let chartDom2 = document.getElementById('classroom-chart')!;
let classroomChart = echarts.init(chartDom2);
let option2: echarts.EChartsOption;

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
      // 要考虑一下每个item存哪些数据
      // 一个教室对应一个矩形框 4个坐标值  加一个名字
      //console.log(params, api)
      //console.log(params.coordSys);
      let startPoint = api.coord([Number(api.value(0)), Number(api.value(1))]);
      let endPoint = api.coord([Number(api.value(0)) + Number(api.value(2)), Number(api.value(1)) + Number(api.value(3))]);
      // console.log(startPoint, endPoint);
      var rectShape = echarts.graphic.clipRectByRect({
        x: startPoint[0],
        y: startPoint[1],
        width: endPoint[0] - startPoint[0],
        height: startPoint[1] - endPoint[1],
      }, params.coordSys);
      // var rectShape = echarts.graphic.clipRectByRect({
      //   x: Number(api.value(0)),
      //   y: Number(api.value(1)),
      //   width: Number(api.value(2)),
      //   height: Number(api.value(3)),
      // }, params.coordSys);

      return rectShape && {
        type: 'rect',
        shape: rectShape,
        style: api.style({
          fill: colors[Number(api.value(4))],
          opacity: api.value(6) ? 1 : 0.5,
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
  animationDuration: 400,
};

option2 && classroomChart.setOption(option2);

export { buildingData, classroomChart };