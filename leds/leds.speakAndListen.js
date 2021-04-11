const matrix = require("@matrix-io/matrix-lite");
const { modColor, hexToRgb, siguiente, anterior } = require('./leds.utils');

const escuchaC = (obj) => {
    let ledguide = obj.led1;
    let dir = 1;
    return setInterval(() => {
        let everloop = new Array(matrix.led.length).fill('#000000');
        for (let i = -1; i < obj.led3 - 1; i++) {
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
    let ledInicio = 0, pos = 0, posn = 0, posdo = 0, posndo = 0, until = 0;
    let direccion = true, start = true, rebaso = true;
    let everloop = new Array(matrix.led.length).fill('#000000');
    return setInterval(() => {
        for (let i = 0; i < 18; i++) {
            if (direccion && everloop[i] != '#000000') {
                everloop[i] = modColor(everloop[i], 6, limit);
            } else if (!direccion && everloop[i] != obj.color1) {
                everloop[i] = modColor(everloop[i], -6, limit);
            }
        }
        start = true;
        until = direccion ? 0 : 4;
        while (start) {
            pos = (ledInicio + until >= 18) ? (ledInicio + until - 18) : (ledInicio + until);
            posdo = (pos + 9 >= 18) ? (pos + 9) - 18 : (pos + 9);
            posn = (ledInicio - until < 0) ? (18 + (ledInicio - until)) : (ledInicio - until);
            posndo = (posn + 9 >= 18) ? (posn + 9) - 18 : (posn + 9);

            if (everloop[pos] == '#000000' && direccion) {
                everloop[pos] = modColor('#000000', 3, limit);
                everloop[posdo] = modColor('#000000', 3, limit);
                everloop[posn] = modColor('#000000', 3, limit);
                everloop[posndo] = modColor('#000000', 3, limit);
                start = false;
            }
            if (everloop[pos] == obj.color1 && !direccion) {
                everloop[pos] = modColor(obj.color1, -3, limit);
                everloop[posdo] = modColor(obj.color1, -3, limit);
                everloop[posn] = modColor(obj.color1, -3, limit);
                everloop[posndo] = modColor(obj.color1, -3, limit);
                start = false;
            }
            until = direccion ? until + 1 : until - 1;
            if (until > 4 || until < 0) {
                start = false;
            }
        }

        rebaso = true;
        for (let i = 0; i < 18; i++) {
            if (direccion) {
                if (everloop[i] != obj.color1) {
                    rebaso = false;
                }
            } else {
                if (everloop[i] != "#000000") {
                    rebaso = false;
                }
            }
        }
        if (rebaso) {
            direccion = !direccion;
            if (direccion) {
                ledInicio = ledInicio + 2 >= 18 ? ledInicio + 2 - 18 : ledInicio + 2;
            }
        }
        matrix.led.set(everloop);
    }, obj.time);
}

const stop = () => {
    everloop = new Array(matrix.led.length).fill({});
    matrix.led.set(everloop);
}

escuchaC['params'] = { color: 1, led: 3, time: 1 };
escuchaT['params'] = { color: 1, led: 0, time: 1 };
stop['params'] = { color: 0, led: 1, time: 1 };

module.exports = {
    escuchaC,
    escuchaT,
    stop
}
