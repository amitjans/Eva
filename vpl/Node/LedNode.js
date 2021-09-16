var led = require('../../server/controllers/leds.controller');

var ProcessLedNode = async function (element) {
    if (element.base === 'stop') {
        social.ledsanimstop();
    } else {
        let anim = await GetAnim(element);
        social.ledsanim(element.base, anim.opts);
    }
}

var GetAnim = async (element) => (typeof element.anim === 'object') ? element.anim : await led.getData(element.anim);

module.exports = {
    ProcessLedNode,
    GetAnim
}