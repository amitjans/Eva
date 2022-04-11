const matrix = require("@matrix-io/matrix-lite");

const stop = () => {
    everloop = new Array(matrix.led.length).fill({});
    matrix.led.set(everloop);
}

stop['params'] = {};

module.exports = {
    stop
}