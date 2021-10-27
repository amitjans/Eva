module.exports = {
    randomize: function (value) {
        value.sort(() => Math.random() - 0.5);
        for(let i = value.length - 1; i > 0; i--) {
            var j = generarNumeroRandom(0, i);
            [value[i], value[j]] = [value[j], value[i]];
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