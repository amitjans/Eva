require('fs').readdirSync(__dirname + '/').forEach(function (file) {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
        Object.assign(module.exports, require('./' + file));
    }
});