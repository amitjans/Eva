const matrix = require("@matrix-io/matrix-lite");
const { siguiente } = require('./leds.utils');

const rgb_fan_inspired = (obj) => {
    let ledguide = 0;
    let everloop = new Array(matrix.led.length).fill('#000000');
    return setInterval(() => {
        for (let i = 1; i < 4; i++) {
            for (let j = 0; j < 6; j++) {
                everloop[ledguide] = obj['color' + i];
                ledguide = siguiente(ledguide);
            }
        }
        ledguide = siguiente(ledguide);
        matrix.led.set(everloop);
    }, obj.time);
}

rgb_fan_inspired['params'] = { color: 3, time: 1 };

module.exports = {
    rgb_fan_inspired
}
