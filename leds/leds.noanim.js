const matrix = require("@matrix-io/matrix-lite");
const { gradient } = require('./leds.utils');

const noanim = (obj) => {
    let everloop = new Array(matrix.led.length).fill(obj.color1);
    matrix.led.set(everloop);
}

noanim['params'] = { color: 1 };

module.exports = {
    noanim
}
