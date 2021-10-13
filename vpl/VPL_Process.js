const crypto = require('crypto');
const { ProcessNode } = require('./VPL_Node');
const { NextNode } = require('./NodeUtils');
var { ConditionNode } = require('./Node');

var iscript = {};
global.sactual;

async function ProcessFlow(node, nodes) {
    do {
        if (node.type !== 'if') {
            if (node.type === 'for') {
                if (node.iteraciones <= -1) {
                    let ss = nodes.find(i => i.type === 'script');
                    iscript[ss.key] = ss.data;
                    node.iteraciones = iscript[ss.key].length;
                }
                for (let f = 0; f < node.iteraciones; f++) {
                    await ProcessFlow(await nodes.find(x => x.key == node.first), nodes);
                }
            } else if (node.type === 'script') {
                if (!iscript[node.key]) {
                    iscript[node.key] = node.data;
                }
                sactual = iscript[node.key + ''].shift();
                if (!node.remove) {
                    iscript[node.key + ''].push(sactual);
                }
                await ProcessNode({ key: crypto.createHash('md5').update(sactual.campo1).digest("hex"), type: "speak", text: sactual.campo1 });
            } else if (node.type === 'led' && node.anim !== 'stop') {
                let node_t = NextNode(node, nodes);
                if (!!node_t[0]) {
                    if (node_t[0].type === 'speak' || node_t[0].type === 'sound') {
                        node_t[0].anim = node.anim;
                        node = node_t[0];
                    }
                }
                await ProcessNode(node);
            } else {
                await ProcessNode(Object.assign({}, node));
            }
            node = NextNode(node, nodes);
        } else if (node.type === 'if') {
            node = NextNode({ next: ConditionNode(node) }, nodes)
        }
    } while (!!node);
}

module.exports.ProcessFlow = ProcessFlow;