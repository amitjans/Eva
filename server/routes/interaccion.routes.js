const express = require('express');
const fs = require('fs');
const router = express.Router();
const interaccion = require('../controllers/interaccion.controller');
const unify = require('../../vpl/Unify_Node');
const { ProcessFlow } = require('../../vpl/VPL_Process');
var { FirstsNodes } = require('../../vpl/NodeUtils');

router.delete('/rec/:id', interaccion.deleterec);

router.get('/unified/:id', async function (req, res) {
    const temp = await interaccion.getThis(req.params.id);
	let obj = await unify.unifyByInt(temp);
	await interaccion.createThis(temp.nombre + '_expandida', obj);
	res.status(200).jsonp();
});

router.get('/export/:id', async function (req, res) {
	res.status(200).json(await unify.unifyById(req.params.id));
});

router.get('/:id', async function (req, res) {
	res.status(200).jsonp();

	respuesta = [];
	counter = {};

	let obj = await unify.unifyById(req.params.id);
	var fnodes = FirstsNodes(obj.link, obj.node.slice());

	social.resetlog();
	await ProcessFlow(obj.node, obj.link, fnodes, 0);
	["respuesta", "sactual", "lemotion", "counter", "apidata", "iscript"].forEach(item => { delete global[item] });
	social.setConf(JSON.parse(fs.readFileSync('./config.json')));
	social.resetlog();
});

module.exports = router;