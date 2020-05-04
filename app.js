var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./server/routes/index');

var logs = require('./log');

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
app.get('/interaccion', function (req, res) {
	res.render('interaccion');
});
app.get('/script', function (req, res) {
	res.render('script');
});
app.get('/scriptdata', function (req, res) {
	res.render('scriptdata');
});
app.get('/audio', function (req, res) {
	res.render('audio');
});
app.get('/qaa', function (req, res) {
	res.render('qaa');
});
app.use('/api/interaccion', require('./server/routes/interaccion.routes.js'));
app.use('/api/script', require('./server/routes/script.routes.js'));
app.use('/api/scriptdata', require('./server/routes/scriptdata.routes.js'));
app.use('/api/audio', require('./server/routes/audio.routes.js'));

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

var request;

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

var fs = require('fs');
var util = require('util');

var PlayMusic = require('playmusic');

var kill = require('tree-kill');

var SocialRobot = require('./social_robot');
var credentials = require('./config-services');
var social = new SocialRobot(credentials.config, credentials.credentials);
module.exports.social = social;

var exp1 = require('./interacciones/exp1');
var exp2 = require('./interacciones/exp2');
var exp3 = require('./interacciones/exp3');
var preguntas = require('./interacciones/exp3qaa');
var random = require('./utils/Random');
var gn = require('./interacciones/common/getname');
var p = require('./interacciones/common/platica');

index.get('/interaccion/iniciarInteraccion1', async function (req, res) {
	res.status(200).jsonp();
	social.resetlog();
	let nombre = await gn.getName(social, evaId, usuarioId);
	await exp3.QaA(social, evaId, usuarioId);
	await exp3.Despedida(social);
	social.savelogs(nombre);
});

index.get('/interaccion/iniciarInteraccion2', async function (req, res) {
	res.status(200).jsonp();
	social.resetlog();
	let nombre = await gn.getName(social, evaId, usuarioId);
	await exp2.autopilot(social, evaId, usuarioId);
	await exp2.Despedida(social);
	social.savelogs(nombre);
});

var logs = require('./log');
index.get('/interaccion/iniciarInteraccion3', function (req, res) {
	console.log(random.generarNumeroRandom(100, 200));
	res.status(200).jsonp();
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
	console.log(req.query.e);
	res.status(200).jsonp();
});

const interaccion = require('./server/models/interaccion');
const script = require('./server/models/script');
var convert = require('xml-js');
var Compare = require('./utils/Compare');
var nodeutils = require('./utils/NodeUtils');
var respuesta = [];
var nodes = [];
var links = [];
var s = [];
var sactual;

index.get('/interaccion/unified', async function (req, res) {
	const temp = await interaccion.findById(req.query.id);
	var json = JSON.parse(temp.data);
	
	nodes = json.node;
	links = json.link;
	respuesta = [];
	
	let tempname = temp.nombre + '_expandida';
	
	await unify();
	
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

	await unify();

	var fnodes = nodeutils.FirstsNodes(links, nodes.slice());

	social.resetlog();
	await ProcessFlow(nodes, links, fnodes, 0);
	social.savelogs('');
});

var emotion = true;

index.get('/interaccion/qaa', async function (req, res) {
	social.ledsanimstop();
    if (req.query.id === 'ini') {
        res.status(200).json({ preguntas: preguntas.getPreguntas(), emotional: emotion});
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
		emotion = !emotion;
		social.setEmotional(emotion);
		res.status(200).json({ emotional: emotion });
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

async function ProcessFlow(nodes, links, fnodes, ini) {
	let aux = [fnodes[ini]];
	let n = true;
	do {
		if (aux.length == 1 || aux[0].type !== 'if') {
			if (aux[0].type === 'for') {
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
			} else if (aux[0].type === 'script'){
				if (s.length == 0) {
					s = (await script.findById(aux[0].sc).populate('data')).data;
					if (aux[0].random) {
						s = random.randomize(s);
					}
				}
				sactual = s.shift();
				await social.speak(sactual.campo1);
			} else if (aux[0].type === 'led'){
				let aux_t = nodeutils.NextNode(links, aux[0], nodes);
				if (aux_t[0].type === 'speak' || aux_t[0].type === 'sound') {
					aux_t[0].anim = aux[0].anim;
					aux[0] = aux_t[0];
				}
				await ProcessNode(aux[0]);
			} else {
				await ProcessNode(aux[0]);
			}
			aux = nodeutils.NextNode(links, aux[0], nodes);
		} else if (aux.length > 1) {
			aux.sort(function (a, b) { return a.text === b.text ? 0 : a.text < b.text ? 1 : -1; });
			for (let c = 0; c < aux.length; c++) {
				if (aux[c].text === '%') {
					if (Compare(sactual.campo2, respuesta[respuesta.length - 1]) > 1) {
						aux = nodeutils.NextNode(links, aux[c], nodes);
						break;
					}
				} else if (Compare((aux[c].text || ''), respuesta[respuesta.length - 1]) > 1) {
					aux = nodeutils.NextNode(links, aux[c], nodes);
					break;
				}
			}
		}
		n = aux.length > 0;
	} while (n);
}

async function ProcessNode(element) {
	if (element.type === 'emotion') {
		var e = element.elements;
		social.emotions(element.emotion, element.level, false, (element.speed || 2.0));
	} else if (element.type === 'speak') {
		social.templog(evaId, element.text);
		let t = element.text;
		if (t.includes('$')) {
			t = nodeutils.includeAnswers(t.split(' '), respuesta);
			await social.speak(t, element.anim, !element.anim);
		} else {
			try {
				if (!fs.existsSync('./temp/' + element.key + '.wav')) {
					await social.rec(t, element.key);
				}
				await social.play('./temp/' + element.key + '.wav', element.anim, !element.anim);
			} catch (err) {
				console.error(err)
			}
		}
	} else if (element.type === 'listen') {
		var r = await social.sendAudioGoogleSpeechtoText2();
		social.stopListening();
		respuesta.push(r);
		social.templog(usuarioId, r);
	} else if (element.type === 'wait') {
		await social.sleep(element.time);
	} else if (element.type === 'mov') {
		social.movement(element.mov);
	} else if (element.type === 'sound') {
		if (element.wait) {
			await social.play('./sonidos/' + element.src + '.wav', element.anim, !element.anim);
		} else {
			social.play('./sonidos/' + element.src + '.wav', element.anim, !element.anim);
		}
	} else if (element.type === 'led') {
		if (element.anim === 'stop') {
			social.ledsanimstop();
		} else {
			social.ledsanim(element.anim);
		}
	}
}

async function unify() {
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i].type === 'int') {
			if (nodes[i].int.length > 1) {
				let sub = await interaccion.findById(nodes[i].int);
				let j = JSON.parse(sub.data);
				let jn = j.node;
				let jl = j.link;
				let aux = nodeutils.FirstAndLast(jn.slice(), jl.slice());
				for (let j = 0; j < links.length; j++) {
					if (links[j].to === nodes[i].key) {
						links[j].to = aux.ini[0].key;
						for (let k = 1; k < aux.ini.length; k++) {
							links.push({ from: links[j].from, to: aux.ini[k].key });
						}
					} else if (links[j].from === nodes[i].key) {
						links[j].from = aux.end[0].key;
						for (let l = 1; l < aux.end.length; l++) {
							links.push({ from: aux.end[l].key, to: links[j].to });
						}
					}
				}
				nodes.splice(i, 1);
				i = -1;
				nodes = nodes.concat(jn);
				links = links.concat(jl);
			}
		}
	}
}