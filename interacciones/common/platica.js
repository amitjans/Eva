module.exports = {
    inicial : async function (social, evaId, usuarioId, opt = true) {
        // ini platica
		social.templog(evaId, 'Platica');
		if (opt) {
			await social.play('./interacciones/platica/1.wav');
			var respuesta = await social.sendAudioGoogleSpeechtoText2();
			social.stopListening();
			social.templog(usuarioId, respuesta);
		}
		social.emotions('joy', 0, false);
		await social.play('./interacciones/platica/2.wav');
		social.emotions('ini', 0);
		await social.play('./interacciones/platica/3.wav');
		social.emotions('joy', 1, false);
		await social.play('./interacciones/platica/4.wav');
		social.movement('c');
		social.emotions('sad', 1, false);
		await social.play('./interacciones/platica/5.wav');
		social.emotions('ini', 0);
		await social.play('./interacciones/platica/6.wav');
		social.emotions('sad', 2, false);
		await social.play('./interacciones/platica/7.wav');
		social.movement('c');
		social.emotions('anger', 0, false);
		await social.play('./interacciones/platica/8.wav');
		social.emotions('anger', 1, false);
		await social.play('./interacciones/platica/9.wav');
		social.emotions('ini', 0);
		// await social.play('./interacciones/platica/10.wav');
		// end platica
    }
};