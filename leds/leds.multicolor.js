const matrix = require("@matrix-io/matrix-lite");
const { siguiente, rgbToHex } = require('./leds.utils');

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

const processing = (obj) => {
    let ledguide = 0;
    let everloop = new Array(matrix.led.length).fill('#000000');
    return setInterval(() => {
        everloop = new Array(matrix.led.length).fill(obj.color1);
        for (let i = 0; i < obj.led1; i++) {
            everloop[siguiente(ledguide + (i - 1))] = obj.color2;
        }
        ledguide = siguiente(ledguide);
        matrix.led.set(everloop);
    }, obj.time);
}

const moving_dots = (obj) => {
    let counter = 0;
    let everloop = new Array(matrix.led.length).fill('#000000');
    return setInterval(() => {
        everloop = new Array(matrix.led.length).fill('#000000');
        everloop[(counter / 2) % matrix.led.length] = obj.color1;
        everloop[(counter / 2) % matrix.led.length] = obj.color2;
        everloop[(counter / 4) % matrix.led.length] = obj.color3;
        everloop[(counter / 6) % matrix.led.length] = obj.color4;
        everloop[matrix.led.length - 1 - (counter % matrix.led.length)] = obj.color5;
        matrix.led.set(everloop);
        counter++;
    }, obj.time);
}

const rainbow = (obj) => {
    let counter = 0;
    let freq = 0.375;
    let everloop = new Array(matrix.led.length).fill('#000000');
    return setInterval(() => {
        for (let i = 0; i < 18; i++) {
            let temp = {
                r: Math.round(Math.max(0, (Math.sin(freq * counter + (Math.PI / 180 * 240)) * 155 + 100) / 10)),
                g: Math.round(Math.max(0, (Math.sin(freq * counter + (Math.PI / 180 * 120)) * 155 + 100) / 10)),
                b: Math.round(Math.max(0, (Math.sin(freq * counter) * 155 + 100) / 10))
            };
            everloop[i] = rgbToHex(temp);
            counter = counter + 1.01;
        }
        matrix.led.set(everloop);
    }, obj.time);
}

rgb_fan_inspired['params'] = { color: 3, led: 0, time: 1 };
processing['params'] = { color: 2, led: 1, time: 1 };
moving_dots['params'] = { color: 5, led: 0, time: 1 };
rainbow['params'] = { color: 0, led: 0, time: 1 };

module.exports = {
    rgb_fan_inspired,
    processing,
    moving_dots,
    rainbow
}
