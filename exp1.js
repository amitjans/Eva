var SocialRobot = require('./social_robot');
var credentials = require('./config-services');
var send = require('./app');
var gn = require('./getname');

var joy = { anim: 'joy', bcolor: '', speed: 2.0 };
var sad = { anim: 'sad', bcolor: '', speed: 2.0 };
var anger = { anim: 'anger', bcolor: '', speed: 2.0 };
var ini = { anim: 'ini', bcolor: '', speed: 2.0 };

function procesar(texto) {
	return texto;
}

module.exports = {
	Ultimatum: async function (evaId, usuarioId) {
		var social = new SocialRobot(credentials.config, credentials.credentials);
		send.enviarMensaje(evaId, 'Hola');
		var obj = await social.play('./exp1files/hola.wav');
		social.movement('n');
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
		for (let i = 0; i < iteraciones; i++) {
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
			var dowhile = false;
			var temp = 0;
			var respuesta = '';
			var second = false;
			do {
				if (dowhile) {
					var obj = await social.play('./exp1files/nuevaoferta.wav');
				}
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
					send.eyes(anger);
					if (respuesta === 'noacepto'){
						second = true;
						social.movement('r');
					}
					respuesta = 'noacepto';
				} else if (temp >= 50) {
					send.eyes(joy);
					respuesta = 'aceptooferta';
				} else if (temp == 30) {
					if (index > 50) {
						respuesta = 'aceptooferta';
					} else {
						send.eyes(sad);
						if (respuesta === 'noacepto'){
							second = true;
							social.movement('d');
						}
						respuesta = 'noacepto';
					}
				} else if (temp == 40) {
					if (index > 25) {
						respuesta = 'aceptooferta';
					} else {
						send.eyes(sad);
						if (respuesta === 'noacepto'){
							second = true;
							social.movement('d');
						}
						respuesta = 'noacepto';
					}
				} else if (temp == 20) {
					if (index > 75) {
						respuesta = 'aceptooferta';
					} else {
						send.eyes(anger);
						if (respuesta === 'noacepto'){
							second = true;
							social.movement('r');
						}
						respuesta = 'noacepto';
					}
				}
				console.log('Esperando');
				await social.sleep(5500);
				send.eyes(ini);
				if (second) {
					social.movement('c');
					second = false;					
				}
				var obj = await social.play('./exp1files/ofertas/' + temp + '.wav');
				send.enviarMensaje(evaId, '¿Es definitiva?');
				var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
				social.stopListening();
				send.enviarMensaje(usuarioId, respuestaParticipante);
				dowhile = respuestaParticipante.includes("cambio") || respuestaParticipante.includes("cambiar") || respuestaParticipante.includes("no") || respuestaParticipante.includes("negativo");
				if (respuesta === 'aceptooferta' && !dowhile) {
					puntos += (i == 0 || i == 1) ? 0 : 100 - temp;
				}
			} while (dowhile);
			if (i < (iteraciones - 1) && i > 1) {
				var obj = await social.play('./exp1files/' + respuesta + '.wav');
				send.enviarMensaje(evaId, respuesta + '. Llevas hasta ahora un total de ' + puntos + ' puntos');
				var obj = await social.speak('Llevas hasta ahora un total de ' + puntos + ' puntos');
			} else {
				var obj = await social.play('./exp1files/' + respuesta + '.wav');
			}
		}
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

