var script = require('../server/controllers/script.controller');
var app = require('../app');
var random = require('../utils/Random');

module.exports = async function (item) {
    let temp = app.getScript();
    try {
        if (!temp[item.key + '']) {
            temp[item.key + ''] = await script.getData(item.sc + '');
            console.log('tamano del script = ' + temp[item.key + ''].length);
            if (item.random) {
                temp[item.key + ''] = random.randomize(temp[item.key + '']);
            }
        }
        app.setScript(temp);
    } catch (error) {
        console.error();
    }
}