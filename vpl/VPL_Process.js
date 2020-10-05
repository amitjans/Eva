const crypto = require('crypto');
const vpl = require('./VPL_Node');
const ifnode = require('./If_Node');
var nodeutils = require('./NodeUtils');
const LoadScriptData = require('./Script_Node');

module.exports = {
    ProcessFlow: async function (social, evaId, usuarioId, nodes, links, fnodes, ini) {
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
                        await ProcessFlow(nodes, links, fnodes, nodeutils.FirstsOfGroup(fnodes, aux[0].key));
                    }
                } else if (aux[0].type === 'script') {
                    await LoadScriptData(aux[0]);
                    sactual = s[aux[0].key + ''].shift();
                    await vpl.ProcessNode(social, evaId, usuarioId, { key: crypto.createHash('md5').update(sactual.campo1).digest("hex"), type: "speak", text: sactual.campo1 });
                } else if (aux[0].type === 'led' && aux[0].anim !== 'stop') {
                    let aux_t = nodeutils.NextNode(links, aux[0], nodes);
                    if (!!aux_t[0]) {
                        if (aux_t[0].type === 'speak' || aux_t[0].type === 'sound') {
                            aux_t[0].anim = aux[0].anim;
                            aux[0] = aux_t[0];
                        }
                    }
                    await vpl.ProcessNode(social, evaId, usuarioId, aux[0]);
                } else {
                    await vpl.ProcessNode(social, evaId, usuarioId, Object.assign({}, aux[0]));
                }
                aux = nodeutils.NextNode(links, aux[0], nodes);
            } else if (aux.length > 1 && aux[0].type === 'if') {
                aux = ifnode.ConditionNode(aux, links, nodes);
            }
            n = aux.length > 0;
        } while (n);
    }
}