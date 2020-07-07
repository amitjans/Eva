var nodeutils = require('./NodeUtils');
var app = require('../app');

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
                            let value1 = parseInt(token[i - 1].value);
                            let value2 = parseInt(token[i + 1].value);
                            if (token[i].value === 'equal') {
                                result = value1 == value2;
                            } else if (token[i].value === 'greater') {
                                result = value1 > value2;
                            } else if (token[i].value === 'less') {
                                result = value1 < value2;
                            } else if (token[i].value === 'greateror') {
                                result = value1 >= value2;
                            } else if (token[i].value === 'lessor') {
                                result = value1 <= value2;
                            } else if (token[i].value === 'notequal') {
                                result = value1 != value2;
                            }
                        }
                    }
                }
                if (result) {
                    return nodeutils.NextNode(links, ifnodes[c], nodes);
                }	
            } else if ((ifnodes[c].text || '') === '') {
                return nodeutils.NextNode(links, ifnodes[c], nodes);
            } else if (ifnodes[c].text.includes('%')) {
                if (Compare((/^(%|%2)$/.test(ifnodes[c].text) ? app.getSactual().campo2 : app.getSactual().campo1), respuesta[respuesta.length - 1]) >= ifnodes[c].opt) {
                    return nodeutils.NextNode(links, ifnodes[c], nodes);
                }
            } else if (Compare((ifnodes[c].text || ''), respuesta[respuesta.length - 1]) >= ifnodes[c].opt) {
                return nodeutils.NextNode(links, ifnodes[c], nodes);
            }
        }
    }
};

function CreateToken(param) {
    if (param.includes('#')) {
        return { type: 'num', value: parseInt(app.getCounter()[param.substring(1)])};
    } else if (param.includes('$')) {
        let resp = app.getRespuesta();
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

