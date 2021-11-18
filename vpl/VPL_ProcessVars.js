module.exports = {
    setRespuesta: function (value) { 
        if (!!global.respuesta) {
            global.respuesta.push(value);
        } else {
            global.respuesta = [value];
        };
    },
    getRespuesta: (value) => {
        if (!!value) {
            return (value < 0 ? global.respuesta[(respuesta.length - 1) + value] : global.respuesta[value - 1]);
        }
        return global.respuesta[respuesta.length - 1];
    },
    setSactual: (value) => { global.sactual = value; },
    getSactual: () => global.sactual,
    addlemotion: function (value) {
        if (!!global.lemotion) {
            global.lemotion.push(value);
        } else {
            global.lemotion = [value];
        }
    },
    getlemotion: () => global.lemotion || [],
    setCounter: (value) => { global.counter = value; },
    getCounter: () => counter,
    setApi: function (key, value) { global.apidata[key] = value; },
    getApi: (key) => global.apidata[key]
}
