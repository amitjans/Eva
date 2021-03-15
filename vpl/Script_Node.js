var script = require('../server/controllers/script.controller');
var random = require('../utils/Random');

module.exports = async function (item) {
    try {
        let data = await script.getData(item.sc.toString());
        if (item.random) {
            data = random.randomize(data);
        }
        return { key: item.key.toString(), data: data };
    } catch (error) {
        console.error();
    }
}