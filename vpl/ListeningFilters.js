Array.prototype.unique = function (a) {
    return function () { return this.filter(a) }
}(function (a, b, c) {
    return c.indexOf(a, b + 1) < 0
});

module.exports = {
    Nombre: function (value) {
        if (value.includes(" ")) {
            //return nombre.split(" ").pop();
            var aux = value.split(" ");
            for (let i = aux.length - 1; i >= 0; i--) {
                if (/(^[A-Za-z]{1,2}$|nombre|llamo|hola|Hola)/.test(aux[i])) {
                    aux.splice(i, 1);
                }
            }
            if (aux.length > 1) {
                for (let i = aux.length - 1; i >= 0; i--) {
                    if (aux[i][0] !== aux[i][0].toUpperCase()) {
                        aux.splice(i, 1);
                    }
                }
            }
            return [aux.unique().join(' ')];
        } else {
            return [value];
        }
    },
    Numero: function (value) {
        let result = [];
        value.split(' ').forEach(element => {
            if (/^[\d]+$/.test(element)) {
                result.push(element);
            }
        });
        return result;
    }
};
