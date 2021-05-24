const express = require('express');
var router = express.Router();
var { appendFile } = require('fs');
const nodes = require('../../vpl/VPL_Node');

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

router.get('/config', async function (req, res) {
	res.status(200).jsonp(social.getConf());
});

router.get('/test', async function (req, res) {
	console.log(await social.listen('watson'));
	res.status(200).jsonp();
});

router.post('/locale', async function (req, res) {
	res.status(200).jsonp();
	let obj = await translateLocale(req.body, req.query.source, req.query.target);
	appendFile('./public/js/i18n/lang-' + req.query.target + '.js',
	`const ${req.query.target} = ${JSON.stringify(obj, null, "\t").replace(/\t\"/gi, '\t').replace(/\":/gi, ':')}`, function (err) {
		if (err) throw err;
		console.log('Updated!');
	});
});

async function translateLocale(obj, source, target) {
	let arr = Object.keys(obj);
	for (let i = 0; i < arr.length; i++) {
		if (typeof obj[arr[i]] === 'object') {
			obj[arr[i]] = await translateLocale(obj[arr[i]], source, target);
		} else {
			obj[arr[i]] = await social.translate(obj[arr[i]], target, source);
		}
	}
	return obj;
}

module.exports = router;
