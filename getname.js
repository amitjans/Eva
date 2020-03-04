module.exports = {
    ProcesarNombre: function (nombre){
        if (nombre.includes(" ")) {
            //return nombre.split(" ").pop();
            var aux = nombre.split(" ");
            for (let i = aux.length - 1; i >= 0 ; i--) {
                if (aux[i].length < 3  || aux[i] === "nombre" || aux[i] === "llamo") {
                    aux.splice(i, 1);
                }
            }
            if (aux.length > 1) {
                for (let i = aux.length - 1; i >= 0 ; i--) {
                    if (aux[i][0] !== aux[i][0].toUpperCase()) {
                        aux.splice(i, 1);
                    }                
                }
            }
            return aux.join(' ');
        } else {
            return nombre;
        }
    }
};