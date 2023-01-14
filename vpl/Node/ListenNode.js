import * as filters from '../ListeningFilters/.index.js';
import { setRespuesta } from '../VPL_ProcessVars.js';

export const ProcessListenNode = async function ({ service, langcode, opt }) {
    var r = await social.listen(service, langcode);
    social.stopListening();
    if (!!opt) {
        r = filters[opt](r)[0];
    }
    social.savelog(usuarioId, r);
    setRespuesta(r);
}
