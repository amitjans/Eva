const http = require('http');
const https = require('https');

module.exports = {
    Api: async function (host, path, port = '') {
        var version = host.includes('https') ? https : http;
        return new Promise(function (resolve, reject) {
            let url = host + ((!!port || port == 0) ? '' : ':' + port) + '/' + path;
            version.get(url, function (res) {
                var data = '';
                res.on('data', function(chunk) {
                    data += chunk;
                });
                res.on('end', function() {
                    return resolve(JSON.parse(data));
                })
            }).end();
        });
    },
    Getdata: function(response, filter) {
        let params = filter.split('.');
        let result = '';
        for (let i = 0; i < params.length; i++) {
            result = response[params[i]];
            if (!!!result) {
                return '';
            }
        }
        return result;
    }
};

