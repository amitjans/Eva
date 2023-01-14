import * as led from '../../server/controllers/leds.controller.js';

export const ProcessLedNode = async function (element) {
    if (element.base === 'stop') {
        social.ledsanimstop();
    } else {
        let anim = await GetAnim(element);
        social.ledsanim(anim);
    }
}

export const GetAnim = async (element) => (typeof element.anim === 'object') ? element.anim : await led.getData(element.anim);