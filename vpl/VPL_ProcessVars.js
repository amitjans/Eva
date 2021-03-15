module.exports = {
    setRespuesta: function (value) { 
        if (!!global.respuesta) {
            global.respuesta.push(value)
        } else {
            global.respuesta = [value]
        };
    },
    getRespuesta: (last = false) => last ? global.respuesta[respuesta.length - 1] : global.respuesta,
    setSactual: (value) => { global.sactual = value; },
    getSactual: () => global.sactual,
    addlemotion: function (value) {
        if (!!global.lemotion) {
            global.lemotion.push(value);
        } else {
            global.lemotion = [value];
        };
    },
    getlemotion: () => global.lemotion,
    setCounter: (value) => { global.counter = value; },
    getCounter: () => counter,
    setApi: function (key, value) { global.apidata[key] = value; },
    getApi: (key) => global.apidata[key]
}
