var SocialRobot = require('./social_robot');
var credentials = require('./config-services');
var send = require('./app');
var gn = require('./getname');
var PhoneticSpanish = require('./PhoneticSpanish');
var preguntas = require('./exp3qaa');

var joy = { anim: 'joy', bcolor: '', speed: 2.0 };
var sad = { anim: 'sad', bcolor: '', speed: 2.0 };
var anger = { anim: 'anger', bcolor: '', speed: 2.0 };
var ini = { anim: 'ini', bcolor: '', speed: 2.0 };

function procesar(texto) {
    return texto;
}

module.exports = {
    QaA: async function (evaId, usuarioId) {
        var social = new SocialRobot(credentials.config, credentials.credentials);
        var pregunta = preguntas.getPreguntas();       
        var nombre = await gn.getName(social, evaId, usuarioId);
        social.emotions('ini', 0);
        send.enviarMensaje(evaId, 'Explicación');
        var obj = await social.play('./exp3files/explicacion2.wav');
    
        var i = 0;
        var correctas = 0;
        var next = true;
        do {
    
            for (let j = i; j < i + 3; j++) {
                do {
                    var obj = await social.play(pregunta[j].audio);
                    respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
                    social.stopListening();
                } while (respuestaParticipante.includes('repite') || respuestaParticipante.includes('repetir'));
                send.enviarMensaje(usuarioId, respuestaParticipante + ' --- ' + pregunta[j].respuesta);
                send.enviarMensaje(usuarioId, PhoneticSpanish(respuestaParticipante) + ' --- ' + PhoneticSpanish(pregunta[j].respuesta));
                if (respuestaParticipante.includes('no')) {
                    var obj = await social.play(pregunta[j].respaudio);
                } else if (pregunta[j].analyze) {
                    var expression = Analyze(pregunta[j].respuesta, respuestaParticipante);
                    switch(expression) {
                        case 2:
                            social.emotions('joy', 0);
                            var obj = await social.play(RespuestaCorrecta());
                            social.emotions('ini', 0);
                            break;
                        case 1:
                            social.emotions('sad', 1);
                            var obj = await social.play('./exp3files/incompleta.wav');
                            var obj = await social.play(pregunta[j].respaudio);
                            social.emotions('ini', 0);
                            break;
                        case 0:
                            social.emotions('sad', 1);
                            var obj = await social.play('./exp3files/parcialmentecorrecta.wav');
                            var obj = await social.play(pregunta[j].respaudio);
                            social.emotions('ini', 0);

                            break;
                        default:
                            social.emotions('sad', 1);
                            var obj = await social.play(RespuestaIncorrecta());
                            var obj = await social.play(pregunta[j].respaudio);
                            social.emotions('ini', 0);
                      }
                } else if (respuestaParticipante.includes(pregunta[j].respuesta) || PhoneticSpanish(respuestaParticipante).includes(PhoneticSpanish(pregunta[j].respuesta))
                || pregunta[j].respuesta.includes(respuestaParticipante) || PhoneticSpanish(pregunta[j].respuesta).includes(PhoneticSpanish(respuestaParticipante))) {
                    send.eyes(joy);
                    console.log('Correcta');
                    send.enviarMensaje(evaId, 'Correcta');
                    correctas++;
                    var obj = await social.play(RespuestaCorrecta());
                } else {
                    send.eyes(sad);
                    console.log('Incorrecta');
                    send.enviarMensaje(evaId, 'Incorrecta');
                    var obj = await social.play(RespuestaIncorrecta());
                    var obj = await social.play(pregunta[j].respaudio);
                }
                send.eyes(ini);
            }
            i=i+3;
            if (correctas == 3) {
                social.emotions('joy', 1);
                var obj = await social.play('./exp3files/resumen1.wav');
            } else if (correctas == 2) {
                social.emotions('joy', 0);
                var obj = await social.play('./exp3files/resumen1.wav');
            } else if (correctas == 1) {
                social.emotions('sad', 1);
                var obj = await social.play('./exp3files/resumen3.wav');
            } else {
                social.emotions('sad', 1);
                var obj = await social.play('./exp3files/resumen4.wav');
            }
            social.emotions('ini', 0);
            correctas = 0;
            var obj = await social.play('./exp3files/otra.wav');
            var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
            social.stopListening();
            send.enviarMensaje(evaId, respuestaParticipante);
            if (respuestaParticipante.includes("no")) {
                social.emotions('sad', 1);
                next = false;
                var obj = await social.play('./exp3files/terminar.wav');
            } else {
                social.emotions('joy', 0);
                var obj = await social.play('./exp3files/otra1.wav');
            }
            social.emotions('ini', 1);
        } while (next);
    }
};

// function Leds(params) {
// 	ledsApp.kill();
// 	ledsApp = spawn('./leds/stop');
// 	ledsApp = spawn('./leds/' + params);
// }

// function LedStop() {
// 	ledsApp.kill();
// 	ledsApp = spawn('./leds/stop');
// }

function RespuestaCorrecta() {
	var array = ['./exp3files/correcta1.wav', './exp3files/correcta2.wav', './exp3files/correcta3.wav'];
	return array[generarNumeroRandom(0, array.length - 1)];
}

function RespuestaIncorrecta() {
	var array = ['./exp3files/incorrecta1.wav', './exp3files/incorrecta2.wav'];
	return array[generarNumeroRandom(0, array.length - 1)];
}

function Analyze(respuesta, participante) {
	var i = 0;
	var j = 0;
	respuesta.split(' ').forEach(element => {
		if (participante.includes(element) || PhoneticSpanish(participante).includes(element)) {
			i++;
		} else {
			j++;
		} 
	});
	if (j == 0 && i == respuesta.split(' ').length) {
		return 2;
	} else if (j == 0 && i < respuesta.split(' ').length) {
		return 1;
	} else if ( j > 0 && i > 0) {
		return 0;
	} else {
		return -1;
	}
}

var generarNumeroRandom = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}