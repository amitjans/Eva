var express = require('express');
var router = express.Router();
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
	await nodes.ProcessNode(social, evaId, usuarioId, req.body);
	res.status(200).jsonp();
});

router.get('/interaccion/iniciarInteraccion1', async function (req, res) {
	//console.log(await social.dialogflow('hola'));
	//console.log(social.listen());
	res.status(200).jsonp();
});

router.get('/interaccion/iniciaremocion', function (req, res) {
  let id = req.query.e;
	//sad
	if (id >= 1 && id <= 3) {
		social.emotions('sad', id - 1);
	}
	//anger
	if (id >= 4 && id <= 6) {
		social.emotions('anger', id - 4);
	}
	//joy
	if (id >= 7 && id <= 9) {
		social.emotions('joy', id - 7);
	}
	//ini
	if (id == 0) {
		social.emotions('ini', 0);
	}
	//exit
	if (id == 10) {
		social.emotions('exit', 0);
	}
	res.status(200).jsonp();
});

module.exports = router;
