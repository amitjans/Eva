var { existsSync } = require('fs');
const { createHash } = require('crypto');
var { getRespuesta, getSactual, getCounter, getApi } = require('../VPL_ProcessVars');
var { getOne } = require('../../utils/Random');

module.exports = {
    ProcessSpeakNode: async function (element) {
        let { fulltext, hash } = ProcessSpeakText(element);
        if (!!social.getConf().translate && !existsSync('./temp/' + (social.getConf().voice + '_' + hash) + '.wav')) {
            fulltext = await social.translate(fulltext, social.getConf().voice.substring(0, 5), social.getConf().sourcelang.substring(0, 2));
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
    let t = element.text;
    if (t.includes('/')) {
        t = getOne(t.split('/'));
        element.key = createHash('md5').update(t).digest("hex");
        element.text = t;
    }
    let rec = true;
    let temp = element.text.split(' ');
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].includes('*')) {
            if (temp[i] == '*name') {
                temp[i] = social.getConf().name;
            }
        }
        else if (temp[i].includes('@')) {
            let pos = temp[i].indexOf('.');
            temp[i] = Getdata(getApi(temp[i].substring(1, pos).toLowerCase()), temp[i].substring(pos + 1));
        } else if (temp[i].includes('$')) {
            rec = false;
            temp[i] = replaceWhatWasHeard(temp[i]);
        } else if (temp[i].includes('%')) {
            temp[i] = getSactual()['campo' + (temp[i].length == 1 ? '2' : temp[i].substring(1))];
        } else if (temp[i].includes('#')) {
            if (/^#[\w\d]+$/.test(temp[i])) {
                temp[i] = getCounter()[temp[i].substring(1)];
            }
        }
    }

    let fulltext = temp.join(' ');
    return { fulltext, hash: crypto.createHash('md5').update(fulltext).digest("hex") }
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