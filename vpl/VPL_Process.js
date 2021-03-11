const crypto = require('crypto');
const { ProcessNode } = require('./VPL_Node');
const { ConditionNode } = require('./If_Node');
const { FirstsOfGroup, NextNode } = require('./NodeUtils');
const LoadScriptData = require('./Script_Node');

async function ProcessFlow(evaId, usuarioId, nodes, links, fnodes, ini) {
    let aux = [fnodes[ini]];
    let n = true;
    do {
        if (aux.length == 1 || aux[0].type !== 'if') {
            if (aux[0].type === 'for') {
                if (aux[0].iteraciones <= -1) {
                    let ss = nodes.filter(i => i.group === aux[0].key && i.type === 'script')[0];
                    await LoadScriptData(ss);
                    aux[0].iteraciones = s[ss.key + ''].length;
                }
                for (let f = 0; f < aux[0].iteraciones; f++) {
                    await ProcessFlow(evaId, usuarioId, nodes, links, fnodes, FirstsOfGroup(fnodes, aux[0].key));
                }
            } else if (aux[0].type === 'script') {
                await LoadScriptData(aux[0]);
                sactual = s[aux[0].key + ''].shift();
                await ProcessNode(evaId, usuarioId, { key: crypto.createHash('md5').update(sactual.campo1).digest("hex"), type: "speak", text: sactual.campo1 });
            } else if (aux[0].type === 'led' && aux[0].anim !== 'stop') {
                let aux_t = NextNode(links, aux[0], nodes);
                if (!!aux_t[0]) {
                    if (aux_t[0].type === 'speak' || aux_t[0].type === 'sound') {
                        aux_t[0].anim = aux[0].anim;
                        aux[0] = aux_t[0];
                    }
                }
                await ProcessNode(evaId, usuarioId, aux[0]);
            } else {
                await ProcessNode(evaId, usuarioId, Object.assign({}, aux[0]));
            }
            aux = NextNode(links, aux[0], nodes);
        } else if (aux.length > 1 && aux[0].type === 'if') {
            aux = ConditionNode(aux, links, nodes);
        }
        n = aux.length > 0;
    } while (n);
}

module.exports.ProcessFlow = ProcessFlow;