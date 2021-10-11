var script = require('../../server/controllers/script.controller');
var { randomize } = require('../../utils/Random');

const LoadScriptData = async function (item) {
    try {
        let data = Array.isArray(item.data) ? item.data : await script.getData(item.sc.toString());
        if (item.random) {
            data = randomize(data);
        }
        if (/[\d]+/.test(item.unique)) {
            data = uniqueBy(data, `campo${item.unique}`);
        }
        if (/[\d]+/.test(item.order)) {
            data.sort((a, b) => a[`campo${item.order}`].localeCompare(b[`campo${item.order}`]));
        }
        return data;
    } catch (error) {
        console.error();
    }
}

function uniqueBy(array, prop) {
    let result = [];
    let map = new Map();
    for (let item of array) {
        if (!map.has(item[prop])) {
            map.set(item[prop], true);
            result.push(item);
        }
    }
    return result;
}

module.exports = {
    LoadScriptData
}