const matrix = require("@matrix-io/matrix-lite");
const { siguiente, anterior } = require('./leds.utils');

const escuchaC = (obj) => {
    let ledguide = obj.led1;
    let dir = 1;
    return setInterval(() => {
        let everloop = new Array(matrix.led.length).fill('#000000');
        for (let i = -1; i < obj.num1 - 1; i++) {
            everloop[(i == -1 ? ledguide : siguiente(ledguide + i))] = obj.color1;
        }
        if (dir == 1) {
            if (everloop[obj.led2] != obj.color1){
                ledguide = siguiente(ledguide);
            } else {
                dir = -1;
            }
        } else if (dir == -1) {
            if (everloop[obj.led1] != obj.color1) {
                ledguide = anterior(ledguide);
            } else {
                dir = 1;
            }
        }
        matrix.led.set(everloop);
    }, obj.time);
}

escuchaC['params'] = { color: 1, led: 2, num: 1, time: 1 };

module.exports = {
    escuchaC
}
