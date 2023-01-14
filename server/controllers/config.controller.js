import fs from 'fs';
const envars = ['TEXT_TO_SPEECH_URL', 'TEXT_TO_SPEECH_APIKEY', 'SPEECH_TO_TEXT_URL', 'SPEECH_TO_TEXT_APIKEY',
    'TRANSLATOR_URL', 'TRANSLATOR_APIKEY', 'GOOGLE_APPLICATION_CREDENTIALS', 'DIALOGFLOW_PROJECT_ID']

export const index = async (req, res) => {
    return res.status(200).json(social.getConf());
}

export const update = async (req, res) => {
    social.setConf({ attentionWord: req.body.name, name: req.body.name, voice: req.body.voice, ttsReconnect: true })
    fs.writeFile('./config.json', JSON.stringify(req.body), function (err) {
        if (err) return console.log(err);
      });
    return res.status(200).json({ message: 'Credencial del servicio guardada correctamente.' });
}