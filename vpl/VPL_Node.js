var fs = require('fs');
const crypto = require('crypto');

var random = require('../utils/Random');
var lf = require('./ListeningFilters');
var nodeutils = require('./NodeUtils');
var app = require('../app');

module.exports = {
    ProcessNode: async function (social, evaId, usuarioId, element) {
        if (element.type === 'voice') {
            social.setVoice(element.voice);
        } else if (element.type === 'emotion') {
            ProcessEmotionNode(social, element)
        } else if (element.type === 'speak') {
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
    social.templog(evaId, element.text);
    let t = element.text;
    if (t.includes('/')) {
        t = random.getOne(t.split('/'));
        element.key = crypto.createHash('md5').update(t).digest("hex");
        element.text = t;
    }

    if (t.includes('$')) {
        t = nodeutils.includeAnswers(t.split(' '), app.getRespuesta());
        await social.speak(t, element.anim, !element.anim);
    } else if(t.includes('%')) {
        let temp = (/^(%|%2)$/.test(t) ? app.getSactual().campo2 : app.getSactual().campo1);
        await RecAndSpeak(social, evaId, { key: crypto.createHash('md5').update(temp).digest("hex"), type: "speak", text: temp });
    } else if(t.includes('#')) {
        let temp = t.split(' ');
        for (let i = 0; i < temp.length; i++) {
            if (/^#[\w\d]+$/.test(temp[i])) {
                temp[i] = app.getCounter()[temp[i].substring(1)];
            }
        }
        await social.speak(temp.join(' '), element.anim, !element.anim);
    } else {
        await RecAndSpeak(social, evaId, element);
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
    }
    app.setCounter(temp);
}
