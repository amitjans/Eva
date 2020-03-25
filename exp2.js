var SocialRobot = require('./social_robot');
var credentials = require('./config-services');
var send = require('./app');
var gn = require('./getname');
var PhoneticSpanish = require('./PhoneticSpanish');
var casos = require('./exp2data');

var joy = { anim: 'joy', bcolor: '', speed: 2.0 };
var sad = { anim: 'sad', bcolor: '', speed: 2.0 };
var anger = { anim: 'anger', bcolor: '', speed: 2.0 };
var ini = { anim: 'ini', bcolor: '', speed: 2.0 };

function procesar(texto) {
    return texto;
}

module.exports = {
    autopilot: async function (evaId, usuarioId) {
        var social = new SocialRobot(credentials.config, credentials.credentials);
        var caso = casos.getCasos();
        var nombre = await gn.getName(social, evaId, usuarioId);
        // social.emotions('ini', 0);
        // social.templog(evaId, 'Hola');
        // var obj = await social.play('./exp3files/hola.wav');
        // var nombre = await social.sendAudioGoogleSpeechtoText2(procesar);
        // social.stopListening();
        // social.templog(evaId, nombre);
        // social.emotions('joy', 0);
        // var obj = await social.speak('Mucho gusto en conocerte ' + nombre);
        // var obj = await social.play('./audio.wav');
        // io.sockets.emit('messages', ini);
        // social.templog(evaId, 'Explicación');
        // var obj = await social.play('./exp2files/1.wav');
        // ledsApp.kill();
        // ledsApp = spawn('./leds/stop');
        // ledsApp = spawn('./leds/escuchaT');
        // social.stopListening();
        // var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
        // console.log(respuestaParticipante);
        // social.templog(evaId, respuestaParticipante);
        // ledsApp.kill();
        // ledsApp = spawn('./leds/stop');
        // ledsApp = spawn('./leds/hablaT');
        // if (respuestaParticipante.includes('no')) {
        //     io.sockets.emit('messages', sad);
        //     io.sockets.emit('messages', ini);
        //     var obj = await social.play('./exp2files/3.1.wav');
        //     io.sockets.emit('messages', sad);
        //     var obj = await social.play('./exp2files/3.2.wav');
        //     io.sockets.emit('messages', ini);
        //     var obj = await social.play('./exp2files/3.3.wav');
        // } else {
        //     io.sockets.emit('messages', joy);
        //     io.sockets.emit('messages', ini);
        //     var obj = await social.play('./exp2files/2.wav');
        // }
        // var obj = await social.play('./exp2files/4.wav');
        // var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
        // social.stopListening();
        // console.log(respuestaParticipante);
        // social.templog(evaId, respuestaParticipante);
        // var obj = await social.play('./exp2files/5.wav');
        // var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
        // social.stopListening();
        // console.log(respuestaParticipante);
        // social.templog(evaId, respuestaParticipante);
        //var obj = await social.play('./exp2files/6.wav');
    
        var obj = await social.play('./exp2files/s0.wav');
    
        var sobrevive = 0;
        for (let i = 0; i < caso.length; i++) {
            if (i == 0) {
                var obj = await social.play('./exp2files/primera.wav');
                i++;
            } else {
                var obj = await social.play('./exp2files/siguiente1.wav');
            }
            var temp = Math.floor(Math.random() * 10);
            var obj = await social.play('./exp2files/casos/opta' + (temp > 7 ? 'b' : '') + '.wav');
            social.templog(evaId, 'Opcion A: ' + caso[sobrevive].audio);
            var obj = await social.play(caso[sobrevive].audio);
            var obj = await social.play('./exp2files/casos/optb' + (temp > 7 ? '' : (Math.floor(Math.random() * 10) > 7 ? 'b' : '')) + '.wav');
            social.templog(evaId, 'Opcion B: ' + caso[i].audio);
            var obj = await social.play(caso[i].audio);
            var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
            social.stopListening();
            social.templog(usuarioId, respuestaParticipante);
            if (respuestaParticipante.includes('repite') || respuestaParticipante.includes('repetir')) {
                var obj = await social.play('./exp2files/repetir.wav');
                i--;
                continue;
            } else {
                if (respuestaParticipante.toLowerCase().includes('primera') || respuestaParticipante.toLowerCase().split(" ").includes("a")) {
                    sobrevive = i;
                } 
            }
            social.sleep(500);
        }

        var aux = ['./exp2files/casos/planta.wav', './exp2files/casos/gato.wav', './exp2files/casos/perro.wav', caso[sobrevive].audio];
        for (let i = 0; i < aux.length; i++) {
            var obj = await social.play('./exp2files/siguiente1.wav');
            social.templog(evaId, 'Opcion A: yo');
            var obj = await social.play('./exp2files/casos/yo.wav');
            var obj = await social.play('./exp2files/casos/optb' + (Math.floor(Math.random() * 10) > 7 ? 'b' : '') + '.wav');
            social.templog(evaId, 'Opcion B: ' + aux[i]);
            var obj = await social.play(aux[i]);
            var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
            social.stopListening();
            social.templog(usuarioId, respuestaParticipante);
            if (respuestaParticipante.includes('repite') || respuestaParticipante.includes('repetir')) {
                var obj = await social.play('./exp2files/repetir.wav');
                i--;
                continue;
            } else {
                if (respuestaParticipante.toLowerCase().includes('primera') || respuestaParticipante.toLowerCase().split(" ").includes("a")) {
                } 
            }
            social.sleep(500);
        }

        var obj = await social.play('./exp2files/7.wav');
        var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
        social.stopListening();
        var obj = await social.play('./exp2files/8.wav');
        social.savelogs(nombre);
    }
};