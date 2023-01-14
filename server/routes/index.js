import express from 'express';
var router = express.Router();
import { ProcessNode } from '../../vpl/VPL_Node.js';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/speak', async function (req, res) {
	await social.speak(req.query.speak);
	res.status(200).jsonp();
});

router.post('/nodes', async function (req, res) {
	await ProcessNode(req.body);
	res.status(200).jsonp();
});

router.get('/config', async function (req, res) {
	res.status(200).jsonp(social.getConf());
});

router.get('/test', async function (req, res) {
	console.log(await social.listen('watson'));
	res.status(200).jsonp();
});

export default router;
