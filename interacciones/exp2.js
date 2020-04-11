var casos = require('./exp2data');

function procesar(texto) {
    return texto;
}

module.exports = {
    autopilot: async function (social, evaId, usuarioId) {
        var caso = casos.getCasos();
   
        var obj = await social.play('./interacciones/exp2files/s0.wav');
    
        var sobrevive = 0;
        for (let i = 0; i < caso.length; i++) {
            if (i == 0) {
                var obj = await social.play('./interacciones/exp2files/primera.wav');
                i++;
            } else {
                var obj = await social.play('./interacciones/exp2files/siguiente1.wav');
            }
            var temp = Math.floor(Math.random() * 10);
            var obj = await social.play('./interacciones/exp2files/casos/opta' + (temp > 7 ? 'b' : '') + '.wav');
            social.templog(evaId, 'Opcion A: ' + caso[sobrevive].audio);
            var obj = await social.play(caso[sobrevive].audio);
            var obj = await social.play('./interacciones/exp2files/casos/optb' + (temp > 7 ? '' : (Math.floor(Math.random() * 10) > 7 ? 'b' : '')) + '.wav');
            social.templog(evaId, 'Opcion B: ' + caso[i].audio);
            var obj = await social.play(caso[i].audio);
            var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
            social.stopListening();
            social.templog(usuarioId, respuestaParticipante);
            if (respuestaParticipante.includes('repite') || respuestaParticipante.includes('repetir')) {
                var obj = await social.play('./interacciones/exp2files/repetir.wav');
                i--;
                continue;
            } else {
                if (respuestaParticipante.toLowerCase().includes('primera') || respuestaParticipante.toLowerCase().split(" ").includes("a")) {
                    sobrevive = i;
                } 
            }
            social.sleep(500);
        }

        var aux = ['./interacciones/exp2files/casos/planta.wav', './interacciones/exp2files/casos/gato.wav', './interacciones/exp2files/casos/perro.wav', caso[sobrevive].audio];
        for (let i = 0; i < aux.length; i++) {
            var obj = await social.play('./interacciones/exp2files/siguiente1.wav');
            social.templog(evaId, 'Opcion A: yo');
            var obj = await social.play('./interacciones/exp2files/casos/yo.wav');
            var obj = await social.play('./interacciones/exp2files/casos/optb' + (Math.floor(Math.random() * 10) > 7 ? 'b' : '') + '.wav');
            social.templog(evaId, 'Opcion B: ' + aux[i]);
            var obj = await social.play(aux[i]);
            var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
            social.stopListening();
            social.templog(usuarioId, respuestaParticipante);
            if (respuestaParticipante.includes('repite') || respuestaParticipante.includes('repetir')) {
                var obj = await social.play('./interacciones/exp2files/repetir.wav');
                i--;
                continue;
            } else {
                if (respuestaParticipante.toLowerCase().includes('primera') || respuestaParticipante.toLowerCase().split(" ").includes("a")) {
                } 
            }
            social.sleep(500);
        }

        var obj = await social.play('./interacciones/exp2files/7.wav');
        social.templog(evaId, '¿Comprarias el coche?');
        var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
        social.stopListening();
        social.templog(usuarioId, respuestaParticipante);
        var obj = await social.play('./interacciones/exp2files/interesante.wav');
    }, Despedida: async function (social) {
		await social.play('./interacciones/exp2files/8.wav');
		console.log('Terminó la sesion.');
	}
};