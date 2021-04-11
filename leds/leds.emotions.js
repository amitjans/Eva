const matrix = require("@matrix-io/matrix-lite");
const { anterior, siguiente, frente, modColor } = require('./leds.utils');

const anger = (obj) => {
    let izq = anterior(obj.led1);
    let der = siguiente(obj.led1 + (obj.ledson >= 2 ? 1 : 0));
    let stage = false;
    let etapa = 0;
    let everloop = new Array(matrix.led.length).fill('black');
    return setInterval(() => {
        if (etapa == 0) {
            for (let i = 0; i < 18; i++) {
                everloop[i] = '#000000';
            }
            everloop[obj.led1] = obj.color1;
            if (obj.ledson >= 2)
                everloop[siguiente(obj.led1)] = obj.color1;
        }
        if (etapa % 2 == 0 && !stage) {
            everloop[izq] = obj.color1;
            everloop[der] = obj.color1;
            izq = anterior(izq);
            der = siguiente(der);
            everloop[izq] = obj.color1;
            everloop[der] = obj.color1;
        } else if (stage) {
            if (etapa % 2 == 0) {
                for (let i = 0; i < 18; i++) {
                    everloop[i] = '#000000';
                }
            }
            else {
                for (let i = 0; i < 18; i++) {
                    everloop[i] = obj.color1;
                }
            }
        }
        else {
            everloop[izq] = '#000000';
            everloop[der] = '#000000';
        }
        etapa++;
        if (izq > der) {
            stage = true;
        }
        matrix.led.set(everloop);
    }, obj.time);
}

const joy = (obj) => {
    let etapa = 0, cant = 0;
    let direccion = true;
    let everloop = new Array(matrix.led.length).fill('black');

    everloop[anterior(obj.led1 - 1)] = obj.color1;
    everloop[siguiente(obj.led1)] = obj.color1;
    everloop[anterior(obj.led1 - 2)] = obj.color1;
    everloop[siguiente(obj.led1 + 1)] = obj.color1;

    return setInterval(() => {
        let start = siguiente(obj.led1 + 7);
        let start2 = siguiente(start);

        if (etapa == 0) {
            everloop[start] = obj.color1;
            everloop[start2] = obj.color1;
        }
        else if (etapa == 1) {
            everloop[siguiente(start2)] = obj.color1;
            everloop[anterior(start)] = obj.color1;
        }
        else if (etapa == 2) {
            everloop[siguiente(start2 + 1)] = obj.color1;
            everloop[anterior(start - 1)] = obj.color1;
        }
        else if (etapa == 3) {
            everloop[siguiente(start2 + 2)] = obj.color1;
            everloop[anterior(start - 2)] = obj.color1;
            direccion = !direccion;
        }
        else if (etapa % 2 == 0) {
            for (let i = anterior(start - 2); i <= siguiente(start2 + 2); i = siguiente(i)) {
                everloop[i] = '#000000';
            }
        }
        else {
            everloop[start] = obj.color1;
            everloop[start2] = obj.color1;
            everloop[siguiente(start2)] = obj.color1;
            everloop[anterior(start)] = obj.color1;
            everloop[siguiente(start2 + 1)] = obj.color1;
            everloop[anterior(start - 1)] = obj.color1;
            everloop[siguiente(start2 + 2)] = obj.color1;
            everloop[anterior(start - 2)] = obj.color1;
            cant++;
        }
        if (cant <= 3) {
            etapa++;
        }
        else {
            etapa = 0;
            cant = 0;
            for (let i = anterior(start - 2); i <= siguiente(start2 + 2); i++) {
                everloop[i] = '#000000';
            }
        }
        matrix.led.set(everloop);
    }, obj.time);
}

const sad = (obj) => {
    let lizq = obj.led1;
    let lder = anterior(obj.led1);
    let colors = [modColor(obj.color1, -30)];
    colors.push(modColor(colors[0], -15))
    let everloop = new Array(matrix.led.length).fill('#000000');
    return setInterval(() => {
        for (let i = 0; i < 18; i++) {
            if (everloop[i] == obj.color1) {
                everloop[i] = colors[0];
            } else if (everloop[i] == colors[0]) {
                everloop[i] = colors[1];
            } else {
                everloop[i] = '#000000';
            }
        }
        everloop[lizq] = obj.color1;
        everloop[lder] = obj.color1;
        lizq = anterior(lizq);
        lder = siguiente(lder);

        if (lizq <= lder) {
            lizq = obj.led1;
            lder = anterior(obj.led1);
        }
        matrix.led.set(everloop);
    }, obj.time);
}

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

anger['params'] = { color: 1, led: 1, time: 1 };
joy['params'] = { color: 1, led: 1, time: 1 };
sad['params'] = { color: 1, led: 1, time: 1 };
surprise['params'] = { color: 2, led: 1, time: 1 };

module.exports = {
    anger,
    joy,
    sad,
    surprise
}
