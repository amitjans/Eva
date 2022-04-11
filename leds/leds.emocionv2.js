const matrix = require("@matrix-io/matrix-lite");
const { siguiente, gradient } = require('./leds.utils');

const emocionv2 = (obj) => {
    let everloop = new Array(matrix.led.length).fill('#000000');
    let led = obj.led1;
    let i = 0;
    let colors = gradient(obj.color1, '#ffffff', 14, true);
    const loop = setInterval(() => {
        if (i < 33) {
            for (let j = 0; j < matrix.led.length; j++) {
                everloop[j] = (everloop[j] == obj.color1) ? obj.color1 : '#000000';
            }
            everloop[led] = colors[keepLast(i, colors.length)];
            everloop[siguiente(led)] = colors[keepLast(i + 1, colors.length)];
            everloop[siguiente(led + 1)] = colors[keepLast(i + 2, colors.length)];
            everloop[siguiente(led + 2)] = colors[keepLast(i + 3, colors.length)];
            led = siguiente(led);
        }
        if (i >= 33) {
            everloop = new Array(matrix.led.length).fill('#000000');
            matrix.led.set(everloop);
            clearInterval(loop);
        }
        i++;
        matrix.led.set(everloop);
    }, obj.time);
    return loop;
}

emocionv2['params'] = { color: 1, led: 1, time: 1 };

let keepLast = (value, max) => value + 1 > max - 1 ? max - 1 : value;

module.exports = {
    emocionv2
}
