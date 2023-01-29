const fs = require('fs');
const crypto = require('crypto');
const { createLocal } = require('../controllers/common.controller');
const { get } = require('../controllers/script.controller');
const leds = require('../controllers/leds.controller');
const mov = require('../controllers/mov.controller');
const { find, unifyById } = require('../../vpl/Unify_Node');
const AdmZip = require("adm-zip");
const clone = require('../../utils/clone');
const { list } = require('serialport');

module.exports = async function (req, res) {

	let buff = Buffer.from(req.body.data, 'base64');
	let dir = `./public/app/${req.body.name}`;
	fs.writeFileSync(dir, buff);

	var zip = new AdmZip(`${dir}.zip`);
	let interacciones = [];

	zip.extractAllTo(dir, true);

	if (fs.existsSync(`${dir}/sonidos`)) {
		fs.readdirSync(`${dir}/sonidos/`).forEach(function (file) {
			fs.copyFileSync(`${dir}/sonidos/${file}`, `./sonidos/${file}`);
		})
	}

	if (fs.existsSync(`.${dir}/images`)) {
		fs.readdirSync(`${dir}/images/`).forEach(function (file) {
			fs.copyFileSync(`${dir}/images/${file}`, `./public/images/${file}`);
		})
	}

	if (fs.existsSync(`${dir}/leds`)) {
		fs.readdirSync(`${dir}/leds/`).forEach(function (file) {
			if (!!file.match(/\.js$/)) {
				fs.copyFileSync(`${dir}/leds/${file}`, `./leds/${file}`);
			}
		})
	}

	if (fs.existsSync(`${dir}/mov`)) {
		fs.readdirSync(`${dir}/mov/`).forEach(function (file) {
			if (!!file.match(/\.json$/)) {
				createLocal("mov", JSON.parse(fs.readFileSync(`./${dir}/mov/${file}`, 'utf-8')));
			}
		})
	}

	fs.readdirSync(`${dir}/`).forEach(function (file) {
		if (!!file.match(/\.json$/)) {
			interacciones.push(JSON.parse(fs.readFileSync(`./${dir}/${file}`, 'utf-8')));
		}
	});
	interacciones.sort(ordenar);

	if (fs.existsSync(`${dir}/anims`)) {
		let files = fs.readdirSync(`${dir}/script/`);
		for (const file of files) {
			let temp = JSON.parse(fs.readFileSync(`./${dir}/anims/${file}`, 'utf-8'));
			let oldId = temp._id;
			temp = createLocal("led", temp);
			sobreescribir(interacciones, oldId, temp._id);
		}
	}

	if (fs.existsSync(`${dir}/script`)) {
		let files = fs.readdirSync(`${dir}/script/`);
		for (const file of files) {
			let temp = JSON.parse(fs.readFileSync(`./${dir}/script/${file}`, 'utf-8'));
			let oldId = temp._id;
			let newId = (await createLocal("led", { nombre: temp.nombre }))._id;
			sobreescribir(interacciones, oldId, newId);

			for (const i of temp.data) {
				i['sc'] = newId;
				await createLocal("scriptdata", i);
			}
		}
	}

	for (let i = 0; i < interacciones.length; i++) {
		if (!!interacciones[i]._id) {
			let temp = createLocal("interaccion", interacciones[i])
			sobreescribir(interacciones, interacciones[i]._id, temp._id);
		}
	}
	res.status(200).jsonp();
};

function fileSha256(dir) {
	const fileBuffer = fs.readFileSync(dir);
	const hashSum = crypto.createHash('sha256');
	hashSum.update(fileBuffer);
	return hashSum.digest('hex');
}

function ordenar(a, b) {
	if (!!a.id == !!b.id) {
		return 0;
	} else if (!!a.id && !!a.id == !b.id) {
		return -1;
	}
	return 1;
}

function sobreescribir(lista, viejo, nuevo) {

	for (let i = 0; i < lista.length; i++) {
		lista[i].xml = lista[i].xml.replaceAll(viejo, nuevo);
	}
	return lista;
}