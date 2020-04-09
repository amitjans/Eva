var random = require('../utils/Random');

var respanterior = { anterior: 'z', emocion: 'ini', nivel: 0 };

module.exports = {
	Ultimatum: async function (social, evaId, usuarioId, nombre) {
		social.templog(evaId, 'Explicación');
		var obj = await social.play('./interacciones/exp1files/explicacion.wav');
		//Juego Ultimátum
		var puntos = 0;
		var puntoseva = 0;
		var iteraciones = 10;
		var resp = '';
		respanterior = { anterior: 'z', emocion: 'ini', nivel: 0 };
		social.emotions('ini', 0);
		for (let i = 0; i < iteraciones; i++) {
			if (i == 0) {
				social.templog(evaId, 'Comenzar Ofertas');
				var obj = await social.play('./interacciones/exp1files/comenzarofertas.wav');
			} else if (i == (iteraciones - 1)) {
				social.templog(evaId, 'Ultima oferta');
				var obj = await social.play('./interacciones/exp1files/ultimaoportunidad.wav');
			} else if (i == 5) {
				social.templog(evaId, 'Van 5');
				var obj = await social.play('./interacciones/exp1files/quintaoferta.wav');
			} else if (i == (iteraciones - 3)) {
				social.templog(evaId, 'Faltan 3');
				var obj = await social.play('./interacciones/exp1files/tresofertas.wav');
			} else {
				social.templog(evaId, 'Siguiente oferta');
				var obj = await social.play('./interacciones/exp1files/' + NextOffer() + '.wav');
			}
			var temp = -1;
			do {
				var oferta = await social.sendAudioGoogleSpeechtoText2();
				social.stopListening();
				social.templog(usuarioId, oferta);
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
				if (temp == -1) {
					var obj = await social.play('./interacciones/exp1files/repetir.wav');
				} else if (temp > 10) {
					var obj = await social.play('./interacciones/exp1files/limite.wav');
				}
			} while (temp > 10 || temp == -1);

			resp = decision(social, temp);

			console.log('Esperando');
			await social.sleep(5500);
			if (resp.includes('aceptooferta')) {
				puntos += 10 - temp;
				puntoseva += temp;
			}
			var obj = await social.play('./interacciones/exp1files/' + resp + '.wav');
			social.templog(evaId, resp + '. Llevas hasta ahora un total de ' + puntos + ' pesos y yo llevo ' + puntoseva);
			social.emotions('ini', 0);
			await social.sleep(500);
			if (i < (iteraciones - 1)) {
				var obj = await social.speak('Llevas hasta ahora un total de ' + puntos + ' pesos y yo llevo ' + puntoseva);
			}
		}
		social.emotions('ini', 0);
		social.templog(evaId, 'Resumen - Total de puntos: ' + puntos + ' puntos y Eva ' + puntoseva);
		var obj = await social.rec(' ' + puntos + ' pesos. Y yo obtuve un total de ' + puntoseva + ' pesos.', 'puntos');
		var obj = await social.play('./interacciones/exp1files/despedida.1.wav');
		var obj = await social.play('./temp/puntos.wav');
	}, Despedida: async function (social) {
		await social.play('./interacciones/exp1files/despedida.1.1.wav');
		await social.play('./interacciones/exp1files/despedida.2.wav');
		await social.play('./interacciones/exp1files/despedida.3.wav');
		console.log('Terminó la sesion.');
	}
};

function decision(social, temp) {
	var index = random.generarNumeroRandom(0, 100);
	var resp = '';
	if (temp <= 2) {
		if (index > 75 && temp > 10) {
			resp = 'aceptooferta';
			if (respanterior.emocion === 'joy') {
				resp = 'b' + resp;
				setEmocion(social, 'sad', 0, resp, 0.5);
			} else if (respanterior.emocion === 'sad') {
				var temp = (random.generarNumeroRandom(0, 100) > 50 ? 'anger' : 'sad');
				setEmocion(social, temp, (temp === 'sad' ? 1 : 0), resp, 0.5);
			} else {
				setEmocion(social, 'anger', (respanterior.emocion === 'anger' ? 1 : 0), resp, 0.5);
			}
		} else {
			resp = 'noacepto';
			setEmocion(social, 'anger', (respanterior.emocion === 'anger' ? 1 : 0), resp, 0.5);
		}
	} else if (temp >= 5) {
		resp = 'aceptooferta';
		setEmocion(social, 'joy', ('joy' === respanterior.emocion ? 1 : 0), resp, 0.5);
	} else if (temp == 3) {
		if (index > 50) {
			resp = ((respanterior.emocion !== 'sad') ? 'baceptooferta' : 'aceptooferta');
			setEmocion(social, 'sad', ('sad' === respanterior.emocion ? 1 : 0), resp, 0.5);
		} else {
			resp = 'noacepto';
			if (respanterior.emocion === 'sad' && respanterior.nivel == 1) {
				var temp = (random.generarNumeroRandom(0, 100) > 50 ? 'anger' : 'sad');
				setEmocion(social, temp, (temp === 'sad' ? 2 : 1), resp, 0.5);
			} else if (respanterior.emocion === 'anger') {
				setEmocion(social, 'sad', 1, resp, 0.5);
			} else {
				setEmocion(social, 'sad', (resp.includes(respanterior.anterior) ? 1 : 0), resp, 0.5);
			}
		}
	} else if (temp == 4) {
		if (index > 25) {
			resp = 'aceptooferta';
			setEmocion(social, 'ini', 0, resp, 0.5);
		} else {
			resp = 'noacepto';
			setEmocion(social, 'sad', (resp === respanterior.anterior ? 1 : 0), resp, 0.5);
		}
	}
	return resp;
}

function setEmocion(social, emocion, nivel, resp, speed) {
	social.emotions(emocion, nivel, true, speed);
	respanterior.anterior = (resp.includes('aceptooferta') ? 'aceptooferta' : 'noacepto');
	respanterior.emocion = emocion;
	respanterior.nivel = nivel;
}

function AnalizarOferta(respuesta, k) {
	for (let l = 0; l < k; l++) {
		if (respuesta[l] == 'yo' || respuesta[l] == 'me') {
			return false;
		}
	}
	return true;
}

function NextOffer() {
	//var array = ['La siguiente por favor', 'La próxima oferta', 'Vamos a por la siguiente oferta ' + nombres[0]];
	var array = ['next1', 'next2'];
	return array[random.generarNumeroRandom(0, array.length - 1)];
}