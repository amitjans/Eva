var fs = require('fs');
var nodeutils = require('./NodeUtils');
const interaccion = require('../server/controllers/interaccion.controller');

module.exports = {
    unify: async function (nodes, links) {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].type === 'int') {
                if (nodes[i].int.length > 1) {
                    let sub = await interaccion.getThis(nodes[i].int);
                    let jn = sub.data.node;
                    if (!!nodes[i].group) {
                        for (let k = 0; k < jn.length; k++) {
                            jn[k].group = nodes[i].group;
                        }
                    }
                    let jl = sub.data.link;
                    let aux = nodeutils.FirstAndLast(jn.slice(), jl.slice());
                    for (let j = 0; j < links.length; j++) {
                        if (links[j].to === nodes[i].key) {
                            links[j].to = aux.ini[0].key;
                            for (let k = 1; k < aux.ini.length; k++) {
                                links.push({ from: links[j].from, to: aux.ini[k].key });
                            }
                        } else if (links[j].from === nodes[i].key) {
                            links[j].from = aux.end[0].key;
                            for (let l = 1; l < aux.end.length; l++) {
                                links.push({ from: aux.end[l].key, to: links[j].to });
                            }
                        }
                    }
                    nodes.splice(i, 1);
                    i = -1;
                    nodes = nodes.concat(jn);
                    links = links.concat(jl);
                }
            }
        }
        return { nodes: nodes, links: links };
    }
};