var script = require('../../server/controllers/script.controller');
var { randomize } = require('../../utils/Random');

module.exports = {
    LoadScriptData: async function (item) {
        try {
            let data = Array.isArray(item.data) ? item.data : await script.getData(item.sc.toString());
            if (item.random) {
                data = randomize(data);
            }
            return { key: item.key.toString(), data: data };
        } catch (error) {
            console.error();
        }
    }
}