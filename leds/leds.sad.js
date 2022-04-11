const matrix = require("@matrix-io/matrix-lite");
const { anterior, siguiente, frente, modColor } = require('./leds.utils');

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

        if (anterior(lizq) == lder) {
            lizq = obj.led1;
            lder = anterior(obj.led1);
        }
        matrix.led.set(everloop);
    }, obj.time);
}

sad['params'] = { color: 1, led: 1, time: 1 };

module.exports = {
    sad
}
