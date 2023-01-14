import * as nodes from './Node/index.js';
import { getlemotion, setApi, getApi } from './VPL_ProcessVars.js';

export const ProcessNode = async function (element) {
    if (element.type === 'voice') {
        social.setConf({ name: element.robotname, voice: element.voice, translate: element.translate, sourcelang: element.sourcelang, ttsReconnect: true });
    } else if (element.type === 'emotion') {
        nodes.ProcessEmotionNode(element, getlemotion());
    } else if (element.type === 'speak') {
        social.ledsanimstop();
        await nodes.ProcessSpeakNode(element);
    } else if (element.type === 'listen') {
        await nodes.ProcessListenNode(element);
    } else if (element.type === 'wait') {
        await social.sleep(element.time);
    } else if (element.type === 'mov') {
        social.movement(element.mov);
    } else if (element.type === 'sound') {
        social.ledsanimstop();
        if (element.wait) {
            await social.play('./sonidos/' + element.src + '.wav', !!element.anim ? await GetAnim(element) : undefined);
        } else {
            social.play('./sonidos/' + element.src + '.wav', !!element.anim ? await GetAnim(element) : undefined);
        }
    } else if (element.type === 'led') {
        await nodes.ProcessLedNode(element);
    } else if (element.type === 'counter') {
        nodes.ProcessCounterNode(element);
    } else if (element.type === 'api') {
        let pos = element.host.indexOf(':');
        if (pos >= 0) {
            element.host = element.host.substring(pos + 3);
        }
        if (element.path.includes('$')) {
            element.path = replaceWhatWasHeard(element.path);
        }
        let data = await Api(element.version + '://' + element.host, element.path, element.port);
        setApi(element.name.toLowerCase(), data);
    } else if (element.type === 'dialogflow') {
        let aux = await social.dialogflow(element.text.includes('$') ? replaceWhatWasHeard(element.text) : element.text, element.project || '');
        social.ledsanimstop();
        await nodes.ProcessSpeakNode({ type: 'speak', text: aux });
    } else if (element.type === 'record') {
        await nodes.RecordNode(element);
    } else if (element.type === 'image') {
        await social.sendData('img', element);
    } else if (element.type === 'reset') {
        await social.sendData('reset', {});
    }
}