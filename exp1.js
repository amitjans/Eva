var SocialRobot = require('./social_robot');
var credentials = require('./config-services');
var send = require('./app');
var gn = require('./getname');

function procesar(texto) {
	return texto;
}

module.exports = {
	Ultimatum: async function (evaId, usuarioId) {
		var social = new SocialRobot(credentials.config, credentials.credentials);
		send.enviarMensaje(evaId, 'Hola');
		var obj = await social.play('./exp1files/hola.wav');
		var respuesta = await social.sendAudioGoogleSpeechtoText2(procesar);
		social.stopListening();
		var nombre = gn.ProcesarNombre(respuesta);
		send.enviarMensaje(usuarioId, respuesta + ' - ' + nombre);
		var obj = await social.speak('Mucho gusto en conocerte ' + nombre);
		send.enviarMensaje(evaId, 'Explicación');
		var obj = await social.play('./exp1files/explicacion.wav');
		//Juego Ultimátum
		var puntos = 0;
		var iteraciones = 4;
		var resp = '';
		var respanterior = '';
		for (let i = 0; i < iteraciones; i++) {
			social.emotions('ini', 0);
			if (i == 0) {
				send.enviarMensaje(evaId, 'Comenzar Ofertas');
				var obj = await social.play('./exp1files/comenzarofertas.wav');
			} else if (i == (iteraciones - 1)) {
				send.enviarMensaje(evaId, 'Ultima oferta');
				var obj = await social.play('./exp1files/ultimaoportunidad.wav');
			} else {
				send.enviarMensaje(evaId, 'Siguiente oferta');
				var obj = await social.play('./exp1files/' + NextOffer() + '.wav');
			}
			var temp = 0;
			var oferta = await social.sendAudioGoogleSpeechtoText2(procesar);
			social.stopListening();
			send.enviarMensaje(usuarioId, oferta);
			var respuesta = oferta.split(" ");
			var re = /[\d]+/;
			var first = true;
			for (let k = 0; k < respuesta.length; k++) {
				if (re.test(respuesta[k])) {
					temp = parseInt(respuesta[k]);
					if (first) {
						first = false;
						if (AnalizarOferta(respuesta, k)) {
							k = respuesta.length;
						}
					}
				}
			}

			var index = generarNumeroRandom(0, 100);
			if (temp <= 10) {
				resp = 'noacepto';
				social.emotions('anger', resp === respanterior ? 1 : 0);
				respanterior = resp;
			} else if (temp >= 50) {
				resp = 'aceptooferta';
				social.emotions('joy', resp === respanterior ? 1 : 0);
				respanterior = resp;
			} else if (temp == 30) {
				if (index > 50) {
					resp = 'aceptooferta';
				} else {
					resp = 'noacepto';
					social.emotions('sad', resp === respanterior ? 1 : 0);
				}
				respanterior = resp;
			} else if (temp == 40) {
				if (index > 25) {
					resp = 'aceptooferta';
				} else {
					resp = 'noacepto';
					social.emotions('sad', resp === respanterior ? 1 : 0);
				}
				respanterior = resp;
			} else if (temp == 20) {
				if (index > 75) {
					resp = 'aceptooferta';
				} else {
					resp = 'noacepto';
					social.emotions('anger', resp === respanterior ? 1 : 0);
				}
				respanterior = resp;
			}
			console.log('Esperando');
			await social.sleepanim(5500);
			if (resp === 'aceptooferta') {
				puntos += 100 - temp;
			}
			var obj = await social.play('./exp1files/' + resp + '.wav');
			send.enviarMensaje(evaId, resp + '. Llevas hasta ahora un total de ' + puntos + ' puntos');
			var obj = await social.speak('Llevas hasta ahora un total de ' + puntos + ' puntos');
		}
		social.emotions('ini', 0);
		send.enviarMensaje('Resumen - Total de puntos: ' + puntos + ' puntos');
		var obj = await social.rec(' ' + puntos + ', puntos.', 'puntos');
		var obj = await social.play('./exp1files/despedida.1.wav');
		var obj = await social.play('./temp/puntos.wav');
		var obj = await social.play('./exp1files/despedida.2.wav');
		var obj = await social.play('./exp1files/despedida.3.wav');
		send.enviarMensaje(evaId, 'Bueno, finalmente obtuviste un total de ' + puntos + ', puntos. Ahora me despido por el momento, espero volver a verte pronto ' + nombre + '. Que tengas un bonito día.');
		console.log('Terminó la sesion.');
	}
};

function AnalizarOferta(respuesta, k) {
	for (let l = 0; l < k; l++) {
		if (respuesta[l] == 'yo' || respuesta[l] == 'me') {
			return false;
		}
	}
	return true;
}

var generarNumeroRandom = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function NextOffer() {
	//var array = ['La siguiente por favor', 'La próxima oferta', 'Vamos a por la siguiente oferta ' + nombres[0]];
	var array = ['next1', 'next2', 'next3'];
	return array[generarNumeroRandom(0, array.length - 1)];
}

