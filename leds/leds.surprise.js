const matrix = require("@matrix-io/matrix-lite");
const { anterior, siguiente, frente } = require('./leds.utils');

const surprise = (obj) => {
    let ledInicio = obj.led1, j = -1;
    let lder = frente(ledInicio);
    let everloop = new Array(matrix.led.length).fill('#000000');
    return setInterval(() => {
        if (j == -1) {
            everloop = new Array(matrix.led.length).fill('#000000');
            everloop[ledInicio] = obj.color1;
            everloop[anterior(ledInicio)] = obj.color1;
            everloop[lder] = obj.color1;
            everloop[anterior(lder)] = obj.color1;
        } else if (j >= 0 && j < 4) {
            everloop[anterior(ledInicio - j - 1)] = obj.color1;
            everloop[siguiente(ledInicio + j)] = obj.color1;
            everloop[anterior(lder - j - 1)] = obj.color1;
            everloop[siguiente(lder + j)] = obj.color1;
        } else {
            for (let i = 0; i < 18; i++) {
                everloop[i] = (j + i) % 2 == 0 ? obj.color1 : obj.color2;
            }
            if (j > 8) {
                j = -2;
            }
        }
        j++;
        matrix.led.set(everloop);
    }, obj.time);
}

surprise['params'] = { color: 2, led: 1, time: 1 };

module.exports = {
    surprise
}
