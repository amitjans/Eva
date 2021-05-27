module.exports = {
    FirstAndLast: function (nodes, links) {
        let result = { ini: [], end: [] };
        for (let i = 0; i < nodes.length; i++) {
            if (!nodes[i].group) {
                let from = !!links.find(x => x.to == nodes[i].key);
                let to = !!links.find(x => x.from == nodes[i].key);
                if (from && !to) {
                    result.end.push(nodes[i]);
                } else if (!from && to) {
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
                n.push(nodes.find(x => x.key == links[i].to));
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
    }
};