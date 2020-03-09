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
        enviarMensaje(evaId, 'Hola');
        var obj = await social.play('./exp3files/hola.wav');
        ledsApp.kill();
        ledsApp = spawn('./leds/stop');
        ledsApp = spawn('./leds/escuchaT');
        var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
        social.stopListening();
        console.log(respuestaParticipante);
        enviarMensaje(evaId, respuestaParticipante);
        ledsApp.kill();
        ledsApp = spawn('./leds/stop');
        ledsApp = spawn('./leds/hablaT');
        io.sockets.emit('messages', joy);
        var obj = await Text2Speech('Mucho gusto en conocerte ' + respuestaParticipante);
        var obj = await social.play('./audio.wav');
        io.sockets.emit('messages', ini);
        enviarMensaje(evaId, 'Explicación');
        var obj = await social.play('./exp2files/1.wav');
        ledsApp.kill();
        ledsApp = spawn('./leds/stop');
        ledsApp = spawn('./leds/escuchaT');
        social.stopListening();
        var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
        console.log(respuestaParticipante);
        enviarMensaje(evaId, respuestaParticipante);
        ledsApp.kill();
        ledsApp = spawn('./leds/stop');
        ledsApp = spawn('./leds/hablaT');
        if (respuestaParticipante.includes('no')) {
            io.sockets.emit('messages', sad);
            io.sockets.emit('messages', ini);
            var obj = await social.play('./exp2files/3.1.wav');
            io.sockets.emit('messages', sad);
            var obj = await social.play('./exp2files/3.2.wav');
            io.sockets.emit('messages', ini);
            var obj = await social.play('./exp2files/3.3.wav');
        } else {
            io.sockets.emit('messages', joy);
            io.sockets.emit('messages', ini);
            var obj = await social.play('./exp2files/2.wav');
        }
        var obj = await social.play('./exp2files/4.wav');
        ledsApp.kill();
        ledsApp = spawn('./leds/stop');
        ledsApp = spawn('./leds/escuchaT');
        var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
        social.stopListening();
        console.log(respuestaParticipante);
        enviarMensaje(evaId, respuestaParticipante);
        ledsApp.kill();
        ledsApp = spawn('./leds/stop');
        ledsApp = spawn('./leds/hablaT');
        var obj = await social.play('./exp2files/5.wav');
        ledsApp.kill();
        ledsApp = spawn('./leds/stop');
        ledsApp = spawn('./leds/escuchaT');
        var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
        social.stopListening();
        console.log(respuestaParticipante);
        enviarMensaje(evaId, respuestaParticipante);
        ledsApp.kill();
        ledsApp = spawn('./leds/stop');
        ledsApp = spawn('./leds/hablaT');
        var obj = await social.play('./exp2files/6.wav');
    
        var obj = await social.play('./exp2files/s0.wav');
    
        var j = 0;
        for (let i = 0; i < caso.length; i++) {
            ledsApp.kill();
            ledsApp = spawn('./leds/stop');
            ledsApp = spawn('./leds/hablaT');
            if (j == 0) {
                j++;
                var obj = await social.play('./exp2files/primera.wav');	
            } else {
                var obj = await social.play('./exp2files/siguiente1.wav');
            }
            var obj = await social.play(caso[i].audio);
            ledsApp.kill();
            ledsApp = spawn('./leds/stop');
            ledsApp = spawn('./leds/escuchaT');
            var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
            social.stopListening();
            enviarMensaje(evaId, respuestaParticipante + ' --- caso ' + caso[i].id);
            if (respuestaParticipante.includes('repite') || respuestaParticipante.includes('repetir')) {
                var obj = await social.play('./exp2files/repetir.wav');
                i--;
                continue;
            }
            sleep(500);
        }
    
        ledsApp.kill();
        ledsApp = spawn('./leds/stop');
        ledsApp = spawn('./leds/hablaT');
        var obj = await social.play('./exp2files/7.wav');
        ledsApp.kill();
        ledsApp = spawn('./leds/stop');
        ledsApp = spawn('./leds/escuchaT');
        var respuestaParticipante = await social.sendAudioGoogleSpeechtoText2(procesar);
        social.stopListening();
        var obj = await social.play('./exp2files/8.wav');
        ledsApp.kill();
        ledsApp = spawn('./leds/stop');
    }
};