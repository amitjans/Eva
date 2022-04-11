const matrix = require("@matrix-io/matrix-lite");
const { siguiente } = require('./leds.utils');

const alexaThinking = (obj) => {
    let everloop = new Array(matrix.led.length).fill(obj.color1);
    let j = 0;
    return setInterval(() => {
        everloop = new Array(matrix.led.length).fill(obj.color1);
        for (let i = 0; i < 18; i+= 6) {
            everloop[siguiente(j + i - 1)] = obj.color2;
            everloop[siguiente(j + i)] = obj.color2;
            everloop[siguiente(j + i + 1)] = obj.color2;
        }
        j = siguiente(j);
        matrix.led.set(everloop);
    }, obj.time);
}

alexaThinking['params'] = { color: 2, time: 1 };

module.exports = {
    alexaThinking
}
