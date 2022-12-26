const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const router = express.Router();
const { deleterec, createThis } = require('../controllers/interaccion.controller');
const { getData, get } = require('../controllers/script.controller');
const { getThis } = require('../controllers/common.controller');
const { find, unifyById, unifyByInt } = require('../../vpl/Unify_Node');
const { ProcessFlow } = require('../../vpl/VPL_Process');
var { FirstsNodes } = require('../../vpl/NodeUtils');
const AdmZip = require("adm-zip");

router.delete('/rec/:id', deleterec);

router.get('/unified/:id', async function (req, res) {
	const temp = await getThis(req.params.id, 'interaccion');
	let obj = await unifyByInt(temp);
	await createThis(temp.nombre + '_expandida', obj);
	res.status(200).jsonp();
});

router.get('/export/:id', async function (req, res) {
	let obj = await find(req.params.id);
	let dir = `./public/app/${obj.nombre}`;

	fs.mkdirSync(`${dir}/`, {recursive: true});
	fs.writeFileSync(`${dir}/${obj.nombre}.json`, JSON.stringify(obj));
	fs.writeFileSync(`${dir}/${obj.nombre}.json.sha256`, fileSha256(`${dir}/${obj.nombre}.json`));

	let int = await unifyById(req.params.id);

	let sounds = int.filter(i => i.type === 'sound');
	for (const item of sounds) {
		fs.mkdirSync(`${dir}/sonidos/`, {recursive: true});
		fs.copyFileSync(`./sonidos/${item.src}.wav`, `${dir}/sonidos/${item.src}.wav`)
		fs.writeFileSync(`${dir}/sonidos/${item.src}.wav.sha256`, fileSha256(`${dir}/sonidos/${item.src}.wav`));
	}

	let scripts = int.filter(i => i.type === 'script');
	for (const item of scripts) {
		let s = await get(item.sc);
		fs.mkdirSync(`${dir}/script/`, {recursive: true});
		fs.writeFileSync(`${dir}/script/${s.nombre}.json`, JSON.stringify({ _id : s._id, nombre: s.nombre, data: item.data }));
		fs.writeFileSync(`${dir}/script/${s.nombre}.json.sha256`, fileSha256(`${dir}/script/${s.nombre}.json`));
	}

	const zip = new AdmZip();
	const outputFile = `${dir}.zip`;
	zip.addLocalFolder(`${dir}`);
	zip.writeZipPromise(outputFile).then(function(){
		fs.rmSync(dir, { recursive: true, force: true });
	});

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