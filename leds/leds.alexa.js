const matrix = require("@matrix-io/matrix-lite");
const { siguiente, anterior } = require('./leds.utils');

const alexaListeningStart = (obj) => {
    obj.led2 = siguiente(obj.led1); 
    let der = siguiente(obj.led2);
    let izq = anterior(obj.led1);
    let etapa = 1;
    let everloop = new Array(matrix.led.length).fill('#000000');
    let loop = setInterval(() => {
        if (etapa == 1) {
            everloop[obj.led1] = obj.color1;
            everloop[obj.led2] = obj.color1;
            everloop[der] = obj.color1;
            everloop[izq] = obj.color1;
            etapa++;
        } else if (etapa == 2) {
            der = siguiente(der);
            izq = anterior(izq);
            everloop[der] = obj.color1;
            everloop[izq] = obj.color1;
            let i = siguiente(izq + 1);
            let j = anterior(der - 1);
            while (i != siguiente(j)) {
                everloop[i] = obj.color2;
                i = siguiente(i);
            }   
        }
        matrix.led.set(everloop);
        if(siguiente(der) == izq){
            clearInterval(loop);
        }
    }, obj.time);
}

const alexaListeningEnd = (obj) => {
    obj.led2 = siguiente(obj.led1); 
    let der = siguiente(obj.led2);
    let izq = anterior(obj.led1);
    let etapa = 1;
    let everloop = new Array(matrix.led.length).fill(obj.color2);
    let loop = setInterval(() => {
        if (etapa == 1) {
            everloop[obj.led1] = obj.color1;
            everloop[obj.led2] = obj.color1;
            everloop[der] = obj.color1;
            everloop[izq] = obj.color1;
            etapa++;
        } else if (etapa == 2) {
            der = siguiente(der);
            izq = anterior(izq);
            everloop[der] = obj.color1;
            everloop[izq] = obj.color1;
            let i = siguiente(izq + 1);
            let j = anterior(der - 1);
            while (i != siguiente(j)) {
                everloop[i] = '#000000';
                i = siguiente(i);
            }
            if(siguiente(der) == izq){
                etapa++;
            }
        } else if (etapa == 3){
            everloop[anterior(der)] = '#000000';
            everloop[siguiente(izq)] = '#000000';
            etapa++;
        } else {
            everloop[der] = '#000000';
            everloop[izq] = '#000000';
            etapa++;
        }
        matrix.led.set(everloop);
        if (etapa == 5) {
            clearInterval(loop);
        }
    }, obj.time);
}

const alexaThinking = (obj) => {
    let everloop = new Array(matrix.led.length).fill(obj.color1);
    let j = 0;
    return setInterval(() => {
        everloop = new Array(matrix.led.length).fill(obj.color1);
        for (let i = 0; i < 18; i+= 6) {
            everloop[siguiente(j + i - 1)] = obj.color2;
            everloop[siguiente(j + i)] = obj.color2;
            everloop[siguiente(j + i + 1)] = obj.color2;
        }
        j = siguiente(j);
        matrix.led.set(everloop);
    }, obj.time);
}

alexaListeningStart['params'] = { color: 2, led: 1, time: 1 };
alexaListeningEnd['params'] = { color: 2, led: 1, time: 1 };
alexaThinking['params'] = { color: 2, led: 0, time: 1 };

module.exports = {
    alexaListeningStart,
    alexaListeningEnd,
    alexaThinking
}
