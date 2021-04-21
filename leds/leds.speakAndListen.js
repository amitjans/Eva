const matrix = require("@matrix-io/matrix-lite");
const { modColor, hexToRgb, siguiente, anterior, frente } = require('./leds.utils');

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

const escuchaT = (obj) => {
    let limit = hexToRgb(obj.color1);
    let ledguide = 0;
    let dir = true;
    let everloop = new Array(matrix.led.length).fill('#000000');
    return setInterval(() => {
        for (let i = 0; i < 18; i++) {
            if (dir && everloop[i] != '#000000') {
                everloop[i] = modColor(everloop[i], 6, limit);
            } else if (!dir && everloop[i] != obj.color1) {
                everloop[i] = modColor(everloop[i], -6, limit);
            }
        }
        let start = true;
        let until = dir ? 0 : 4;
        while (start) {
            let pos = siguiente((ledguide - 1) + until);
            let posn = anterior((ledguide + 1) - until);

            if ((everloop[pos] == '#000000' && dir) || (everloop[pos] == obj.color1 && !dir)) {
                everloop[pos] = modColor('#000000', (everloop[pos] == '#000000' && dir) ? 6 : -6, limit);
                everloop[frente(pos)] = everloop[pos];
                everloop[posn] = everloop[pos];
                everloop[frente(posn)] = everloop[pos];
                start = false;
            }
            until = dir ? until + 1 : until - 1;
            if (until > 4 || until < 0) {
                start = false;
            }
        }

        let rebaso = true;
        for (let i = 0; i < 18; i++) {
            rebaso = (dir) ? !(everloop[i] != obj.color1) : !(everloop[i] != "#000000");
            if (!rebaso) break;
        }
        if (rebaso) {
            dir = !dir;
            ledguide = dir ? siguiente(ledguide + 1) : ledguide;
        }
        matrix.led.set(everloop);
    }, obj.time);
}

const stop = () => {
    everloop = new Array(matrix.led.length).fill({});
    matrix.led.set(everloop);
}

escuchaC['params'] = { color: 1, led: 2, num: 1, time: 1 };
escuchaT['params'] = { color: 1, time: 1 };
stop['params'] = {};

module.exports = {
    escuchaC,
    escuchaT,
    stop
}
