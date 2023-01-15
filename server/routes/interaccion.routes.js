const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const router = express.Router();
const { deleterec, createThis } = require('../controllers/interaccion.controller');
const { getData, get } = require('../controllers/script.controller');
const leds = require('../controllers/leds.controller');
const mov = require('../controllers/mov.controller');
const { getThis, deleteLocal } = require('../controllers/common.controller');
const { find, unifyById, unifyByInt } = require('../../vpl/Unify_Node');
const { ProcessFlow } = require('../../vpl/VPL_Process');
var { FirstsNodes } = require('../../vpl/NodeUtils');
const AdmZip = require("adm-zip");
const clone = require('../../utils/clone');

router.delete('/rec/:id', deleterec);

router.get('/unified/:id', async function (req, res) {
	const temp = await getThis(req.params.id, 'interaccion');
	let obj = await unifyByInt(temp);
	await createThis(temp.nombre + '_expandida', obj);
	res.status(200).jsonp();
});

router.get('/export/:id', async function (req, res) {
	let obj = clone(await find(req.params.id));
	let dir = `./public/app/${obj.nombre}`;
	delete obj._id;
	console.log(JSON.stringify(obj));

	fs.mkdirSync(`${dir}/`, { recursive: true });
	fs.writeFileSync(`${dir}/${obj.nombre}.json`, JSON.stringify(obj));
	fs.writeFileSync(`${dir}/${obj.nombre}.json.sha256`, fileSha256(`${dir}/${obj.nombre}.json`));

	let interacciones = /<field name=\"int\">[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}<\/field>/;
	let sub = interacciones.exec(obj.xml);
	for(let i of sub) {
		let j = clone(await find(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/.exec(i)[0]));		

		fs.mkdirSync(`${dir}/`, { recursive: true });
		fs.writeFileSync(`${dir}/${j.nombre}.json`, JSON.stringify(j));
		fs.writeFileSync(`${dir}/${j.nombre}.json.sha256`, fileSha256(`${dir}/${j.nombre}.json`));
	}


	let int = await unifyById(req.params.id);

	console.log(int);

	let soundsNode = int.filter(i => i.type === 'sound');
	if (soundsNode.length > 0)
		fs.mkdirSync(`${dir}/sonidos/`, { recursive: true });
	for (const item of soundsNode) {
		fs.copyFileSync(`./sonidos/${item.src}.wav`, `${dir}/sonidos/${item.src}.wav`)
		fs.writeFileSync(`${dir}/sonidos/${item.src}.wav.sha256`, fileSha256(`${dir}/sonidos/${item.src}.wav`));
	}

	let scriptsNode = clone(int.filter(i => i.type === 'script'));
	if (scriptsNode.length > 0)
		fs.mkdirSync(`${dir}/script/`, { recursive: true });
	for (const item of scriptsNode) {
		let s = await get(item.sc);
		for (let i = 0; i < item.data.length; i++) {
			delete item.data[i]._id;
			delete item.data[i].script;
		}
		fs.writeFileSync(`${dir}/script/${s.nombre}.json`, JSON.stringify({ _id: s._id, nombre: s.nombre, data: item.data }));
		fs.writeFileSync(`${dir}/script/${s.nombre}.json.sha256`, fileSha256(`${dir}/script/${s.nombre}.json`));
	}

	let ledNode = int.filter(i => i.type === 'led');
	if (ledNode.length > 0) {
		fs.mkdirSync(`${dir}/anims/`, { recursive: true });
		fs.mkdirSync(`${dir}/leds/`, { recursive: true });
	}
	for (const item of ledNode) {
		let s = clone(await leds.getData(item.anim));
		delete s._id;
		fs.writeFileSync(`${dir}/anims/${s.nombre}.json`, JSON.stringify(s));
		fs.writeFileSync(`${dir}/anims/${s.nombre}.json.sha256`, fileSha256(`${dir}/anims/${s.nombre}.json`));

		fs.readdirSync('./leds').forEach(file => {
			let allFileContents = fs.readFileSync(`./leds/${file}`, 'utf-8');
			if (allFileContents.includes(s.base)) {
				fs.copyFileSync(`./leds/${file}`, `${dir}/leds/${file}`);
				fs.writeFileSync(`${dir}/leds/${file}.sha256`, fileSha256(`${dir}/leds/${file}`));
			}
		});
	}

	let movNode = int.filter(i => i.type === 'mov');
	if (movNode.length > 0) {
		fs.mkdirSync(`${dir}/mov/`, { recursive: true });
	}
	for (const item of movNode) {
		let s = clone(await mov.getByCode(item.mov));
		delete s._id;
		fs.writeFileSync(`${dir}/mov/${s.nombre}.json`, JSON.stringify(s));
		fs.writeFileSync(`${dir}/mov/${s.nombre}.json.sha256`, fileSha256(`${dir}/mov/${s.nombre}.json`));
	}

	const zip = new AdmZip();
	const outputFile = `${dir}.zip`;
	zip.addLocalFolder(`${dir}`);
	zip.writeZipPromise(outputFile).then(function () {
		fs.rmSync(dir, { recursive: true, force: true });
	});

	res.status(200).jsonp();
});

router.get('/uninstall/:id', async function (req, res) {
	int = await unifyById(req.params.id);

	console.log(int);

	let soundsNode = int.filter(i => i.type === 'sound');
	for (const item of soundsNode) {
		fs.rmSync(`./sonidos/${item.src}.wav`, { recursive: false, force: true });
	}

	let scriptsNode = int.filter(i => i.type === 'script');
	for (const item of scriptsNode) {
		await deleteLocal('script', { _id: item.sc });
		await deleteLocal('scriptdata', { script: item.sc });
	}

	let ledNode = int.filter(i => i.type === 'led');
	for (const item of ledNode) {
		await deleteLocal('led', { _id: item.anim });
	}

	let movNode = int.filter(i => i.type === 'mov');
	for (const item of movNode) {
		await deleteLocal('mov', { codigo: item.mov });
	}

	res.status(200).jsonp();
});

function fileSha256(dir) {
	const fileBuffer = fs.readFileSync(dir);
	const hashSum = crypto.createHash('sha256');
	hashSum.update(fileBuffer);
	return hashSum.digest('hex');
}

router.get('/:id', async function (req, res) {
	res.status(200).jsonp();

	respuesta = [];
	counter = {};

	let obj = await unifyById(req.params.id);

	social.resetlog();
	await ProcessFlow(obj[0], obj);
	["respuesta", "sactual", "lemotion", "counter", "apidata", "iscript"].forEach(item => { delete global[item] });
	social.setConf(JSON.parse(fs.readFileSync('./config.json')));
	social.resetlog();
});

module.exports = router;