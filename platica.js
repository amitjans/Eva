module.exports = {
    inicial : async function (social, evaId, usuarioId) {
        //ini platica
		social.templog(evaId, 'Platica');
		var obj = await social.play('./exp1files/platica/1.wav');
		var respuesta = await social.sendAudioGoogleSpeechtoText2();
		social.stopListening();
		social.templog(usuarioId, respuesta);
		social.emotions('joy', 0, false);
		var obj = await social.play('./exp1files/platica/2.wav');
		social.emotions('ini', 0);
		var obj = await social.play('./exp1files/platica/3.wav');
		social.emotions('joy', 1, false);
		var obj = await social.play('./exp1files/platica/4.wav');
		social.movement('c');
		social.emotions('sad', 0, false);
		var obj = await social.play('./exp1files/platica/5.wav');
		social.emotions('ini', 0);
		var obj = await social.play('./exp1files/platica/6.wav');
		social.emotions('sad', 1, false);
		var obj = await social.play('./exp1files/platica/7.wav');
		social.movement('c');
		social.emotions('anger', 0, false);
		var obj = await social.play('./exp1files/platica/8.wav');
		social.emotions('anger', 1, false);
		var obj = await social.play('./exp1files/platica/9.wav');
		social.emotions('ini', 0);
		var obj = await social.play('./exp1files/platica/10.wav');
		//end platica
    }
};