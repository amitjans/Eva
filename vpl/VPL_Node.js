var fs = require('fs');
const crypto = require('crypto');

var random = require('../utils/Random');
var lf = require('./ListeningFilters');
const api = require('./Api_Node');
var app = require('../app');

module.exports = {
    ProcessNode: async function (social, evaId, usuarioId, element) {
        if (element.type === 'voice') {
            social.setVoice(element.voice);
        } else if (element.type === 'emotion') {
            ProcessEmotionNode(social, element)
        } else if (element.type === 'speak') {
            social.ledsanimstop();
            await ProcessSpeakNode(social, evaId, element);
        } else if (element.type === 'listen') {
            await ProcessListenNode(social, usuarioId, element);
        } else if (element.type === 'wait') {
            await social.sleep(element.time);
        } else if (element.type === 'mov') {
            social.movement(element.mov);
        } else if (element.type === 'sound') {
            if (element.wait) {
                await social.play('./sonidos/' + element.src + '.wav', element.anim, !element.anim);
            } else {
                social.play('./sonidos/' + element.src + '.wav', element.anim, !element.anim);
            }
        } else if (element.type === 'led') {
            if (element.anim === 'stop') {
                social.ledsanimstop();
            } else {
                social.ledsanim(element.anim);
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
            app.setApi(element.name.toLowerCase(), data);
		    console.log('respuesta: ' + api.Getdata(app.getApi(element.name.toLowerCase()), 'gender'));
        } 
    }
};

function ProcessEmotionNode(social, element) {
    if (element.level == -1) {
        if (app.getlemotion().length == 0) {
            element.level = 0;
        } else if (element.key == app.getlemotion()[app.getlemotion().length - 1].key) {
            element.level = (app.getlemotion()[app.getlemotion().length - 1].level + 1 > 2 ? 2 : app.getlemotion()[app.getlemotion().length - 1].level + 1);
        }
        app.addlemotion(element);
    }
    social.emotions(element.emotion, element.level, false, (element.speed || 2.0));
}

async function ProcessSpeakNode(social, evaId, element) {
    let t = element.text;
    if (t.includes('/')) {
        t = random.getOne(t.split('/'));
        element.key = crypto.createHash('md5').update(t).digest("hex");
        element.text = t;
    }
    let rec = true;
    social.templog(evaId, element.text);
    let temp = element.text.split(' ');
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].includes('@')) {
            let pos = temp[i].indexOf('.');
            temp[i] = api.Getdata(app.getApi(temp[i].substring(1, pos).toLowerCase()), temp[i].substring(pos + 1));
        } else if (temp[i].includes('$')) {
            rec = false;
            temp[i] = replaceWhatWasHeard(temp[i]);
        } else if(temp[i].includes('%')) {
            temp[i] = app.getSactual()['campo' + (temp[i].length == 1 ? '2' : temp[i].substring(1))];
        } else if(temp[i].includes('#')) {
            if (/^#[\w\d]+$/.test(temp[i])) {
                temp[i] = app.getCounter()[temp[i].substring(1)];
            }
        }
    }
    if (rec) {
        await RecAndSpeak(social, evaId, { key: crypto.createHash('md5').update(temp.join(' ')).digest("hex"), type: "speak", text: temp.join(' ') });
    } else {
        await social.speak(temp.join(' '), element.anim, !element.anim);
    } 
}

async function RecAndSpeak(social, evaId, element) {
	try {
		if (!fs.existsSync('./temp/' + (social.getVoice() + '_' + element.key) + '.wav')) {
			await social.rec(element.text, (social.getVoice() + '_' + element.key));
		}
        await social.play('./temp/' + (social.getVoice() + '_' + element.key) + '.wav', element.anim, !element.anim);
        social.templog(evaId, element.text);
	} catch (err) {
		console.error(err)
	}
}

async function ProcessListenNode(social, usuarioId, element) {
    var r = await social.sendAudioGoogleSpeechtoText2();
    social.stopListening();
    if (element.opt !== '') {
        r = lf[element.opt](r)[0];
    }
    app.setRespuesta(r);
    social.templog(usuarioId, r);
}

function ProcessCounterNode(element) {
    let temp = app.getCounter();
    if (element.ops === 'sum') {
        temp[element.count] = (temp[element.count] || 0) + parseInt(element.value);                
    } else if (element.ops === 'rest') {
        temp[element.count] = (temp[element.count] || 0) - parseInt(element.value);
    } else if (element.ops === 'mult') {
        temp[element.count] = (temp[element.count] || 0) * parseInt(element.value);
    } else if (element.ops === 'div') {
        temp[element.count] = (temp[element.count] || 0) / parseInt(element.value);
    } else if (element.ops === 'assign'){
        temp[element.count] = parseInt(element.value);
    }
    app.setCounter(temp);
}

function replaceWhatWasHeard(value) {
    let respuesta = app.getRespuesta();
    if (/\$-[\d]+/.test(value)) {
        value = respuesta[(respuesta.length - 1) - parseInt(value.substring(2))];
    } else if (/\$[\d]+/.test(value)) {
        value = respuesta[parseInt(value.substring(1)) - 1];
    } else {
        value = value.replace('$', respuesta[respuesta.length - 1]);
    }
    return value;
}
