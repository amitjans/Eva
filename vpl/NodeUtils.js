export const FirstAndLast = function (nodes, links) {
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
};
export const NextNode = function (node, nodes) {
    return nodes.find(x => x.key == node.next);
};
export const FirstsNodes = function (link, fnodes) {
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