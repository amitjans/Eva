var Compare = require('../utils/Compare');
var PhoneticSpanish = require('../utils/PhoneticSpanish');
var preguntas = require('./exp3qaa');
var random = require('../utils/Random');

module.exports = {
    QaA: async function (social, evaId, usuarioId) {
        var pregunta = preguntas.getPreguntas();
        var dificiles = preguntas.getDificiles();
        var last = [];

        social.emotions('ini', 0);
        social.templog(evaId, 'Explicación');
        var obj = await social.play('./interacciones/exp3files/explicacion2.wav');
        
        var correctas = 0;
        var total = 0;

        var obj = await social.play('./interacciones/exp3files/ejemplo1.wav');
        var q = pregunta.shift();
        social.templog(evaId, 'Ejemplo: Pregunta: ' + q.pregunta + ' <-> Respuesta: ' + q.respuesta);
        await social.play(q.audio);
        var obj = await social.play('./interacciones/exp3files/ejemplo2.wav');
        var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2();
        social.stopListening();
        if (respuestaParticipante.includes('no')) {
            social.emotions('sad', 0);
            var obj = await social.play(q.respaudio);
        } else if (Compare(respuestaParticipante, q.respuesta) > 0) {
            await Respuesta(social, evaId, q, 2, 0);
        } else {
            await Respuesta(social, evaId, q, -1, 0);
        }
        social.emotions('ini', 0);
        var obj = await social.play('./interacciones/exp3files/ini.wav');

        for (let j = 0; j < 8; j++) {
            var q = j < 4 ? dificiles.shift() : pregunta.shift();
            do {
                social.templog(evaId, 'Pregunta: ' + q.pregunta + ' <-> Respuesta: ' + q.respuesta);
                var obj = await social.play(q.audio);
                respuestaParticipante = await social.sendAudioGoogleSpeechtoText2();
                social.stopListening();
            } while (/(repite|repetir)/.test(respuestaParticipante));
            social.templog(usuarioId, respuestaParticipante + ' --- ' + q.respuesta);
            social.templog(usuarioId, PhoneticSpanish(respuestaParticipante) + ' --- ' + PhoneticSpanish(q.respuesta));
            if (respuestaParticipante.includes('no')) {
                last.push('sad');
                social.emotions('sad', (last.length == 1 ? 0 : last[last.length - 1] == last[last.length - 2] ? 1 : 0));
                var obj = await social.play(q.respaudio);
            } else if (Compare(respuestaParticipante, q.respuesta) > 0) {
                correctas++;
                last.push('joy');
                await Respuesta(social, evaId, q, 2, (last.length == 1 ? 0 : last[last.length - 1] == last[last.length - 2] ? 1 : 0));
            } else {
                last.push('sad');
                await Respuesta(social, evaId, q, -1, (last.length == 1 ? 0 : last[last.length - 1] == last[last.length - 2] ? 1 : 0));
            }
            social.emotions('ini', 0);

            if (j == 3 || j == 7) {
                await Resumen(social, correctas);
                if (j == 3) {
                    await social.play('./interacciones/exp3files/otra1.wav');
                }
                total += correctas;
                correctas = 0;
            }
        }
        social.templog(usuarioId, 'Preguntas totales: 8, Respuestas correctas: ' + total);
        await social.rec(total + '', 'total');
        await social.play('./interacciones/exp3files/finalmente.wav');
        await social.play('./temp/total.wav');
        await social.play('./interacciones/exp3files/total.wav');
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

async function Respuesta(social, evaId, pregunta, expression, level) {
    switch (expression) {
        case 2:
            social.emotions('joy', level);
            social.templog(evaId, 'Correcta');
            var obj = await social.play(RespuestaCorrecta());
            social.emotions('ini', 0);
            break;
        case 1:
            social.emotions('sad', level);
            social.templog(evaId, 'Incompleta');
            var obj = await social.play('./interacciones/exp3files/incompleta.wav');
            var obj = await social.play(pregunta.respaudio);
            social.emotions('ini', 0);
            break;
        case 0:
            social.emotions('sad', level);
            social.templog(evaId, 'Parcialmente Correcta');
            var obj = await social.play('./interacciones/exp3files/parcialmentecorrecta.wav');
            var obj = await social.play(pregunta.respaudio);
            social.emotions('ini', 0);
            break;
        default:
            social.emotions('sad', level);
            social.templog(evaId, 'Incorrecta');
            var obj = await social.play(RespuestaIncorrecta());
            var obj = await social.play(pregunta.respaudio);
            social.emotions('ini', 0);
    }
}

async function Resumen(social, correctas) {
    if (correctas == 4) {
        social.emotions('joy', 1);
        var obj = await social.play('./interacciones/exp3files/resumen1.wav');
    } else if (correctas == 3) {
        social.emotions('joy', 1);
        var obj = await social.play('./interacciones/exp3files/resumen1.wav');
    } else if (correctas == 2) {
        social.emotions('sad', 2);
        var obj = await social.play('./interacciones/exp3files/resumen3.wav');
    } else {
        social.emotions('sad', 2);
        var obj = await social.play('./interacciones/exp3files/resumen4.wav');
    }
    social.emotions('ini', 0);
    await social.sleep(3000);
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