var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

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
app.use('/users', require('./routes/users'));
app.get('/interaccion', function(req, res) {
	res.render('interaccion');
  });
app.use('/api/interaccion', require('./server/routes/interaccion.routes.js'));

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

/* Codigo de Robot +/
 *
 * */

var apiai = require('apiai');
var appai = apiai("8921709f76374a34a31a1fa46d55799b");
var optionsAPI = {
	sessionId: '5bd69057-bd3b-471e-96c4-1bb61df59528'//'<unique session id>'
};

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

var generarNumeroRandom = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var fs = require('fs');
var util = require('util');

var PlayMusic = require('playmusic');

function randomIntInc(low, high) {
	return Math.floor(Math.random() * (high - low + 1) + low)
}

var kill = require('tree-kill');

var SocialRobot = require('./social_robot');
var credentials = require('./config-services');
var social = new SocialRobot(credentials.config, credentials.credentials);

var exp1 = require('./interacciones/exp1');
var exp2 = require('./interacciones/exp2');
var exp3 = require('./interacciones/exp3');

index.get('/interaccion/iniciarInteraccion1', function (req, res) {
	console.log('interaccion/iniciarInteraccion1');
	social.resetlog();
	exp3.QaA(social, evaId, usuarioId);
	res.status(200).jsonp();
});

index.get('/interaccion/iniciarInteraccion2', function (req, res) {
	console.log('interaccion/iniciarInteraccion2');
	social.resetlog();
	exp2.autopilot(social, evaId, usuarioId);
	res.status(200).jsonp();
});

var logs = require('./log');
index.get('/interaccion/iniciarInteraccion3', function (req, res) {
	const text2wav = require('text2wav');
	let out = text2wav('hola');
});

index.get('/interaccion/iniciarInteraccion4', function (req, res) {
	social.resetlog();
	social.setEmotional(false);
	exp1.Ultimatum(social, evaId, usuarioId);
	res.status(200).jsonp();
});

index.get('/interaccion/iniciarInteraccion5', function (req, res) {
	social.resetlog();
	social.setEmotional(true);
	exp1.Ultimatum(social, evaId, usuarioId);
	res.status(200).jsonp();
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
var convert = require('xml-js');
var Compare = require('./utils/Compare');
var respuesta = [];

index.get('/interaccion/iniciarInteracciong', async function (req, res) {
	const temp = await interaccion.findById(req.query.id);
	//var json = convert.xml2js(temp.xml, {compact: false});

	var json = JSON.parse(temp.data);

	var nodes = json.node;
	var links = json.link;
	respuesta = [];

	// console.log(nodes);
	// console.log(links);
	fnodes = FirstsNodes(links, nodes.slice());
	// console.log(fnodes);
	// console.log('Y le sigue');
	// console.log(NextNode(links, fnodes[0], nodes)[0]);

	social.resetlog();	
	await ProcessFlow(nodes, links, fnodes, 0);
	social.savelogs('');

	res.status(200).jsonp();
});

async function ProcessFlow(nodes, links, fnodes, ini) {
	let aux = [fnodes[ini]];
	let n = true;
	do {
		if (aux.length == 1 || aux[0].type !== 'if') {
			if (aux[0].type === 'for') {
				for (let f = 0; f < aux[0].iteraciones; f++) {					
					await ProcessFlow(nodes, links, fnodes, FirstsOfGroup(fnodes, aux[0].key));
				}
			} else {
				await ProcessNode(aux[0]);
			}	
			aux = NextNode(links, aux[0], nodes);
		} else if (aux.length > 1) {
			aux.sort(function (a, b) { return a.text === b.text ? 0 : a.text < b.text ? 1 : -1; });
			for (let c = 0; c < aux.length; c++) {
				if (Compare((aux[c].text || ''), respuesta[respuesta.length - 1]) > 1) {
					aux = NextNode(links, aux[c], nodes);
					break;
				}
			}
		}
		n = aux.length > 0;
	} while (n);
}

async function ProcessNode(element) {
	if(element.type === 'emotion'){
		var e = element.elements;
		social.emotions(element.emotion, element.level, false, (element.speed || 2.0));
	} else if (element.type === 'speak') {
		social.templog(evaId, element.text);
		let t = element.text;
		if (t.includes('$')) {
			t = includeAnswers(t.split(' '));
		}
		await social.speak(t);
	} else if (element.type === 'listen') {
		var r = await social.sendAudioGoogleSpeechtoText2();
		social.stopListening();
		respuesta.push(r);
		social.templog(usuarioId, r);
	} else if (element.type === 'wait') {
		await social.sleep(element.time);
	}
}

function FirstsNodes(link, fnodes) {
	for (let i = 0; i < fnodes.length; i++) {
		for (const iterator of link) {
			if (fnodes[i].key == iterator.to) {
				fnodes.splice(i,1);
				i--;
				break;
			}
		}
	}
	if (fnodes.length > 1) {
		for (let j = 0; j < fnodes.length; j++) {
			if (!fnodes[j].group) {
				fnodes.unshift(fnodes.splice(j,1)[0]);
				break;
			}		
		}
	}
	return fnodes;
}

function FirstsOfGroup(fnodes, key) {
	for (let i = 0; i < fnodes.length; i++) {
		if (fnodes[i].group == key) {
			return i;
		}
	}
}

function NextNode(link, node, nodes) {
	let n = [];
	for (let i = 0; i < link.length; i++) {
		if (link[i].from == node.key) {
			for (let j = 0; j < nodes.length; j++) {
				if (link[i].to == nodes[j].key) {
					n.push(nodes[j]);
				}
			}
		}
	}
	return n;
}

function includeAnswers(value) {
	for (let i = 0; i < value.length; i++){
		if(/\$[\d]+/.test(value[i])){
		  value[i] = respuesta[parseInt(value[i].substring(1)) - 1];
	  } else if (value[i] === '$'){
		  value[i] = respuesta[respuesta.length - 1];
	  }
	}
	return value.join(" ");
  }