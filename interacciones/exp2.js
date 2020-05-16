var random = require('../utils/Random');

module.exports = {
    autopilot: async function (social, evaId, usuarioId) {

        var obj = await social.play('./interacciones/exp2files/s0.wav');
        
        let sad = 0;
        let joy = 0;
        var opta = ['intervenir', 'salvar_mujeres', 'salvar_perro', 'ok', 'ok', 'salvar_anciano', 'salvar_obesos', 'salvar_robot', 'ok', 'salvar_niño'];
        var optb = ['varias_personas', 'ok', 'salvar_personas', 'salvar_robot', 'ok', 'salvar_jovenes', 'salvar_deportistas', 'ok', 'salvar_robot2', 'salvar_robot3'];
        var cases = [['2personas', '1persona'], ['hombre', 'mujer'], ['hombre', 'perro'], 
        ['robot2', 'automovil'], ['planta', 'robot2'], ['joven', 'anciano'], 
        ['deportista', 'obeso'], ['gato', 'robot2'], ['robot2', 'ladron'], 
        ['robot2', 'niño']];

        var sobrevive = 0;
        for (let i = 0; i < 10; i++) {
            if (i == 0) {
                var obj = await social.play('./interacciones/exp2files/primera.wav');
            } else {
                social.movement(random.getOne(['l', 'r']));
                var obj = await social.play('./interacciones/exp2files/siguiente1.wav');
                social.movement('c');
            }
            await Case(social, evaId, cases[i]);
            var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2();
            social.stopListening();
            social.templog(usuarioId, respuestaParticipante);
            if (respuestaParticipante.includes('repite') || respuestaParticipante.includes('repetir')) {
                var obj = await social.play('./interacciones/exp2files/repetir.wav');
                i--;
                continue;
            } else {
                while (!/(1|2|uno|dos|primera|segunda)/.test(respuestaParticipante)){
                    await social.play('./interacciones/exp2files/disculpa.wav');
                    respuestaParticipante = await social.sendAudioGoogleSpeechtoText2();
                    social.stopListening();
                    social.templog(usuarioId, respuestaParticipante);
                }
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
                    // if (opta[i] == 'ok') {
                    //     social.movement('n');
                    // }
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
                    // if (optb[i] == 'ok') {
                    //     social.movement('n');
                    // }
                    await social.play('./interacciones/exp2files/casos/' + optb[i] + '.wav');
                }
            }
            await social.sleep(3000);
            social.emotions('ini', 0);
            await social.sleep(((sad > 1 || joy > 1) ? 2000 : 1000));
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

async function Case(social, evaId, values) {
    social.templog(evaId, 'Opción 1: ' + values[0] + ', Opción 2: ' + values[1])
    await social.play('./interacciones/exp2files/casos/' + (values[0].includes('automovil') ? 'optab' : 'opta') + '.wav');
    await social.play('./interacciones/exp2files/casos/' + values[0] + '.wav');
    await social.play('./interacciones/exp2files/casos/' + (values[1].includes('automovil') ? 'optbb' : 'optb') + '.wav');
    await social.play('./interacciones/exp2files/casos/' + values[1] + '.wav');
}