var casos = [
    { id: 1, audio: './exp2files/casos/s1.wav' },
    { id: 2, audio: './exp2files/casos/s2.wav' },
    { id: 3, audio: './exp2files/casos/s3.wav' },
    { id: 4, audio: './exp2files/casos/s4.wav' },
    { id: 5, audio: './exp2files/casos/s5.wav' },
    { id: 6, audio: './exp2files/casos/s6.wav' },
    { id: 7, audio: './exp2files/casos/s7.wav' },
    { id: 8, audio: './exp2files/casos/s8.wav' },
    { id: 9, audio: './exp2files/casos/s9.wav' },
    { id: 10, audio: './exp2files/casos/s10.wav' },
    { id: 11, audio: './exp2files/casos/s11.wav' },
    { id: 12, audio: './exp2files/casos/s12.wav' },
    { id: 13, audio: './exp2files/casos/s13.wav' }    
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