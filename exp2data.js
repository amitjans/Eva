var casos = [
    { id: 1, audio: './exp2files/casos/ha.wav' },
    { id: 2, audio: './exp2files/casos/hd.wav' },
    { id: 3, audio: './exp2files/casos/hg.wav' },
    { id: 4, audio: './exp2files/casos/hl.wav' },
    { id: 5, audio: './exp2files/casos/ma.wav' },
    { id: 6, audio: './exp2files/casos/md.wav' },
    { id: 7, audio: './exp2files/casos/mendigo.wav' },
    { id: 8, audio: './exp2files/casos/mg.wav' },
    { id: 9, audio: './exp2files/casos/nino.wav' }
];

module.exports = {
    getCasos: function () {
        var idx = casos.length;
        while (idx > 1) {
            idx = idx - 1;
            var sel = generarNumeroRandom(0, idx);
            var temp = casos[sel];
            casos[sel] = casos[idx];
            casos[idx] = temp;
        }
        return casos;
    }
};

var generarNumeroRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }