import _ from 'underscore';
import { buildingData, classroomChart } from './classroom-chart';
import config from './config';
import { numberChart } from './number-chart';

let status: boolean = false;

const init = (data: Array<any>) => {
	let dat = data.find(t => t["KSDM"] == config.KSDM)["data"];
	let groups = _.chain(dat).groupBy(t => {
		let s: string = t["KSSJMS"];
		return s.substring(0, s.indexOf(":") + 3) + s.substring(s.indexOf("("));
	});
	let yaprsByTime = groups.mapObject(t =>
		_.chain(t).groupBy("KCM").mapObject(u => _.reduce(u, (a, b) => a + b["NKRS"], 0)).value()
	).pairs().sortBy(0).value();
	let kcmByJasmc = groups.mapObject(t =>
		_.chain(t).groupBy("JASMC").mapObject(u => u[0]["KCM"] + "\n" + _.unique(u.map(v => v["SKJS"])).join(",")).value()
	).pairs().sortBy(0).value();

	console.log(yaprsByTime);
	console.log(kcmByJasmc);

	const handler = function (i: number) {
		if (!status) return;

		console.log(yaprsByTime[i]);
		let paris = _.pairs(yaprsByTime[i][1])
		numberChart.setOption({
			title: { text: yaprsByTime[i][0] },
			grid: { height: paris.length * 15 },
			dataset: [{ source: paris }],
		});

		for (let p of buildingData) {
			p[6] = false;
			let kk: string = String(p[5]);
			p[7] = kk.substring(kk.indexOf("-") + 1);
		}
		for (let p in kcmByJasmc[i][1]) {
			let bd = buildingData.find(t => t[5] === p);
			if (bd) {
				bd[6] = true;
				bd[7] = kcmByJasmc[i][1][p];
			}
		}
		classroomChart.setOption({
			series: [{ data: buildingData }]
		});
		if (i + 1 < yaprsByTime.length && status) {
			setTimeout(handler, config.interval, i + 1);
		} else if (i + 1 >= yaprsByTime.length) {
			status = false;
		}
	};
	document.onkeyup = ev => {
		if (ev.code === config.startkey && !status) {
			status = true;
			setTimeout(handler, config.timeout, 0);
		}
		if (ev.code === config.endkey) {
			status = false;
		}
	};
};

export { init }