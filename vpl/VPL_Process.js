const crypto = require('../utils/MD5');
const { ProcessNode } = require('./VPL_Node');
const { NextNode } = require('./NodeUtils');
var { ConditionNode } = require('./Node');
var { generarNumeroRandom } = require('../utils/Random');

var iscript = {};
var currentKey = "";
global.sactual;

async function ProcessFlow(node, nodes) {
    do {
        if (node.type === 'for') {
            if (!!node.min && !!node.max) {
                node.iteraciones = generarNumeroRandom(parseInt(node.min), parseInt(node.max));
            } else if (node.iteraciones <= -1) {
                let ss = nodes.find(i => i.type === 'script');
                currentKey = ss.key;
                iscript[currentKey] = ss.data;
                if (!ss.remove) {
                    node.infinity = true;
                } else {
                    node.iteraciones = iscript[currentKey].length;
                }
            }
            for (let f = 0; (!!node.infinity ? iscript[currentKey].length > 0 : f < node.iteraciones); f++) {
                await ProcessFlow(await nodes.find(x => x.key == node.first), nodes);
            }
        } else if (node.type === 'script') {
            if (!iscript[node.key]) {
                iscript[node.key] = node.data;
            }
            sactual = iscript[node.key].shift();
            if (!node.remove) {
                iscript[node.key].push(sactual);
            }
            if(node.read) {
                await ProcessNode({ key: crypto(sactual.campo1), type: "speak", text: sactual.campo1 });
            }
        } else if (node.type === 'dsci') {
            iscript[currentKey].pop();
        } else if (node.type === 'led' && node.anim !== 'stop') {
            let node_t = NextNode(node, nodes);
            if (!!node_t[0]) {
                if (node_t[0].type === 'speak' || node_t[0].type === 'sound') {
                    node_t[0].anim = node.anim;
                    node = node_t[0];
                }
            }
            await ProcessNode(node);
        } else if (node.type === 'if') {
            let tempId = ConditionNode(JSON.parse(JSON.stringify(node)));
            if (!!tempId) {
                await ProcessFlow(NextNode({ next: tempId }, nodes), nodes);
            }
        } else {
            await ProcessNode(Object.assign({}, node));
        }
        node = NextNode(node, nodes);
    } while (!!node);
}

module.exports.ProcessFlow = ProcessFlow;