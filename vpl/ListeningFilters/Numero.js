module.exports = {
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
