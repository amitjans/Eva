Array.prototype.unique = function (a) {
    return function () { return this.filter(a) }
}(function (a, b, c) {
    return c.indexOf(a, b + 1) < 0
});

module.exports = {
    Nombre: function (value) {
        if (value.includes(" ")) {
            var aux = value.trim().split(" ");
            for (let i = aux.length - 1; i >= 0; i--) {
                if (/(^[A-Za-z]{1,2}$|nombre|llamo|hola|Hola)/.test(aux[i])) {
                    aux.splice(i, 1);
                }
            }
            if (aux.length > 1) {
                let result = aux.filter(item => /^[A-Z]{1}/.test(item));
                if (result.length > 1) {
                    aux = result;
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
