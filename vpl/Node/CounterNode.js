var { setCounter, getCounter } = require('../VPL_ProcessVars');

module.exports = {
    ProcessCounterNode: function ({ ops, count, value }) {
        let temp = getCounter();
        if (ops === 'sum') {
            temp[count] = (temp[count] || 0) + parseInt(value);                
        } else if (ops === 'rest') {
            temp[count] = (temp[count] || 0) - parseInt(value);
        } else if (ops === 'mult') {
            temp[count] = (temp[count] || 0) * parseInt(value);
        } else if (ops === 'div') {
            temp[count] = (temp[count] || 0) / parseInt(value);
        } else if (ops === 'assign'){
            temp[count] = parseInt(value);
        }
        setCounter(temp);
    }
}