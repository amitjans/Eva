const matrix = require("@matrix-io/matrix-lite");

const runAnim = (obj) => {
    let i = 0;
    let loop = setInterval(() => {
        matrix.led.set(obj.frames[i] ?? new Array(matrix.led.length).fill("#000000"));
        i++;
        if ((!obj.bucle || (obj.bucle && obj.loops == 1)) && i >= obj.frames.length) {
            clearInterval(loop);
        }
        if (obj.frames.length <= i) {
            i = obj.skip || 0;
        }
    }, obj.time);
    return loop;
}

const frame = (obj) => {
    everloop = obj.frame;
    matrix.led.set(everloop);
}

const stop = () => {
    everloop = new Array(matrix.led.length).fill("#000000");
    matrix.led.set(everloop);
}

module.exports = {
    runAnim, stop
}
