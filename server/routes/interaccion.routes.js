const express = require('express');
const fs = require('fs');
const router = express.Router();
const { deleterec, createThis } = require('../controllers/interaccion.controller');
const { getData } = require('../controllers/script.controller');
const { getThis } = require('../controllers/common.controller');
const { unifyById, unifyByInt } = require('../../vpl/Unify_Node');
const { ProcessFlow } = require('../../vpl/VPL_Process');
var { FirstsNodes } = require('../../vpl/NodeUtils');

router.delete('/rec/:id', deleterec);

router.get('/unified/:id', async function (req, res) {
	const temp = await getThis(req.params.id, 'interaccion');
	let obj = await unifyByInt(temp);
	await createThis(temp.nombre + '_expandida', obj);
	res.status(200).jsonp();
});

router.get('/export/:id', async function (req, res) {
	let interaction = await unifyById(req.params.id);
	for (let element of interaction.node) {
		console.log(element);
		if (element.type === 'script') {
			element.data = (await getData(element.sc)).map(x => { delete x._id; delete x.script; return x });
		} else if (element.type === 'led' || element.type === 'sound') {
			element.anim = await getThis(element.anim, 'led');
			delete element.anim._id;
		}
	};
	res.status(200).json(interaction);
});

router.get('/:id', async function (req, res) {
	res.status(200).jsonp();

	respuesta = [];
	counter = {};

	let obj = await unifyById(req.params.id);
	var fnodes = FirstsNodes(obj.link, obj.node.slice());

	social.resetlog();
	await ProcessFlow(obj.node, obj.link, fnodes, fnodes[0]);
	["respuesta", "sactual", "lemotion", "counter", "apidata", "iscript"].forEach(item => { delete global[item] });
	social.setConf(JSON.parse(fs.readFileSync('./config.json')));
	social.resetlog();
});

module.exports = router;