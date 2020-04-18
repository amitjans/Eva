function ProcesarNombre (nombre){
    if (nombre.includes(" ")) {
        //return nombre.split(" ").pop();
        var aux = nombre.split(" ");
        for (let i = aux.length - 1; i >= 0 ; i--) {
            if (aux[i].length < 3  || aux[i] === "nombre" || aux[i] === "llamo") {
                aux.splice(i, 1);
            }
        }
        if (aux.length > 1) {
            for (let i = aux.length - 1; i >= 0 ; i--) {
                if (aux[i][0] !== aux[i][0].toUpperCase()) {
                    aux.splice(i, 1);
                }                
            }
        }
        return aux.join(' ');
    } else {
        return nombre;
    }
}

module.exports = {
    getName : async function (social, evaId, usuarioId) {
        social.emotions('ini', 0);
        social.templog(evaId, 'Hola');
        var obj = await social.play('./interacciones/exp3files/hola.wav');
        var nombre = await social.sendAudioGoogleSpeechtoText2();
        social.templog(usuarioId, nombre);
        nombre = ProcesarNombre(nombre);
        social.templog(evaId, nombre);
        social.stopListening();
        social.emotions('joy', 0);
        var obj = await social.speak('Mucho gusto en conocerte ' + nombre);
        social.emotions('ini', 0);
        return nombre;
    }
};

module.exports.ProcesarNombre = ProcesarNombre;