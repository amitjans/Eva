var random = require('../utils/Random');

let sad = 0;
let joy = 0;
var opta = ['salvar_mujeres', 'salvar_perro', 'ok', 'salvar_robot', 'salvar_anciano', 'ok', 'salvar_niño'];
var optb = ['ok', 'salvar_robot', 'salvar_robot2', 'ok', 'salvar_jovenes', 'salvar_robot2', 'salvar_robot3'];
var cases = [['hombre', 'mujer'], ['robot2', 'perro'], ['robot2', 'automovil'], ['planta', 'robot2'], ['joven', 'anciano'], ['robot2', 'ladron'], ['robot2', 'niño']];
var repetir = false;

module.exports = {
    autopilot: async function (social, evaId, usuarioId) {

        var obj = await social.play('./interacciones/exp2files/s0.wav');

        for (let i = 0; i < cases.length; i++) {
            await TellCase(social, evaId, i, repetir);
            repetir = false;
            var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2();
            social.stopListening();

            while (!/(1|2|uno|dos|primera|segunda|repite|repetir)/.test(respuestaParticipante)) {
                await social.play('./interacciones/exp2files/disculpa.wav');
                respuestaParticipante = await social.sendAudioGoogleSpeechtoText2();
                social.stopListening();
            }
            
            if (/(repite|repetir)/.test(respuestaParticipante)) {
                social.templog(usuarioId, respuestaParticipante);
                var obj = await social.play('./interacciones/exp2files/repetir.wav');
                i--;
                repetir = true;
                continue;
            } else {
                await Respuesta(social, i, respuestaParticipante);
            }
        }

        var obj = await social.play('./interacciones/exp2files/7.wav');
        social.templog(evaId, '¿Comprarias el coche?');
        var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2();
        social.stopListening();
        social.templog(usuarioId, respuestaParticipante);
        var obj = await social.play('./interacciones/exp2files/interesante.wav');
    }, Despedida: async function (social) {
        await social.play('./interacciones/exp2files/8.wav');
        console.log('Terminó la sesion.');
    }
};

async function TellCase(social, evaId, i, repetir){
    if (!repetir) {
        if (i == 0) {
            var obj = await social.play('./interacciones/exp2files/primera.wav');
        } else {
            social.movement(random.getOne(['l', 'r']));
            var obj = await social.play('./interacciones/exp2files/siguiente1.wav');
            social.movement('c');
        }
    }
    await Case(social, evaId, cases[i]);
    if (i == 0 && !repetir) {
        var obj = await social.play('./interacciones/exp2files/cual.wav');
    }
}

async function Case(social, evaId, values) {
    social.templog(evaId, 'Opción 1: ' + values[0] + ', Opción 2: ' + values[1])
    await social.play('./interacciones/exp2files/casos/' + (values[0].includes('automovil') ? 'optab' : 'opta') + '.wav');
    await social.play('./interacciones/exp2files/casos/' + values[0] + '.wav');
    await social.play('./interacciones/exp2files/casos/' + (values[1].includes('automovil') ? 'optbb' : 'optb') + '.wav');
    await social.play('./interacciones/exp2files/casos/' + values[1] + '.wav');
}

async function Respuesta(social, usuarioId, i, respuestaParticipante){
    social.templog(usuarioId, respuestaParticipante);
    if (/(1|uno|primera)/.test(respuestaParticipante)) {
        if (cases[i][0].includes('robot')) {
            social.emotions('sad', sad);
            sad++;
            joy = 0;

        }
        if (opta[i].includes('robot')) {
            social.emotions('joy', joy);
            joy++;
            sad = 0;
        }
        await social.play('./interacciones/exp2files/casos/' + opta[i] + '.wav');
    } else {
        if (cases[i][1].includes('robot')) {
            social.emotions('sad', sad);
            sad++;
            joy = 0;
        }
        if (optb[i].includes('robot')) {
            social.emotions('joy', joy);
            joy++;
            sad = 0;
        }
        await social.play('./interacciones/exp2files/casos/' + optb[i] + '.wav');
    }
    if (social.getEmotional()) {
        await social.sleep(3000);
        social.emotions('ini', 0);
        await social.sleep(((sad > 1 || joy > 1) ? 2000 : 1000));
    }
}

module.exports.TellCase = TellCase;
module.exports.Respuesta = Respuesta;