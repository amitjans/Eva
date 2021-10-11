var { existsSync } = require('fs');
const { createHash } = require('crypto');
var { getRespuesta, getSactual, getCounter, getApi } = require('../VPL_ProcessVars');
var { getOne } = require('../../utils/Random');
var { Translate } = require('../../server/services/translate');
var { Getdata } = require('./ApiNode');

module.exports = {
    ProcessSpeakNode: async function (element) {
        let { fulltext, hash, rec } = await ProcessSpeakText(element);
        if (!!social.getConf().translate && !existsSync('./temp/' + (social.getConf().voice + '_' + hash) + '.wav')) {
            fulltext = await Translate(fulltext, social.getConf().voice.substring(0, 5), social.getConf().sourcelang.substring(0, 2));
        }
        social.savelog(evaId, fulltext);
        if (rec) {
            await RecAndSpeak({ key: hash, type: "speak", text: fulltext });
        } else {
            await social.speak(fulltext, false);
        }
    }
};

async function ProcessSpeakText(element) {
    let text = element.text.includes('/') ? getOne(element.text.split('/')) : element.text;
    let rec = !(/[@$]+/.test(text));
    let fulltext = text.split(' ').map(item => {
        if (item.includes('*')) {
            if (item == '*name') {
                item = social.getConf().name;
            }
        }
        else if (item.includes('@')) {
            let pos = item.indexOf('.');
            item = Getdata(getApi(item.substring(1, pos).toLowerCase()), item.substring(pos + 1));
        } else if (item.includes('$')) {
            item = replaceWhatWasHeard(item);
        } else if (item.includes('%')) {
            item = getSactual()['campo' + (item.length == 1 ? '2' : item.substring(1))];
        } else if (item.includes('#')) {
            if (/^#[\w\d]+$/.test(item)) {
                item = getCounter()[item.substring(1)];
            }
        }
        return item;
    }).join(' ');
    return { fulltext: fulltext, hash: createHash('md5').update(fulltext).digest("hex"), rec: rec };
}

async function RecAndSpeak(element) {
    try {
        if (!existsSync('./temp/' + (social.getConf().voice + '_' + element.key) + '.wav')) {
            await social.speak(element.text, true, (social.getConf().voice + '_' + element.key));
        } else {
            await social.play('./temp/' + (social.getConf().voice + '_' + element.key) + '.wav');
        }
    } catch (err) {
        console.error(err)
    }
}

function replaceWhatWasHeard(value) {
    let respuesta = getRespuesta();
    if (/\$-[\d]+/.test(value)) {
        value = respuesta[(respuesta.length - 1) - parseInt(value.substring(2))];
    } else if (/\$[\d]+/.test(value)) {
        value = respuesta[parseInt(value.substring(1)) - 1];
    } else {
        value = value.replace('$', respuesta[respuesta.length - 1]);
    }
    return value;
}