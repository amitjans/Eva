const express = require('express');
const fs = require('fs');
var router = express.Router();
const nodes = require('../../vpl/VPL_Node');
const interaccion = require('../controllers/interaccion.controller');
const unify = require('../../vpl/Unify_Node');
const { ProcessFlow } = require('../../vpl/VPL_Process');
var { FirstsNodes } = require('../../vpl/NodeUtils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/speak', async function (req, res) {
	await social.speak(req.query.speak);
	res.status(200).jsonp();
});

router.post('/nodes', async function (req, res) {
	await nodes.ProcessNode(req.body);
	res.status(200).jsonp();
});

router.get('/test', async function (req, res) {
	console.log(await social.listen('watson'));
	res.status(200).jsonp();
});

router.get('/interaccion/unified/:id', async function (req, res) {
	const temp = await interaccion.getThis(req.params.id);
	let obj = await unify.unifyByInt(temp);
	await interaccion.createThis(temp.nombre + '_expandida', obj);
	res.status(200).jsonp();
});

router.get('/interaccion/:id', async function (req, res) {
	res.status(200).jsonp();

	respuesta = [];
	counter = {};

	let obj = await unify.unifyById(req.params.id);
	var fnodes = FirstsNodes(obj.link, obj.node.slice());

	social.resetlog();
	await ProcessFlow(obj.node, obj.link, fnodes, 0);
	["respuesta", "sactual", "lemotion", "counter", "apidata", "iscript"].forEach(item => { delete global[item] });
	social.setConf(JSON.parse(fs.readFileSync('./config.json')));
	social.savelogs('');
});

module.exports = router;
