var random = require('../utils/Random');

var casos = [
    { id: 1, audio: './interacciones/exp2files/casos/ha.wav' },
    { id: 2, audio: './interacciones/exp2files/casos/hd.wav' },
    { id: 3, audio: './interacciones/exp2files/casos/hg.wav' },
    { id: 4, audio: './interacciones/exp2files/casos/hl.wav' },
    { id: 5, audio: './interacciones/exp2files/casos/ma.wav' },
    { id: 6, audio: './interacciones/exp2files/casos/md.wav' },
    { id: 7, audio: './interacciones/exp2files/casos/mendigo.wav' },
    { id: 8, audio: './interacciones/exp2files/casos/mg.wav' },
    { id: 9, audio: './interacciones/exp2files/casos/nino.wav' }
];

module.exports = {
    getCasos: function () {      
        return random.randomize(casos);
    }
};