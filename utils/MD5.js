const crypto = require('crypto')

module.exports = function (value, algorithm = 'md5') {
    return crypto.createHash(algorithm).update(value).digest("hex");
}