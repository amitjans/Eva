const matrix = require("@matrix-io/matrix-lite");
const { anterior, siguiente, frente, modColor } = require('./leds.utils');

const joy = (obj) => {
    let etapa = 0, cant = 0;
    let direccion = true;
    let everloop = new Array(matrix.led.length).fill('black');

    everloop[anterior(obj.led1 - 1)] = obj.color1;
    everloop[siguiente(obj.led1)] = obj.color1;
    everloop[anterior(obj.led1 - 2)] = obj.color1;
    everloop[siguiente(obj.led1 + 1)] = obj.color1;

    return setInterval(() => {
        let start = siguiente(obj.led1 + 7);
        let start2 = siguiente(start);

        if (etapa == 0) {
            everloop[start] = obj.color1;
            everloop[start2] = obj.color1;
        }
        else if (etapa == 1) {
            everloop[siguiente(start2)] = obj.color1;
            everloop[anterior(start)] = obj.color1;
        }
        else if (etapa == 2) {
            everloop[siguiente(start2 + 1)] = obj.color1;
            everloop[anterior(start - 1)] = obj.color1;
        }
        else if (etapa == 3) {
            everloop[siguiente(start2 + 2)] = obj.color1;
            everloop[anterior(start - 2)] = obj.color1;
            direccion = !direccion;
        }
        else if (etapa % 2 == 0) {
            for (let i = anterior(start - 2); i <= siguiente(start2 + 2); i = siguiente(i)) {
                everloop[i] = '#000000';
            }
        }
        else {
            everloop[start] = obj.color1;
            everloop[start2] = obj.color1;
            everloop[siguiente(start2)] = obj.color1;
            everloop[anterior(start)] = obj.color1;
            everloop[siguiente(start2 + 1)] = obj.color1;
            everloop[anterior(start - 1)] = obj.color1;
            everloop[siguiente(start2 + 2)] = obj.color1;
            everloop[anterior(start - 2)] = obj.color1;
            cant++;
        }
        if (cant <= 3) {
            etapa++;
        }
        else {
            etapa = 0;
            cant = 0;
            for (let i = anterior(start - 2); i <= siguiente(start2 + 2); i++) {
                everloop[i] = '#000000';
            }
        }
        matrix.led.set(everloop);
    }, obj.time);
}

joy['params'] = { color: 1, led: 1, time: 1 };

module.exports = {
    joy
}
