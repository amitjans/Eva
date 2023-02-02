const fs = require('fs');
const { createLocal, updateLocal } = require('../controllers/common.controller');
const AdmZip = require("adm-zip");
const clone = require('../../utils/clone');

module.exports = async function (req, res) {

	let buff = Buffer.from(req.body.data, 'base64');
	let dir = `./public/app/${req.body.name}`;
	fs.writeFileSync(`${dir}.zip`, buff);

	var zip = new AdmZip(`${dir}.zip`);
	let interacciones = [];

	zip.extractAllTo(`${dir}/`, true);

	if (fs.existsSync(`${dir}/sonidos`)) {
		fs.readdirSync(`${dir}/sonidos/`)
			.filter(file => !file.match(/\.sha256$/))
			.forEach(function (file) {
				fs.copyFileSync(`${dir}/sonidos/${file}`, `./sonidos/${file}`);
			})
	}

	if (fs.existsSync(`.${dir}/images`)) {
		fs.readdirSync(`${dir}/images/`)
			.filter(file => !file.match(/\.sha256$/))
			.forEach(function (file) {
				fs.copyFileSync(`${dir}/images/${file}`, `./public/images/${file}`);
			})
	}

	if (fs.existsSync(`${dir}/leds`)) {
		fs.readdirSync(`${dir}/leds/`)
			.filter(file => !!file.match(/\.js$/))
			.forEach(function (file) {
				fs.copyFileSync(`${dir}/leds/${file}`, `./leds/${file}`);
			})
	}

	if (fs.existsSync(`${dir}/mov`)) {
		fs.readdirSync(`${dir}/mov/`)
			.filter(file => !!file.match(/\.json$/))
			.forEach(function (file) {
				createLocal("mov", JSON.parse(fs.readFileSync(`./${dir}/mov/${file}`, 'utf-8')));
			})
	}

	let iFiles = fs.readdirSync(`${dir}/`).filter(file => !!file.match(/\.json$/))
	for (const file of iFiles) {
		interacciones.push(JSON.parse(fs.readFileSync(`./${dir}/${file}`, 'utf-8')));
	}
	interacciones.sort(ordenar);

	if (fs.existsSync(`${dir}/anims`)) {
		let files = fs.readdirSync(`${dir}/anims/`).filter(file => !!file.match(/\.json$/));
		for (const file of files) {
			let temp = JSON.parse(fs.readFileSync(`./${dir}/anims/${file}`, 'utf-8'));
			let oldId = temp._id;
			temp = createLocal("led", temp);
			sobreescribir(interacciones, oldId, temp._id);
		}
	}

	if (fs.existsSync(`${dir}/script`)) {
		let files = fs.readdirSync(`${dir}/script/`).filter(file => !!file.match(/\.json$/));
		for (const file of files) {
			let temp = JSON.parse(fs.readFileSync(`./${dir}/script/${file}`, 'utf-8'));

			let oldId = temp._id;
			let newId = (await createLocal("script", { nombre: temp.nombre }))._id;
			sobreescribir(interacciones, oldId, newId);

			for (const i of temp.data) {
				i['script'] = newId;
				await createLocal("scriptdata", i);
			}
		}
	}

	for (let i = 0; i < interacciones.length; i++) {
		if (interacciones[i]._id) {
			let temp = await createLocal("interaccion", clone(interacciones[i]));
			sobreescribir(interacciones, interacciones[i]._id, temp._id);
			if (interacciones[i].xml != temp.xml) {
				interacciones[i] = await updateLocal("interaccion", { _id: temp._id, nombre: temp.nombre, xml: interacciones[i].xml, descripcion: temp.descripcion ?? "" });
			}
		} else {
			await createLocal("interaccion", interacciones[i]);
		}
	}

	fs.rmSync(dir, { recursive: true, force: true });
	fs.rmSync(`${dir}.zip`);

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
		lista[i].xml = lista[i].xml.replace(new RegExp(viejo, "g"), nuevo);
	}
	return lista;
}