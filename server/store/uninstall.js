const fs = require('fs');
const { deleteLocal } = require('../controllers/common.controller');
const { unifyById } = require('../../vpl/Unify_Node');
const AdmZip = require("adm-zip");

module.exports = async function (req, res) {
	int = await unifyById(req.params.id);

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

	await deleteLocal('interaccion', { _id: req.params.id});

	res.status(200).jsonp();
};