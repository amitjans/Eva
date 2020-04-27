var Compare = require('../utils/Compare');
var PhoneticSpanish = require('../utils/PhoneticSpanish');
var preguntas = require('./exp3qaa');
var random = require('../utils/Random');

function procesar(texto) {
    return texto;
}

module.exports = {
    QaA: async function (social, evaId, usuarioId) {
        var pregunta = preguntas.getPreguntas();
        //var aux = await p.inicial(social, evaId, usuarioId);
        social.emotions('ini', 0);
        social.templog(evaId, 'Explicación');
        var obj = await social.play('./interacciones/exp3files/explicacion2.wav');
    
        var correctas = 0;
        var total = 0;
        var cpreguntas = pregunta.length;
        var next = true;
        do {
    
            for (let j = 0; j < 3; j++) {
                var q = pregunta.shift();
                do {
                    social.templog(evaId, 'Pregunta: ' + q.pregunta + ' <-> Respuesta: ' + q.respuesta);
                    var obj = await social.play(q.audio);
                    respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
                    social.stopListening();
                } while (/(repite|repetir)/.test(respuestaParticipante));
                social.templog(usuarioId, respuestaParticipante + ' --- ' + q.respuesta);
                social.templog(usuarioId, PhoneticSpanish(respuestaParticipante) + ' --- ' + PhoneticSpanish(q.respuesta));
                if (respuestaParticipante.includes('no')) {
                    var obj = await social.play(q.respaudio);
                } else if (q.analyze) {
                    var expression = Analyze(q.respuesta, respuestaParticipante);
                    if (expression > 0) {
                        correctas++;
                    }
                    await Respuesta(social, evaId, q, expression, correctas, j);
                } else if (Compare(respuestaParticipante, q.respuesta) > 0) {
                    correctas++;
                    await Respuesta(social, evaId, q, 2, correctas, j);
                } else {
                    await Respuesta(social, evaId, q, -1, correctas, j);
                }
                social.emotions('ini', 0);
            }
            await Resumen(social, correctas, total);
            total += correctas;
            correctas = 0;
            var obj = await social.play('./interacciones/exp3files/otra.wav');
            var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
            social.stopListening();
            social.templog(evaId, respuestaParticipante);
            next = await OtraRonda(social, respuestaParticipante);
        } while (next);
        social.templog(usuarioId, 'Preguntas totales: ' + (cpreguntas - pregunta.length) + ', Respuestas correctas: ' + total);
    }, Despedida: async function (social) {
		await social.play('./interacciones/exp3files/despedida.wav');
		console.log('Terminó la sesion.');
    }    
};

function RespuestaCorrecta() {
	return random.getOne(['./interacciones/exp3files/correcta1.wav', './interacciones/exp3files/correcta2.wav', './interacciones/exp3files/correcta3.wav']);
}

function RespuestaIncorrecta() {
	return random.getOne(['./interacciones/exp3files/incorrecta1.wav', './interacciones/exp3files/incorrecta2.wav']);
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

async function Respuesta(social, evaId, pregunta, expression, correctas, i) {
    switch(expression) {
        case 2:
            social.emotions('joy', correctas > 1 ? 1 : 0);
            social.templog(evaId, 'Correcta');
            var obj = await social.play(RespuestaCorrecta());
            social.emotions('ini', 0);
            break;
        case 1:
            social.emotions('sad', (i - correctas));
            social.templog(evaId, 'Incompleta');
            var obj = await social.play('./interacciones/exp3files/incompleta.wav');
            var obj = await social.play(pregunta.respaudio);
            social.emotions('ini', 0);
            break;
        case 0:
            social.emotions('sad', (i - correctas));
            social.templog(evaId, 'Parcialmente Correcta');
            var obj = await social.play('./interacciones/exp3files/parcialmentecorrecta.wav');
            var obj = await social.play(pregunta.respaudio);
            social.emotions('ini', 0);
            break;
        default:
            social.emotions('sad', (i - correctas));
            social.templog(evaId, 'Incorrecta');
            var obj = await social.play(RespuestaIncorrecta());
            var obj = await social.play(pregunta.respaudio);
            social.emotions('ini', 0);
      }
}

async function Resumen(social, correctas, total) {
    if (correctas == 3) {
        social.emotions(( total == 6 ? 'surprise' : 'joy' ), 1);
        var obj = await social.play('./interacciones/exp3files/resumen1.wav');
    } else if (correctas == 2) {
        social.emotions('joy', 0);
        var obj = await social.play('./interacciones/exp3files/resumen1.wav');
    } else if (correctas == 1) {
        social.emotions('sad', 1);
        var obj = await social.play('./interacciones/exp3files/resumen3.wav');
    } else {
        social.emotions('sad', 1);
        var obj = await social.play('./interacciones/exp3files/resumen4.wav');
    }
    social.emotions('ini', 0);
}

async function OtraRonda(social, respuestaParticipante) {
    let next = true;
    if (respuestaParticipante.includes("no")) {
        social.emotions('sad', 1);
        next = false;
        var obj = await social.play('./interacciones/exp3files/terminar.wav');
    } else {
        social.emotions('joy', 0);
        var obj = await social.play('./interacciones/exp3files/otra1.wav');
    }
    social.emotions('ini', 1);
    return next;
}

module.exports.RespuestaCorrecta = RespuestaCorrecta;
module.exports.RespuestaIncorrecta = RespuestaIncorrecta;
module.exports.Resumen = Resumen;
module.exports.OtraRonda = OtraRonda;
module.exports.Respuesta = Respuesta;