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
    return loop;
}

alexaListeningStart['params'] = { color: 2, led: 1, time: 1 };

module.exports = {
    alexaListeningStart
}
