var fs = require('fs');
const crypto = require('crypto');

var led = require('../server/controllers/leds.controller');
var random = require('../utils/Random');

const api = require('./Api_Node');
var { ProcessListenNode, ProcessCounterNode, SendMessage, SendMedia, Login, ProcessEmotionNode } = require('./Node');
var { getRespuesta, getSactual, getlemotion, getCounter, setApi, getApi } = require('./VPL_ProcessVars');

module.exports = {
    ProcessNode: async function (element) {
        if (element.type === 'voice') {
            social.setConf({ name: element.robotname, voice: element.voice, translate: element.translate, sourcelang: element.sourcelang, ttsReconnect: true });
        } else if (element.type === 'emotion') {
            ProcessEmotionNode(element, getlemotion());
        } else if (element.type === 'speak') {
            social.ledsanimstop();
            await ProcessSpeakNode(element);
        } else if (element.type === 'listen') {
            await ProcessListenNode(element);
        } else if (element.type === 'wait') {
            await social.sleep(element.time);
        } else if (element.type === 'mov') {
            social.movement(element.mov);
        } else if (element.type === 'sound') {
            social.ledsanimstop();
            if (element.wait) {
                await social.play('./sonidos/' + element.src + '.wav', !!element.anim ? await led.getData(element.anim) : undefined);
            } else {
                social.play('./sonidos/' + element.src + '.wav', !!element.anim ? await led.getData(element.anim) : undefined);
            }
        } else if (element.type === 'led') {
            if (element.base === 'stop') {
                social.ledsanimstop();
            } else {
                let anim = await led.getData(element.anim);
                social.ledsanim(element.base, anim.opts);
            }
        } else if (element.type === 'counter') {
            ProcessCounterNode(element);
        } else if (element.type === 'api') {
            let pos = element.host.indexOf(':');
            if (pos >= 0) {
                element.host = element.host.substring(pos + 3);
            }
            if (element.path.includes('$')) {
                element.path = replaceWhatWasHeard(element.path);
                console.log(element.path);
            }
            let data = await api.Api(element.version + '://' + element.host, element.path, element.port);
            setApi(element.name.toLowerCase(), data);
		    console.log('respuesta: ' + api.Getdata(getApi(element.name.toLowerCase()), 'gender'));
        } else if (element.type === 'dialogflow'){
            let aux = await social.dialogflow(element.text.includes('$') ? replaceWhatWasHeard(element.text) : element.text, element.project || '');
            social.ledsanimstop();
            await ProcessSpeakNode({type: 'speak', text: aux});
        } else if (element.type === 'telegram') {
            if (!!element.phone) {
                Login(element);
            } else if (!!element.media) {
                SendMedia(element);
            } else {
                SendMessage(element);
            }
        }
    }
};

async function ProcessSpeakNode(element) {
    let t = element.text;
    if (t.includes('/')) {
        t = random.getOne(t.split('/'));
        element.key = crypto.createHash('md5').update(t).digest("hex");
        element.text = t;
    }
    let rec = true;
    let temp = element.text.split(' ');
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].includes('*')) {
            if(temp[i] == '*name') {
                temp[i] = social.getConf().name;
            }
        }
        else if (temp[i].includes('@')) {
            let pos = temp[i].indexOf('.');
            temp[i] = api.Getdata(getApi(temp[i].substring(1, pos).toLowerCase()), temp[i].substring(pos + 1));
        } else if (temp[i].includes('$')) {
            rec = false;
            temp[i] = replaceWhatWasHeard(temp[i]);
        } else if(temp[i].includes('%')) {
            temp[i] = getSactual()['campo' + (temp[i].length == 1 ? '2' : temp[i].substring(1))];
        } else if(temp[i].includes('#')) {
            if (/^#[\w\d]+$/.test(temp[i])) {
                temp[i] = getCounter()[temp[i].substring(1)];
            }
        }
    }

    let fulltext = temp.join(' ');
    let hash = crypto.createHash('md5').update(fulltext).digest("hex");

    if (!!social.getConf().translate && !fs.existsSync('./temp/' + (social.getConf().voice + '_' + hash) + '.wav')) {
        fulltext = await social.translate(fulltext, social.getConf().voice.substring(0, 5), social.getConf().sourcelang.substring(0, 2));
    }
    social.savelog(evaId, fulltext);
    if (rec) {
        await RecAndSpeak({ key: hash, type: "speak", text: fulltext });
    } else {
        await social.speak(fulltext, false);
    } 
}

async function RecAndSpeak(element) {
	try {
		if (!fs.existsSync('./temp/' + (social.getConf().voice + '_' + element.key) + '.wav')) {
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
