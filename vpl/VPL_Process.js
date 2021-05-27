const crypto = require('crypto');
const { ProcessNode } = require('./VPL_Node');
const { ConditionNode } = require('./If_Node');
const { NextNode } = require('./NodeUtils');
const LoadScriptData = require('./Script_Node');

var iscript = {};
global.sactual;

async function ProcessFlow(nodes, links, fnodes, ini) {
    let aux = [ini];
    do {
        if (aux.length == 1 || aux[0].type !== 'if') {
            if (aux[0].type === 'for') {
                if (aux[0].iteraciones <= -1) {
                    let ss = nodes.find(i => i.group === aux[0].key && i.type === 'script');
                    let { key, data } = await LoadScriptData(ss);
                    iscript[key] = data;
                    aux[0].iteraciones = iscript[ss.key.toString()].length;
                }
                for (let f = 0; f < aux[0].iteraciones; f++) {
                    await ProcessFlow(nodes, links, fnodes, fnodes.find(x => x.group == aux[0].key));
                }
            } else if (aux[0].type === 'script') {
                await LoadScriptData(aux[0]);
                sactual = iscript[aux[0].key + ''].shift();
                await ProcessNode({ key: crypto.createHash('md5').update(sactual.campo1).digest("hex"), type: "speak", text: sactual.campo1 });
            } else if (aux[0].type === 'led' && aux[0].anim !== 'stop') {
                let aux_t = NextNode(links, aux[0], nodes);
                if (!!aux_t[0]) {
                    if (aux_t[0].type === 'speak' || aux_t[0].type === 'sound') {
                        aux_t[0].anim = aux[0].anim;
                        aux[0] = aux_t[0];
                    }
                }
                await ProcessNode(aux[0]);
            } else {
                await ProcessNode(Object.assign({}, aux[0]));
            }
            aux = NextNode(links, aux[0], nodes);
        } else if (aux.length > 1 && aux[0].type === 'if') {
            aux = ConditionNode(aux, links, nodes);
        }
    } while (aux.length > 0);
}

module.exports.ProcessFlow = ProcessFlow;