export const randomize = function (value) {
    value.sort(() => Math.random() - 0.5);
    for (let i = value.length - 1; i > 0; i--) {
        var j = generarNumeroRandom(0, i);
        [value[i], value[j]] = [value[j], value[i]];
    }
    return value;
};
export const getOne = function (value) {
    return value[generarNumeroRandom(0, value.length - 1)];
};
export const generarNumeroRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}