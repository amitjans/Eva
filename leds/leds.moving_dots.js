const matrix = require("@matrix-io/matrix-lite");
const { rgbToHex } = require('./leds.utils');

const moving_dots = (obj) => {
    let counter = 0;
    let everloop = new Array(matrix.led.length).fill('#000000');
    return setInterval(() => {
        everloop = new Array(matrix.led.length).fill('#000000');
        everloop[(counter / 2) % matrix.led.length] = obj.color1;
        everloop[(counter / 2) % matrix.led.length] = obj.color2;
        everloop[(counter / 4) % matrix.led.length] = obj.color3;
        everloop[(counter / 6) % matrix.led.length] = obj.color4;
        everloop[matrix.led.length - 1 - (counter % matrix.led.length)] = obj.color5;
        matrix.led.set(everloop);
        counter++;
    }, obj.time);
}

moving_dots['params'] = { color: 5, time: 1 };

module.exports = {
    moving_dots
}
