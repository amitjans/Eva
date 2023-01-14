export const setRespuesta = function (value) { 
    if (!!global.respuesta) {
        global.respuesta.push(value);
    } else {
        global.respuesta = [value];
    };
};
export const getRespuesta = (value) => {
    if (!!value) {
        return (value < 0 ? global.respuesta[(respuesta.length - 1) + value] : global.respuesta[value - 1]);
    }
    return global.respuesta[respuesta.length - 1];
};
export const setSactual = (value) => { global.sactual = value; };
export const getSactual = () => global.sactual;
export const addlemotion = function (value) {
    if (!!global.lemotion) {
        global.lemotion.push(value);
    } else {
        global.lemotion = [value];
    }
};
export const getlemotion = () => global.lemotion || [];
export const setCounter = (value) => { global.counter = value; };
export const getCounter = () => counter;
export const setApi = function (key, value) { global.apidata[key] = value; };
export const getApi = (key) => global.apidata[key];
