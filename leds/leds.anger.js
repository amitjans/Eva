const matrix = require("@matrix-io/matrix-lite");
const { anterior, siguiente } = require('./leds.utils');

const anger = (obj) => {
    let izq = anterior(obj.led1);
    let der = siguiente(obj.led1 + (obj.led2 >= 2 ? 1 : 0));
    let stage = false;
    let etapa = 0;
    let everloop = new Array(matrix.led.length).fill('#000000');
    return setInterval(() => {
        if (etapa == 0) {
            everloop = new Array(matrix.led.length).fill('#000000');
            everloop[obj.led1] = obj.color1;
            if (obj.led2 >= 2)
                everloop[siguiente(obj.led1)] = obj.color1;
        }
        if (etapa % 2 == 0 && !stage) {
            everloop[izq] = obj.color1;
            everloop[der] = obj.color1;
            izq = anterior(izq);
            der = siguiente(der);
            everloop[izq] = obj.color1;
            everloop[der] = obj.color1;
        } else if (stage) {
            everloop = new Array(matrix.led.length).fill((etapa % 2 == 0 ? '#000000' : obj.color1));
        }
        else {
            everloop[izq] = '#000000';
            everloop[der] = '#000000';
        }
        etapa++;
        if (siguiente(izq) == der) {
            stage = true;
        }
        matrix.led.set(everloop);
    }, obj.time);
}

anger['params'] = { color: 1, led: 2, time: 1 };

module.exports = {
    anger
}
