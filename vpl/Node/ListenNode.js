var filters = require('../ListeningFilters');
var { setRespuesta } = require('../VPL_ProcessVars');

module.exports = {
    ProcessListenNode: async function ({ service, langcode, opt }) {
        var r = await social.listen(service, langcode);
        console.log(r);
        social.stopListening();
        if (!!opt) {
            r = filters[opt](r)[0];
        }
        social.savelog(usuarioId, r);
        setRespuesta(r);
        console.log(r);
    }
}