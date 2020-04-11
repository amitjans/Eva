module.exports = {
    randomize: function (value) {
        var idx = value.length;
        while (idx > 1) {
            idx = idx - 1;
            var sel = generarNumeroRandom(0, idx);
            var temp = value[sel];
            value[sel] = value[idx];
            value[idx] = temp;
        }
        return value;
    },
    getOne: function (value) {
        return value[generarNumeroRandom(0, value.length - 1)];
    }
};

var generarNumeroRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.generarNumeroRandom = generarNumeroRandom;