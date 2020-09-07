var nodeutils = require('./NodeUtils');
const interaccion = require('../server/controllers/interaccion.controller');

async function unifyById(value) {
    const temp = await interaccion.getThis(value);
    let clone = JSON.parse(JSON.stringify(temp.data));
    return await unify(clone.node, clone.link);
}

async function unifyByInt(value) {
    let clone = JSON.parse(JSON.stringify(value.data));
    return await unify(clone.node, clone.link);
}

async function unify(nodes, links) {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].type === 'int') {
            let sub = await interaccion.getThis(nodes[i].int);
            let jn = sub.data.node;
            let jl = sub.data.link;
            if (!!nodes[i].group) {
                for (let k = 0; k < jn.length; k++) {
                    jn[k].group = nodes[i].group;
                }
            }
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
            Array.prototype.push.apply(nodes, jn);
            Array.prototype.push.apply(links, jl);
        }
    }
    return { node: nodes, link: links };
}

module.exports = {
    unifyById,
    unifyByInt,
    unify
};