const express = require('express');
var router = express.Router();
const nodes = require('../../vpl/VPL_Node');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index');
});

router.get('/speak', async function (req, res) {
	await social.speak(req.query.speak);
	res.status(200).jsonp({ status: 'Ok' });
});

router.post('/nodes', async function (req, res) {
	await nodes.ProcessNode(req.body);
	res.status(200).jsonp({ status: 'Ok' });
});

router.get('/config', async function (req, res) {
	res.status(200).jsonp(social.getConf());
});

router.get('/test', async function (req, res) {
	console.log(await social.listen('watson'));
	res.status(200).jsonp({ status: 'Ok' });
});

module.exports = router;
