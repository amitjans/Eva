var { existsSync } = require('fs');
const crypto = require('../../utils/MD5');
var { getRespuesta, getSactual, getCounter, getApi } = require('../VPL_ProcessVars');
var { getOne, generarNumeroRandom } = require('../../utils/Random');
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
            item = item.includes('/') ? getOne(item.split('/')) : item;
        } else if (item.includes('#')) {
            if (/^#[\w\d]+$/.test(item)) {
                item = getCounter()[item.substring(1)];
            }
        } else if(/r[\d]+t[\d]+/.test(item)) {
            item = generarNumeroRandom(parseInt(item.split('t')[0].substring(1)), parseInt(item.split('t')[1]));
        }
        return item;
    }).join(' ');
    return { fulltext: fulltext, hash: crypto(fulltext), rec: rec };
}

async function RecAndSpeak(element) {
    try {
        let path = `./temp/${social.getConf().voice}/${element.key}.wav`;
        if (!existsSync(path)) {
            await social.speak(element.text, true, path);
        } else {
            await social.play(path);
        }
    } catch (err) {
        console.error(err)
    }
}

function replaceWhatWasHeard(value) {
    if (/\$-[\d]+/.test(value) || /\$[\d]+/.test(value)) {
        return getRespuesta(parseInt(value.substring(1)));
    } 
    return getRespuesta();
}