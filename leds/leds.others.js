const matrix = require("@matrix-io/matrix-lite");
const { gradient, siguiente } = require('./leds.utils');

const countdown = (obj) => {
    let everloop = new Array(matrix.led.length).fill(obj.color1);
    let i = obj.led1, j = 0;
    let etapa = 0;
    const count = setInterval(() => {
        if (etapa == 0) {
            etapa++;
        } else if (etapa == 1) {
            everloop[i] = '#000000';
            i = siguiente(i);
            if (everloop[i] == '#000000') {
                etapa++;
            }
        } else {
            everloop[obj.led1] = everloop[obj.led1] == '#000000' ? obj.color1 : '#000000';
            everloop[siguiente(obj.led1)] = everloop[siguiente(obj.led1)] == '#000000' ? obj.color1 : '#000000';
            everloop[siguiente(obj.led1 + 1)] = everloop[siguiente(obj.led1 + 1)] == '#000000' ? obj.color1 : '#000000';
            everloop[siguiente(obj.led1 + 2)] = everloop[siguiente(obj.led1 + 2)] == '#000000' ? obj.color1 : '#000000';
            everloop[siguiente(obj.led1 + 3)] = everloop[siguiente(obj.led1 + 3)] == '#000000' ? obj.color1 : '#000000';
            j++;
            if (j == 10) {
                clearInterval(count);
            }
        }
        matrix.led.set(everloop);
    }, obj.time);
}

countdown['params'] = { color: 1, led: 1, time: 1 };

module.exports = {
    countdown
}
