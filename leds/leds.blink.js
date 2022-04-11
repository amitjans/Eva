const matrix = require("@matrix-io/matrix-lite");
const { gradient } = require('./leds.utils');

const blink = (obj) => {
    let everloop = new Array(matrix.led.length).fill('#000000');
    let i = 0;
    let dir = false;
    let colors = gradient(obj.color1, obj.color2, 14);
    return setInterval(() => {
        everloop = new Array(matrix.led.length).fill(colors[i]);
        matrix.led.set(everloop);
        if (i == colors.length - 1 || i == 0) {
            dir = !dir;
        }
        i = dir ? i + 1 : i - 1;
    }, obj.time);
}

blink['params'] = { color: 2, time: 1 };

module.exports = {
    blink
}
