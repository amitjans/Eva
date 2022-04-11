const matrix = require("@matrix-io/matrix-lite");
const { siguiente, rgbToHex } = require('./leds.utils');

const processing = (obj) => {
    let ledguide = 0;
    let everloop = new Array(matrix.led.length).fill('#000000');
    return setInterval(() => {
        everloop = new Array(matrix.led.length).fill(obj.color1);
        for (let i = 0; i < obj.led1; i++) {
            everloop[siguiente(ledguide + (i - 1))] = obj.color2;
        }
        ledguide = siguiente(ledguide);
        matrix.led.set(everloop);
    }, obj.time);
}

processing['params'] = { color: 2, led: 1, time: 1 };

module.exports = {
    processing
}
