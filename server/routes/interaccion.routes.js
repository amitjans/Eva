const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const router = express.Router();
const { deleterec, createThis } = require('../controllers/interaccion.controller');
const { find, unifyById, unifyByInt } = require('../../vpl/Unify_Node');
const { ProcessFlow } = require('../../vpl/VPL_Process');
const AdmZip = require("adm-zip");
const pack = require('../store/export');
const uninstall = require('../store/uninstall');
const install = require('../store/install');

router.delete('/rec/:id', deleterec);

router.get('/unified/:id', async function (req, res) {
	const temp = await getThis(req.params.id, 'interaccion');
	let obj = await unifyByInt(temp);
	await createThis(temp.nombre + '_expandida', obj);
	res.status(200).jsonp();
});

router.get('/export/:id', pack);

router.get('/uninstall/:id', uninstall);

router.post('/install', install);

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