import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mqtt from 'mqtt';
import { write } from './server/controllers/cloud.controller.js';
import * as dotenv from 'dotenv'
import { v4 } from 'uuid'
import { Server } from "socket.io";

dotenv.config()
const client  = mqtt.connect('mqtt://' + (process.env.MQTT_SERVER || 'broker.hivemq.com'));

const id  = process.env.MQTT_ID || v4();

var app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

// view engine setup
app.use(cors());
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

// Para usar lowdb
import { createConnection } from './server/database.js';
createConnection();

// routes
import indexRouter from './server/routes/index.js';
import scriptRouter from './server/routes/script.routes.js';
import audioRouter from './server/routes/audio.routes.js';
import movRouter from './server/routes/mov.routes.js';
import filtersRouter from './server/routes/listeningfilters.routes.js';
import ledsRouter from './server/routes/leds.routes.js';
import interaccionRouter from './server/routes/interaccion.routes.js';
import cloudRouter from './server/routes/cloud.routes.js';
import configRouter from './server/routes/config.routes.js';
import imagesRouter from './server/routes/images.routes.js';
import commonRouter from './server/routes/common.routes.js';
import devRouter from './server/routes/dev.routes.js';

import SocialRobot from './social_robot.cjs';

app.use('/', indexRouter);
app.use('/api/script', scriptRouter);
app.use('/api/audio', audioRouter);
app.use('/api/mov', movRouter);
app.use('/api/filters', filtersRouter);
app.use('/api/leds', ledsRouter);
app.use('/api/interaccion', interaccionRouter);
app.use('/api/cloud', cloudRouter);
app.use('/api/config', configRouter);
app.use('/api/images', imagesRouter);
app.use('/api/common', commonRouter);
app.use('/dev', devRouter);

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

const io = new Server(server);
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
	var data = {error: error, query: query};
	console.log(data);
	io.sockets.emit('messages', data);
}

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