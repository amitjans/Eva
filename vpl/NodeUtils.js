module.exports = {
    FirstAndLast: function (nodes, links) {
        let result = { ini: [], end: [] };
        for (let i = 0; i < nodes.length; i++) {
            if (!!nodes[i].group) {
                continue;
            }
            if (FromSomeone(nodes[i], links) && ToSomeone(nodes[i], links)) {
                nodes.splice(i, 1);
                i--;
            } else if (FromSomeone(nodes[i], links) && !ToSomeone(nodes[i], links)) {
                result.end.push(nodes[i]);
            } else {
                result.ini.push(nodes[i]);
            }
        }
        return result;
    },
    NextNode: function (links, node, nodes) {
        let n = [];
        for (let i = 0; i < links.length; i++) {
            if (links[i].from == node.key) {
                for (let j = 0; j < nodes.length; j++) {
                    if (links[i].to == nodes[j].key) {
                        n.push(nodes[j]);
                    }
                }
            }
        }
        return n;
    },
    FirstsNodes: function (link, fnodes) {
        for (let i = 0; i < fnodes.length; i++) {
            for (const iterator of link) {
                if (fnodes[i].key == iterator.to) {
                    fnodes.splice(i, 1);
                    i--;
                    break;
                }
            }
        }
        if (fnodes.length > 1) {
            for (let j = 0; j < fnodes.length; j++) {
                if (!fnodes[j].group) {
                    fnodes.unshift(fnodes.splice(j, 1)[0]);
                    break;
                }
            }
        }
        return fnodes;
    },
    FirstsOfGroup: function (fnodes, key) {
        for (let i = 0; i < fnodes.length; i++) {
            if (fnodes[i].group == key) {
                return i;
            }
        }
    },
    includeAnswers: function (value, respuesta) {
        for (let i = 0; i < value.length; i++) {
            if (/\$-[\d]+/.test(value[i])) {
                value[i] = respuesta[(respuesta.length - 1) - parseInt(value[i].substring(2))];
            } else if (/\$[\d]+/.test(value[i])) {
                value[i] = respuesta[parseInt(value[i].substring(1)) - 1];
            } else if (value[i] === '$') {
                value[i] = respuesta[respuesta.length - 1];
            }
        }
        return value.join(" ");
    }
};

function FromSomeone(node, links) {
    for (const iterator of links) {
        if (node.key == iterator.to) {
            return true;
        }
    }
    return false;
}

function ToSomeone(node, links) {
    for (const iterator of links) {
        if (node.key == iterator.from) {
            return true;
        }
    }
    return false;
}