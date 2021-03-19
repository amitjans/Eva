var { NextNode } = require('./NodeUtils');
var { getCounter, getSactual, getRespuesta } = require('./VPL_ProcessVars');
var Compare = require('../utils/Compare');

module.exports = {
    ConditionNode: function (ifnodes, links, nodes) {
        for (let c = 0; c < ifnodes.length; c++) {
            if (ifnodes[c].opt == '5') {
                let param = ifnodes[c].text.split(' ');
                let token = [];
                for (let i = 0; i < param.length; i++) {
                    token.push(CreateToken(param[i]));
                }
                let result = false;
                for (let i = 0; i < token.length; i++) {
                    if (token[i].type === 'opr' && i > 0 && (i + 1 < token.length)) {
                        if (/^[\d]+$/.test(token[i - 1].value) && /^[\d]+$/.test(token[i + 1].value)) {
                            result = MathComparison(token, i);
                        }
                    }
                }
                if (result) {
                    return NextNode(links, ifnodes[c], nodes);
                }	
            } else if ((ifnodes[c].text || '') === '') {
                return NextNode(links, ifnodes[c], nodes);
            } else if (ifnodes[c].text.includes('%')) {
                if (Compare(getSactual()['campo' + (temp[i].length == 1 ? '2' : temp[i].substring(1))], getRespuesta(true)) >= ifnodes[c].opt) {
                    return NextNode(links, ifnodes[c], nodes);
                }
            } else if (ifnodes[c].text.includes('/')) {
                let sub = ifnodes[c].text.split('/');
                for (let i = 0; i < sub.length; i++) {
                    if (Compare(sub[i], getRespuesta(true)) >= ifnodes[c].opt) {
                        return NextNode(links, ifnodes[c], nodes);
                    }                    
                }
            } else if (Compare((ifnodes[c].text || ''), getRespuesta(true)) >= ifnodes[c].opt) {
                return NextNode(links, ifnodes[c], nodes);
            }
        }
        return [];
    }
};

function CreateToken(param) {
    if (param.includes('#')) {
        return { type: 'num', value: parseInt(getCounter()[param.substring(1)])};
    } else if (param.includes('$')) {
        let resp = getRespuesta();
        for (let i = resp.length - 1; 0 <= i; i--) {
            if (/^[\d]+$/.test(resp[i])) {
                return { type: 'num', value: parseInt(resp[i])};
            } 
        }
    } else if (/^[\d]+$/.test(param)) {
        return { type: 'num', value: parseInt(param)};
    } else if (/^[=<>]+$/.test(param)) {
        let auxopr = { type: 'opr', value: param};
        if (/^[=]+$/.test(auxopr.value)) {
            auxopr.value = 'equal';
        } else if (/^[>]+$/.test(auxopr.value)) {
            auxopr.value = 'greater';
        } else if (/^[<]+$/.test(auxopr.value)) {
            auxopr.value = 'less';
        } else if (/^[>=]+$/.test(auxopr.value)) {
            auxopr.value = 'greateror';
        } else if (/^[<=]+$/.test(auxopr.value)) {
            auxopr.value = 'lessor';
        }
        return auxopr;
    }
}

function MathComparison(token, pos) {
    let value1 = parseInt(token[pos - 1].value);
    let value2 = parseInt(token[pos + 1].value);
    if (token[pos].value === 'equal') {
        return value1 == value2;
    } else if (token[pos].value === 'greater') {
        return value1 > value2;
    } else if (token[pos].value === 'less') {
        return value1 < value2;
    } else if (token[pos].value === 'greateror') {
        return value1 >= value2;
    } else if (token[pos].value === 'lessor') {
        return value1 <= value2;
    } else if (token[pos].value === 'notequal') {
        return value1 != value2;
    }
}

