const matrix = require("@matrix-io/matrix-lite");
const { rgbToHex } = require('./leds.utils');

const rainbow = (obj) => {
    let counter = 0;
    let freq = 0.375;
    let everloop = new Array(matrix.led.length).fill('#000000');
    return setInterval(() => {
        for (let i = 0; i < 18; i++) {
            let temp = {
                r: Math.round(Math.max(0, (Math.sin(freq * counter + (Math.PI / 180 * 240)) * 155 + 100) / 10)),
                g: Math.round(Math.max(0, (Math.sin(freq * counter + (Math.PI / 180 * 120)) * 155 + 100) / 10)),
                b: Math.round(Math.max(0, (Math.sin(freq * counter) * 155 + 100) / 10))
            };
            everloop[i] = rgbToHex(temp);
            counter = counter + 1.01;
        }
        matrix.led.set(everloop);
    }, obj.time);
}

rainbow['params'] = { time: 1 };

module.exports = {
    rainbow
}
