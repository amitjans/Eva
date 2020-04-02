var gn = require('./getname');
var Compare = require('./Compare');
var PhoneticSpanish = require('./PhoneticSpanish');
var preguntas = require('./exp3qaa');
var p = require('./platica');

function procesar(texto) {
    return texto;
}

module.exports = {
    QaA: async function (social, evaId, usuarioId) {
        var pregunta = preguntas.getPreguntas();       
        var nombre = await gn.getName(social, evaId, usuarioId);
        //var aux = await p.inicial(social, evaId, usuarioId);
        social.emotions('ini', 0);
        social.templog(evaId, 'Explicación');
        var obj = await social.play('./exp3files/explicacion2.wav');
    
        var i = 0;
        var correctas = 0;
        var total = 0;
        var next = true;
        do {
    
            for (let j = i; j < i + 3; j++) {
                do {
                    social.templog(evaId, 'Pregunta: ' + pregunta[j].pregunta);
                    var obj = await social.play(pregunta[j].audio);
                    respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
                    social.stopListening();
                } while (respuestaParticipante.includes('repite') || respuestaParticipante.includes('repetir'));
                social.templog(usuarioId, respuestaParticipante + ' --- ' + pregunta[j].respuesta);
                social.templog(usuarioId, PhoneticSpanish(respuestaParticipante) + ' --- ' + PhoneticSpanish(pregunta[j].respuesta));
                if (respuestaParticipante.includes('no')) {
                    var obj = await social.play(pregunta[j].respaudio);
                } else if (pregunta[j].analyze) {
                    var expression = Analyze(pregunta[j].respuesta, respuestaParticipante);
                    await Respuesta(social, evaId, pregunta[j], expression);
                    if (expression > 0) {
                        correctas++;
                    }
                } else if (Compare(respuestaParticipante, pregunta[j].respuesta) > 0) {
                    await Respuesta(social, evaId, pregunta[j], 2);
                    correctas++;
                } else {
                    await Respuesta(social, evaId, pregunta[j], -1);
                }
                social.emotions('ini', 0);
            }
            i=i+3;
            if (correctas == 3) {
                social.emotions(( total == 6 ? 'surprise' : 'joy' ), 1);
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
            total += correctas;
            correctas = 0;
            var obj = await social.play('./exp3files/otra.wav');
            var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
            social.stopListening();
            social.templog(evaId, respuestaParticipante);
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
        social.savelogs(nombre);
    }
};

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

async function Respuesta(social, evaId, pregunta, expression) {
    switch(expression) {
        case 2:
            social.emotions('joy', 0);
            social.templog(evaId, 'Correcta');
            var obj = await social.play(RespuestaCorrecta());
            social.emotions('ini', 0);
            break;
        case 1:
            social.emotions('sad', 1);
            social.templog(evaId, 'Incompleta');
            var obj = await social.play('./exp3files/incompleta.wav');
            var obj = await social.play(pregunta.respaudio);
            social.emotions('ini', 0);
            break;
        case 0:
            social.emotions('sad', 1);
            social.templog(evaId, 'Parcialmente Correcta');
            var obj = await social.play('./exp3files/parcialmentecorrecta.wav');
            var obj = await social.play(pregunta.respaudio);
            social.emotions('ini', 0);
            break;
        default:
            social.emotions('sad', 1);
            social.templog(evaId, 'Incorrecta');
            var obj = await social.play(RespuestaIncorrecta());
            var obj = await social.play(pregunta.respaudio);
            social.emotions('ini', 0);
      }
}

var generarNumeroRandom = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}