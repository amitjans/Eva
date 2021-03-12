var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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

app.use('/', require('./server/routes/index'));
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

app.set('port', '3000');
const server = app.listen(app.get('port'));
var io = require('socket.io')(server);

module.exports = app;

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
	var data = {error: error, query: query};
	console.log(data);
	io.sockets.emit('messages', data);
}

var SocialRobot = require('./social_robot');
var social = new SocialRobot();

global.social = social;

var respuesta = [];
var s = {};
var sactual;
var lemotion = [];
var counter = {};
var apidata = {};

module.exports.setRespuesta = function (value) { respuesta.push(value); }
module.exports.getRespuesta = function (last = false) { return last ? respuesta[respuesta.length - 1] : respuesta; }
module.exports.setSactual = function (value) { sactual = value; };
module.exports.getSactual = function () { return sactual; };
module.exports.addlemotion = function (value) { lemotion.push(value); };
module.exports.getlemotion = function () { return lemotion; };
module.exports.setCounter = function (value) { counter = value; };
module.exports.getCounter = function () { return counter; };
module.exports.setApi = function (key, value) { apidata[key] = value; };
module.exports.getApi = function (key) { return apidata[key]; };
module.exports.setScript = function (value) { s = value };
module.exports.getScript = function () { return s };
