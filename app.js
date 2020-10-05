var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./server/routes/index');

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
app.use('/api/script', require('./server/routes/script.routes.js'));
app.use('/api/audio', require('./server/routes/audio.routes.js'));
app.use('/api/filters', require('./server/routes/listeningfilters.routes.js'));
app.use('/api/interaccion', require('./server/routes/interaccion.routes.js'));
app.use('/api/common', require('./server/routes/common.routes.js'));

// Para usar mongodb
// const { mongoose } = require('./server/database');
// Para usar lowdb
const { createConnection } = require('./server/database');
createConnection();

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

const interaccion = require('./server/controllers/interaccion.controller');
const unify = require('./vpl/Unify_Node');
const process = require('./vpl/VPL_Process');


var social = new SocialRobot(credentials.config, credentials.credentials);
module.exports.social = social;

index.get('/speak', async function (req, res) {
	await social.speak(req.query.speak);
	res.status(200).jsonp();
});

index.get('/interaccion/iniciarInteraccion1', async function (req, res) {
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
	//exit
	if (req.query.e == 9) {
		social.emotions('exit', 0);
	}
	console.log(req.query.e);
	res.status(200).jsonp();
});

var respuesta = [];
var s = {};
var sactual;
var lemotion = [];
var counter = {};
var apidata = {};

function setRespuesta(value) {
	respuesta.push(value);
}

function getRespuesta(last = false) {
	return last ? respuesta[respuesta.length - 1] : respuesta;
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

function setApi(key, value) {
	apidata[key] = value;
}

function getApi(key) {
	return apidata[key];
}

function setScript(value) {
	s = value;
}

function getScript() {
	return s;
}

module.exports.setRespuesta = setRespuesta;
module.exports.getRespuesta = getRespuesta;
module.exports.setSactual = setSactual;
module.exports.getSactual = getSactual;
module.exports.addlemotion = addlemotion;
module.exports.getlemotion = getlemotion;
module.exports.setCounter = setCounter;
module.exports.getCounter = getCounter;
module.exports.setApi = setApi;
module.exports.getApi = getApi;
module.exports.setScript = setScript;
module.exports.getScript = getScript;

index.get('/interaccion/unified', async function (req, res) {
	const temp = await interaccion.getThis(req.query.id);
    let obj = await unify.unifyByInt(temp);
	await interaccion.createThis(temp.nombre + '_expandida', obj);
	res.status(200).jsonp();
});

index.get('/interaccion/audio', async function (req, res) {
	res.status(200).jsonp();
	console.log('./sonidos/' + req.query.id + '.wav');
	await social.play('./sonidos/' + req.query.id + '.wav');
});

index.get('/interaccion/iniciarInteracciong', async function (req, res) {
	res.status(200).jsonp();
	
	respuesta = [];
	counter = {};

	let obj = await unify.unifyById(req.query.id);
	var fnodes = nodeutils.FirstsNodes(obj.link, obj.node.slice());

	social.resetlog();
	await process.ProcessFlow(social, evaId, usuarioId, obj.node, obj.link, fnodes, 0);
	social.setVoice('es-LA_SofiaV3Voice');
	social.savelogs('');
});
