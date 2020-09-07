module.exports = {
    FirstAndLast: function (nodes, links) {
        let result = { ini: [], end: [] };
        for (let i = 0; i < nodes.length; i++) {
            if (!nodes[i].group) {
                let from = FromSomeone(nodes[i], links);
                let to = ToSomeone(nodes[i], links);
                if (from && to) {
                    continue;
                } else if (from) {
                    result.end.push(nodes[i]);
                } else {
                    result.ini.push(nodes[i]);
                }
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
        return fnodes.sort(function(a, b){return !!a.group ? 1 : -1 });
    },
    FirstsOfGroup: function (fnodes, key) {
        for (let i = 0; i < fnodes.length; i++) {
            if (fnodes[i].group == key) {
                return i;
            }
        }
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