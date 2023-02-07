var common = require('../../server/controllers/common.controller');

var ProcessLedNode = async function (element) {
    if (!element.frames) {
        social.ledsanimstop();
    } else if (element.frames?.length > 0) {
        social.ledsanim(element);
    } else {
        let anim = await GetAnim(element);
        social.ledsanim(anim);
    }
}

var GetAnim = async (element) => (element._id) ? await common.query('led', { _id: element._id }) : element;

module.exports = {
    ProcessLedNode,
    GetAnim
}