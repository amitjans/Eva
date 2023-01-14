import { setCounter, getCounter } from '../VPL_ProcessVars.js';
import { generarNumeroRandom } from '../../utils/Random.js';

export const ProcessCounterNode = function ({ ops, count, value, first, second }) {
    let temp = getCounter();
    if (ops === 'ADD') {
        temp[count] = getValue(first, temp) + getValue(second, temp);
    } else if (ops === 'MINUS') {
        temp[count] = getValue(first, temp) - getValue(second, temp);
    } else if (ops === 'MULTIPLY') {
        temp[count] = getValue(first, temp) * getValue(second, temp);
    } else if (ops === 'DIVIDE') {
        temp[count] = getValue(first, temp) / getValue(second, temp);
    } else if (ops === 'POWER') {
        temp[count] = Math.pow(getValue(first, temp), getValue(second, temp));
    } else if (ops === 'assign'){
        temp[count] =  value;
    } else if (ops === 'random'){
        temp[count] =  generarNumeroRandom(parseInt(first), parseInt(second));
    }
    setCounter(temp);
}

const getValue = function (value, variables) {
    return /^[\d]+$/.test(value) ? parseInt(value) : parseInt(variables[value] || 0);
}