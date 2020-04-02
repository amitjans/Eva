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

var exp1 = require('./exp1');
var exp2 = require('./exp2');
var exp3 = require('./exp3');

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
var respuesta = '';

index.get('/interaccion/iniciarInteracciong', async function (req, res) {
	const temp = await interaccion.findById(req.query.id);
	var json = convert.xml2js(temp.xml, {compact: false});
	console.log(json);

	for (element of json.elements) {
		if(element.name == 'emotion'){
			var e = element.elements;
			social.emotions(e[0].attributes.name, e[0].attributes.value, false, (e[0].attributes.speed || 2.0));
			if (e.length > 1) {
				await social.speak(e[1].attributes.texto);
			}
		} else if (element.name == 'listen') {
			respuesta = await social.sendAudioGoogleSpeechtoText2();
			console.log(respuesta);
		}
	}
	res.status(200).jsonp();
});
