var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./server/routes/index');
var logs = require('./log');
const crypto = require('crypto');
var fs = require('fs');

var preguntas = require('./interacciones/exp3qaa');

var Compare = require('./utils/Compare');
var random = require('./utils/Random');
var nodeutils = require('./vpl/NodeUtils');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', require('./server/routes/users'));

app.use('/api/interaccion', require('./server/routes/interaccion.routes.js'));
app.use('/api/script', require('./server/routes/script.routes.js'));
app.use('/api/scriptdata', require('./server/routes/scriptdata.routes.js'));
app.use('/api/audio', require('./server/routes/audio.routes.js'));
app.use('/api/filters', require('./server/routes/listeningfilters.routes.js'));

const { mongoose } = require('./server/database');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

var io;
var setIO = function (ioBase) {
	console.log(io);
	io = ioBase;
}

var usuarioId = { autor: 'Usuario', class: 'text-muted' };
var evaId = { autor: 'Robot Eva', class: 'text-danger' };
var indiceScript1 = 1;

var enviarMensaje = function (autor, msg, media) {
	var data = autor;
	data.mensaje = indiceScript1 + ": " + msg;
	data.fecha = Date.now();
	if (media)
		data.media = media;
	console.log(data);
	io.sockets.emit('messages', data);
};

var eyes = function (params) {
	io.sockets.emit('messages', params);
}

module.exports.enviarMensaje = enviarMensaje;
module.exports.eyes = eyes;

var enviarError = function (error, query) {
	var data = {};
	data.error = error;
	data.query = query;
	console.log(data);
	io.sockets.emit('messages', data);
}

module.exports.setIO = setIO;

var SocialRobot = require('./social_robot');
var credentials = require('./config-services');

var exp1 = require('./interacciones/exp1');
var exp2 = require('./interacciones/exp2');
var exp3 = require('./interacciones/exp3');

var gn = require('./interacciones/common/getname');
var p = require('./interacciones/common/platica');
const interaccion = require('./server/models/interaccion');
const script = require('./server/models/script');
const vpl = require('./vpl/VPL_Node');
const unify = require('./vpl/Unify_Node');


var social = new SocialRobot(credentials.config, credentials.credentials);
module.exports.social = social;

index.get('/interaccion/iniciarInteraccion1', async function (req, res) {
	res.status(200).jsonp();
	social.resetlog();
	social.setEmotional(true);
	let nombre = await gn.getName(social, evaId, usuarioId);
	await exp3.QaA(social, evaId, usuarioId);
	await exp3.Despedida(social);
	social.savelogs(nombre);
});

index.get('/interaccion/iniciarInteraccion2', async function (req, res) {
	res.status(200).jsonp();
	social.resetlog();
	// social.setEmotional(true);
	// let nombre = 'adrian';	
	let nombre = await gn.getName(social, evaId, usuarioId);
	await p.inicial(social, evaId, usuarioId);
	await social.play('./interacciones/exp2files/link.wav');
	await exp2.autopilot(social, evaId, usuarioId);
	await social.play('./interacciones/exp2files/cuestionario.wav');
	await exp2.Despedida(social);
	social.savelogs(nombre);
});

var logs = require('./log');
index.get('/interaccion/iniciarInteraccion3', async function (req, res) {
	res.status(200).jsonp();
	social.resetlog();
	social.setEmotional(false);
	let nombre = await gn.getName(social, evaId, usuarioId);
	await exp3.QaA(social, evaId, usuarioId);
	await exp3.Despedida(social);
	social.savelogs(nombre);
});

index.get('/interaccion/iniciarInteraccion4', async function (req, res) {
	res.status(200).jsonp();
	social.resetlog();
	social.setEmotional(false);
	let nombre = await gn.getName(social, evaId, usuarioId);
	await p.inicial(social, evaId, usuarioId);
	await exp1.Ultimatum(social, evaId, usuarioId);
	await exp1.Despedida(social);
	social.savelogs(nombre);
});

index.get('/interaccion/iniciarInteraccion5', async function (req, res) {
	res.status(200).jsonp();
	social.resetlog();
	social.setEmotional(true);
	let nombre = await gn.getName(social, evaId, usuarioId);
	await p.inicial(social, evaId, usuarioId);
	await exp1.Ultimatum(social, evaId, usuarioId);
	await exp1.Despedida(social);
	social.savelogs(nombre);
});

var lastlevel = 0;

index.get('/interaccion/iniciaremocion', function (req, res) {
	//sad
	if (req.query.e == 1) {
		lastlevel = 0;
		social.emotions('sad', 0);
	}
	if (req.query.e == 2) {
		lastlevel = 1;
		social.emotions('sad', 1);
	}
	if (req.query.e == 3) {
		lastlevel = 2;
		social.emotions('sad', 2);
	}
	//anger
	if (req.query.e == 4) {
		lastlevel = 0;
		social.emotions('anger', 0);
	}
	if (req.query.e == 5) {
		lastlevel = 1;
		social.emotions('anger', 1, true, 0.5);
	}
	if (req.query.e == 6) {
		lastlevel = 2;
		social.emotions('anger', 2);
	}
	//joy
	if (req.query.e == 7) {
		lastlevel = 0;
		social.emotions('joy', 0);
	}
	if (req.query.e == 8) {
		lastlevel = 1;
		social.emotions('joy', 1);
	}
	//ini
	if (req.query.e == 0) {
		social.emotions('ini', 0);
	}
	//exit
	if (req.query.e == 10) {
		social.emotions('exit', 0);
	}
	console.log(req.query.e);
	res.status(200).jsonp();
});

var respuesta = [];
var nodes = [];
var links = [];
var s = {};
var sactual;
var lemotion = [];
var counter = {};

function setRespuesta(value) {
	respuesta.push(value);
}
function getRespuesta() {
	return respuesta;
}

function setSactual(value) {
	sactual = value;
}
function getSactual() {
	return sactual;
}

function addlemotion(value) {
	lemotion.push(value);
}

function getlemotion() {
	return lemotion;
}

function setCounter(value) {
	counter = value;
}

function getCounter() {
	return counter;
}

module.exports.setRespuesta = setRespuesta;
module.exports.getRespuesta = getRespuesta;
module.exports.setSactual = setSactual;
module.exports.getSactual = getSactual;
module.exports.addlemotion = addlemotion;
module.exports.getlemotion = getlemotion;
module.exports.setCounter = setCounter;
module.exports.getCounter = getCounter;

index.get('/interaccion/unified', async function (req, res) {
	const temp = await interaccion.findById(req.query.id);
	var json = JSON.parse(temp.data);

	nodes = json.node;
	links = json.link;
	respuesta = [];
	counter = {};

	let tempname = temp.nombre + '_expandida';

	let obj = await unify.unify(nodes, links);
	nodes = obj.nodes;
	links = obj.links;

	const nuevointeraccion = new interaccion();
	nuevointeraccion.nombre = tempname;
	nuevointeraccion.data = JSON.stringify({ node: nodes, link: links });
	await nuevointeraccion.save();
	res.status(200).jsonp();
});

index.get('/interaccion/audio', async function (req, res) {
	res.status(200).jsonp();
	console.log('./sonidos/' + req.query.id + '.wav');
	await social.play('./sonidos/' + req.query.id + '.wav');
});

index.get('/interaccion/iniciarInteracciong', async function (req, res) {
	res.status(200).jsonp();
	const temp = await interaccion.findById(req.query.id);
	var json = JSON.parse(temp.data);

	nodes = json.node;
	links = json.link;
	respuesta = [];

	let obj = await unify.unify(nodes, links);
	nodes = obj.nodes;
	links = obj.links;

	var fnodes = nodeutils.FirstsNodes(links, nodes.slice());

	social.resetlog();
	await ProcessFlow(nodes, links, fnodes, 0);
	social.setVoice('es-LA_SofiaV3Voice');
	social.savelogs('');
});

index.get('/interaccion/qaa', async function (req, res) {
	social.ledsanimstop();
	if (req.query.id === 'ini') {
		res.status(200).json({ preguntas: preguntas.getPreguntas(), emotional: social.getEmotional() });
	} else if (req.query.id === 'p') {
		res.status(200).json();
		await social.play('./interacciones/exp3files/questions/' + req.query.q + '.wav');
		social.ledsanim('escuchaT');
	} else if (req.query.id === 'r') {
		res.status(200).json();
		//Respuesta(social, evaId, pregunta, expression, correctas, i)
		await exp3.Respuesta(social, evaId, { respaudio: './interacciones/exp3files/answers/' + req.query.q + '.wav' }, parseInt(req.query.e), parseInt(req.query.ok), parseInt(req.query.i));
	} else if (req.query.id === 'otrasi') {
		res.status(200).json();
		await exp3.OtraRonda(social, 'si');
	} else if (req.query.id === 'otrano') {
		res.status(200).json();
		await exp3.OtraRonda(social, 'no');
	} else if (req.query.id === 'end') {
		res.status(200).json();
		await exp3.Despedida(social);
	} else if (req.query.id === 'resumen') {
		res.status(200).json();
		// Resumen(social, correctas, total)
		await exp3.Resumen(social, parseInt(req.query.ok), parseInt(req.query.t));
	} else if (req.query.id === 'listen') {
		res.status(200).json();
		social.ledsanim('escuchaT');
	} else if (req.query.id === 'emotion') {
		social.setEmotional(!social.getEmotional());
		res.status(200).json({ emotional: social.getEmotional() });
	} else if (req.query.id === 'speak') {
		res.status(200).json();
		social.speak(req.query.speak);
	} else {
		await social.play('./interacciones/exp3files/' + req.query.id + '.wav');
		if (!!req.query.opt) {
			social.ledsanim('escuchaT');
		}
		res.status(200).json();
	}
});

var name = '';

index.get('/interaccion/auto', async function (req, res) {
	social.ledsanimstop();
	if (req.query.id === 'c') {
		res.status(200).json();
		if (req.query.r === 'r') {
			await social.play('./interacciones/exp2files/repetir.wav');
		}
		await exp2.TellCase(social, evaId, parseInt(req.query.c), req.query.r === 'r');
		social.ledsanim('escuchaT');
	} else if (req.query.id === 'a') {
		res.status(200).json();
		await exp2.Respuesta(social, usuarioId, req.query.c, req.query.opt);
	} else if (req.query.id === 'p1') {
		res.status(200).json();
		await social.play('./interacciones/platica/1.wav');
	} else if (req.query.id === 'p') {
		res.status(200).json();
		await p.inicial(social, evaId, usuarioId, false);
		await social.play('./interacciones/exp2files/link.wav');
		await social.play('./interacciones/exp2files/s0.wav');	
	} else if (req.query.id === 'end') {
		res.status(200).json();
		var obj = await social.play('./interacciones/exp2files/interesante.wav');
		await social.play('./interacciones/exp2files/cuestionario.wav');
		await exp2.Despedida(social);
		social.savelogs(name);
	} else if (req.query.id === 'listen') {
		res.status(200).json();
		social.ledsanim('escuchaT');
	} else if (req.query.id === 'emotion') {
		social.setEmotional(!social.getEmotional());
		res.status(200).json({ emotional: social.getEmotional() });
	} else if (req.query.id === 'speak') {
		res.status(200).json();
		await social.speak('Mucho gusto en conocerte ' + req.query.speak);
		name = req.query.speak;
		social.templog(usuarioId, req.query.speak);
	} else {
		await social.play('./interacciones/exp' + (/(hola|gusto|bueno|ves|escuchas|empezar)/.test(req.query.id) ? 3 : 2) + 'files/' + req.query.id + '.wav');
		if (!!req.query.opt) {
			social.ledsanim('escuchaT');
		}
		res.status(200).json();
	}
});

async function ProcessFlow(nodes, links, fnodes, ini) {
	let aux = [fnodes[ini]];
	let n = true;
	do {
		console.log(aux);
		if (aux.length == 1 || aux[0].type !== 'if') {
			if (aux[0].type === 'for') {
				if (aux[0].iteraciones <= -1) {
					let ss = nodes.filter(i => i.group === aux[0].key && i.type === 'script')[0];
					await LoadScriptData(ss);
					aux[0].iteraciones = s[ss.key + ''].length;
				}
				for (let f = 0; f < aux[0].iteraciones; f++) {
					await ProcessFlow(nodes, links, fnodes, nodeutils.FirstsOfGroup(fnodes, aux[0].key));
				}
			} else if (aux[0].type === 'int') {
				switch (aux[0].int) {
					case '0':
						respuesta.push(await gn.getName(social, evaId, usuarioId));
						break;
					case '1':
						await exp1.Ultimatum(social, evaId, usuarioId);
						break;
					case '2':
						await exp2.autopilot(social, evaId, usuarioId);
						break;
					case '3':
						await exp3.QaA(social, evaId, usuarioId);
						break;
					case '4':
						await p.inicial(social, evaId, usuarioId);
						break;
					default:
						break;
				}
			} else if (aux[0].type === 'script') {
				await LoadScriptData(aux[0]);
				sactual = s[aux[0].key + ''].shift();
				await vpl.ProcessNode(social, evaId, usuarioId, { key: crypto.createHash('md5').update(sactual.campo1).digest("hex"), type: "speak", text: sactual.campo1 });
			} else if (aux[0].type === 'led' && aux[0].anim !== 'stop') {
				let aux_t = nodeutils.NextNode(links, aux[0], nodes);
				if (!!aux_t[0]) {
					if (aux_t[0].type === 'speak' || aux_t[0].type === 'sound') {
						aux_t[0].anim = aux[0].anim;
						aux[0] = aux_t[0];
					}
				}
				await vpl.ProcessNode(social, evaId, usuarioId, aux[0]);
			} else {
				await vpl.ProcessNode(social, evaId, usuarioId, Object.assign({}, aux[0]));
			}
			aux = nodeutils.NextNode(links, aux[0], nodes);
		} else if (aux.length > 1) {
			console.log(respuesta[respuesta.length - 1]);
			for (let c = 0; c < aux.length; c++) {
				if (aux[c].text.includes('%')) {
					if (Compare((/^(%|%2)$/.test(aux[c].text) ? app.getSactual().campo2 : app.getSactual().campo1), respuesta[respuesta.length - 1]) >= aux[c].opt) {
						aux = nodeutils.NextNode(links, aux[c], nodes);
						break;
					}
				} else if (Compare((aux[c].text || ''), respuesta[respuesta.length - 1]) >= aux[c].opt) {
					aux = nodeutils.NextNode(links, aux[c], nodes);
					break;
				} else if ((aux[c].text || '') === '') {
					aux = nodeutils.NextNode(links, aux[c], nodes);
					break;
				}
			}
		}
		n = aux.length > 0;
	} while (n);
}

async function LoadScriptData(item) {
	try {
		if (!s[item.key + '']) {
			s[item.key + ''] = (await script.findById(item.sc).populate('data')).data;
			if (item.random) {
				s[item.key + ''] = random.randomize(s[item.key + '']);
			}
		}	
	} catch (error) {
		console.error();
	}
}
