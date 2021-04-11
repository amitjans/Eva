// const { escuchaC, escuchaT, stop } = require('./leds.speakAndListen');
// const { anger, joy, sad } = require('./leds.emotions');

// module.exports = {
//     escuchaC,
//     escuchaT,
//     anger,
//     joy,
//     sad,
//     stop
// }

require('fs').readdirSync(__dirname + '/').forEach(function (file) {
    if (file.match(/\.js$/) !== null && file !== 'index.js' && file !== 'leds.utils.js') {
        Object.assign(module.exports, require('./' + file));
    }
});