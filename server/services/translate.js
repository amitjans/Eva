const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

module.exports = {
    Translate: async function (text, target, source) {
        if (!social._translator && !!process.env.TRANSLATOR_APIKEY) {
            social._translator = new LanguageTranslatorV3({
                version: '2018-05-01',
                authenticator: new IamAuthenticator({
                    apikey: process.env.TRANSLATOR_APIKEY,
                }),
                serviceUrl: process.env.TRANSLATOR_URL,
            });
        } else if (!process.env.TRANSLATOR_APIKEY) { return text }

        if (!source) {
            source = await social._translator.identify({ text: text })
                .then(identifiedLanguages => identifiedLanguages.result.languages[0].language)
                .catch(err => { console.log('error:', err); });
        }
        return await social._translator.translate({ text: text, source: source, target: target })
            .then(response => response.result.translations[0].translation)
            .catch(err => { console.log('error: ', err); });
    }
}