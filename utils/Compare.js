var PhoneticSpanish = require('./PhoneticSpanish');

module.exports = function (word1, word2) {
    if (word1 === word2) {
        return 5;
    } else if (word1.toLowerCase() === word2.toLowerCase()) {
        return 4;
    } else if (PhoneticSpanish(word1) === PhoneticSpanish(word2)) {
        return 3;
    } else if (word2.includes(word1) || PhoneticSpanish(word2).includes(PhoneticSpanish(word1))) {
        return 2;
    } else if (word1.includes(word2) || PhoneticSpanish(word1).includes(PhoneticSpanish(word2))) {
        return 1;
    }
    return 0;
}