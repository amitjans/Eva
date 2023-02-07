const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const mqtt = require('mqtt');
const { write } = require('./server/controllers/cloud.controller.js');
const dotenv = require('dotenv').config();
const client = mqtt.connect('mqtt://' + (process.env.MQTT_SERVER || 'broker.hivemq.com'));
const { v4 } = require('uuid');
const id = process.env.MQTT_ID || v4();

var app = express();

// view engine setup
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Para usar lowdb
const { createConnection } = require('./server/database');
createConnection();

// routes
app.use('/', require('./server/routes/index'));
app.use('/api/script', require('./server/routes/script.routes.js'));
app.use('/api/audio', require('./server/routes/audio.routes.js'));
app.use('/api/mov', require('./server/routes/mov.routes.js'));
app.use('/api/filters', require('./server/routes/listeningfilters.routes.js'));
app.use('/api/interaccion', require('./server/routes/interaccion.routes.js'));
app.use('/api/cloud', require('./server/routes/cloud.routes.js'));
app.use('/api/config', require('./server/routes/config.routes.js'));
app.use('/api/images', require('./server/routes/images.routes.js'));
app.use('/api/common', require('./server/routes/common.routes.js'));
app.use('/dev', require('./server/routes/dev.routes.js'));

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

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'));
const io = require('socket.io')(server);
io.on('connection', (socket) => {
	global.socket = socket;
	console.log('Client connected');
});

module.exports = app;

var indiceScript1 = 1;

var enviarMensaje = function (autor, msg, media) {
	var data = autor;
	data.mensaje = indiceScript1 + ": " + msg;
	data.fecha = Date.now();
	if (media)
		data.media = media;
	socketio(data);
};

var socketio = function (params, id = 'messages') {
	io.sockets.emit(id, params);
}

module.exports.enviarMensaje = enviarMensaje;
module.exports.socketio = socketio;

var enviarError = function (error, query) {
	var data = { error: error, query: query };
	console.log(data);
	io.sockets.emit('messages', data);
}

var SocialRobot = require('./social_robot');
var social = new SocialRobot();

global.social = social;
global.usuarioId = { autor: 'Usuario', class: 'text-muted' };
global.evaId = { autor: 'Robot Eva', class: 'text-danger' };

console.log('Identificador utilizado: ' + id);

client.on('connect', function () {
	client.subscribe(`eva/${id}`, function (err) {
		if (!err) {
			client.publish('eva/server', JSON.stringify({ status: "Up", id: id }));
			console.log('Mensaje publicado');
		} else {
			console.log(err);
		}
	})
})

client.on('message', function (topic, message) {
	// message is Buffer
	let json = JSON.parse(message.toString());
	//client.end()
})

client.publish('eva/' + id, JSON.stringify({ type: "status" }));

if (!process.env.MQTT_SERVER || !process.env.MQTT_ID) {
	process.env.MQTT_SERVER = process.env.MQTT_SERVER || 'broker.hivemq.com';
	process.env.MQTT_ID = process.env.MQTT_ID || id;
	write();
}