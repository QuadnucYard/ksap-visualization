//import './style.css';
import { init } from './scripts/init';
import pako from 'pako';
import axios from 'axios';
import dataUrl from './assets/ksap.dat?url'

(async function () {
	let res = await axios({
		method: "get",
		url: dataUrl,
		responseType: "arraybuffer",
	});
	let buffer = pako.inflate(res.data).buffer;
	let blob = new Blob([buffer], { type: 'charset=utf-8' })
	let contents = await blob.text();
	init(JSON.parse(contents));
})();
