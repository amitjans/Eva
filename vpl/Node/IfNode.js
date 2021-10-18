var { getCounter, getSactual, getRespuesta } = require('../VPL_ProcessVars');
var PhoneticSpanish = require('../../utils/PhoneticSpanish');

module.exports = {
    ConditionNode: function (node) {
        for (let i = 0; i < node.condition.length; i++) {
            const element = node.condition[i];
            if (!element.A && !element.B) {
                return element.next;
            } else if (/^[\d]+$/.test(element.A) && /^[\d]+$/.test(element.B)) {
                if (NumericComparison(element)) {
                    return element.next;
                }
            } else {
                let tempA = element.A.split('/');
                let tempB = element.B.split('/');
                for (let A of tempA) {
                    for (let B of tempB) {
                        element.A = CreateToken(A).trim();
                        element.B = CreateToken(B).trim();
                        if (StringComparison(element)) {
                            return element.next || '';
                        }
                    }
                }
            }
        }
    }
};

function CreateToken(param) {
    if (param.includes('#')) {
        return getCounter()[param.substring(1)];
    } else if (param == '$'){
        return getRespuesta(true);
    } else if (/\$[\d]+/.test(param)) {
        return getRespuesta()[parseInt(param.substring(1))];
    } else if (/\$-[\d]+/.test(param)) {
        return getRespuesta()[(getRespuesta().length - 1) - parseInt(param.substring(2))];
    } else if (param.includes('%')) {
        return getSactual()['campo' + param.substring(1)];
    }
    return param;
}

function NumericComparison({ A, B, OP }) {
    let value1 = parseInt(A);
    let value2 = parseInt(B);
    if (OP === 'EQ') {
        return value1 == value2;
    } else if (OP === 'NEQ') {
        return value1 != value2;
    } else if (OP === 'LT') {
        return value1 < value2;
    } else if (OP === 'LTE') {
        return value1 <= value2;
    } else if (OP === 'GT') {
        return value1 > value2;
    } else if (OP === 'GTE') {
        return value1 >= value2;
    }
}

function StringComparison({ A, B, OP }) {
    let value = A.localeCompare(B, undefined, { sensitivity: 'base' });
    if (OP === 'EQ') {
        return value == 0 || PhoneticSpanish(A) == PhoneticSpanish(B);
    } else if (OP === 'NEQ') {
        return value != 0;
    } else if (OP === 'LT') {
        return value < 0;
    } else if (OP === 'LTE') {
        return value <= 0;
    } else if (OP === 'GT') {
        return value > 0;
    } else if (OP === 'GTE') {
        return value >= 0;
    }
}

