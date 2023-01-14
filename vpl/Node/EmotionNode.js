import { addlemotion } from '../VPL_ProcessVars.js';

export const ProcessEmotionNode = function (element, arr) {
    if (element.level == -1 && element.emotion !== 'ini') {
        if (arr.length == 0) {
            element.level = 0;
        } else if (element.key == arr.slice(-1)[0].key) {
            let { level } = arr.slice(-1)[0];
            element.level = (level + 1 > 2 ? 2 : level + 1);
        }
        addlemotion(element);
    }
    social.emotions(element.emotion, element.level, false, (element.speed || 2.0));
}