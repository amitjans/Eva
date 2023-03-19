const matrix = require("@matrix-io/matrix-lite");

const runAnim = (anim) => {
    let obj = JSON.parse(JSON.stringify(anim));
    let i = 0;
    let loop = setInterval(() => {
        matrix.led.set(obj.frames[i] ?? new Array(matrix.led.length).fill("#000000"));
        i++;
        if ((!obj.bucle || (obj.bucle && obj.loops == 1)) && i >= obj.frames.length) {
            clearInterval(loop);
        }
        if (obj.frames.length <= i) {
            i = obj.skip || 0;
            if (!!obj.rotate) {
                moveAllLedsOfAnim(obj, true);
            }
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

function arrayRotate(arr, reverse) {
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
}

function moveAllLedsOfAnim(arr, dir) {
    for (let i = 0; i < arr.frames.length; i++) {
        arr.frames[i] = arrayRotate(arr.frames[i], dir);
    }
}

module.exports = {
    runAnim, stop
}
