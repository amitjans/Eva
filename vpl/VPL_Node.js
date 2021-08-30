var led = require('../server/controllers/leds.controller');
var { ProcessListenNode, ProcessCounterNode, SendMessage, SendMedia, Login, ProcessEmotionNode, Api, Getdata, ProcessSpeakNode } = require('./Node');
var { getlemotion, setApi, getApi } = require('./VPL_ProcessVars');

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
            let data = await Api(element.version + '://' + element.host, element.path, element.port);
            setApi(element.name.toLowerCase(), data);
		    console.log('respuesta: ' + Getdata(getApi(element.name.toLowerCase()), 'gender'));
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
        } else if (element.type === 'record') {
            await RecordNode(element);
        }
    }
};
