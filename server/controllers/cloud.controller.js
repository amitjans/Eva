const fs = require('fs');
const cloudcontroller = {};
const envars = ['TEXT_TO_SPEECH_URL', 'TEXT_TO_SPEECH_APIKEY', 'SPEECH_TO_TEXT_URL', 'SPEECH_TO_TEXT_APIKEY',
    'TRANSLATOR_URL', 'TRANSLATOR_APIKEY', 'GOOGLE_APPLICATION_CREDENTIALS', 'DIALOGFLOW_PROJECT_ID']

cloudcontroller.getInfo = async (req, res) => {
    let clouds = [];
    clouds.push(cloudIsConfig('IBM Text to Speech', envars[0], envars[1]));
    clouds.push(cloudIsConfig('IBM Speech to Text', envars[2], envars[3]));
    clouds.push(cloudIsConfig('IBM Translator', envars[4], envars[5]));
    clouds.push(cloudIsConfig('Google', envars[6]));
    clouds.push(cloudIsConfig('DialogFlow', envars[6], envars[7]));

    return res.status(200).json(clouds);
}

cloudIsConfig = (label, ...codes) => {
    let counter = 0;
    for (let i = 0; i < codes.length; i++) {
        if (!!process.env[codes[i]]) {
            counter++;
        }
    }
    return cloudInfo(label, ((counter * 100) / codes.length), codes, counter == codes.length)
}

cloudInfo = (label, level, codes, status = true) => { 
    let data = { service: label, level: level, status: status, keys: [] };
    for (let i = 0; i < codes.length; i++) {
        data.keys.push({ key: codes[i], value: process.env[codes[i]] });
    }
    return  data;
};

cloudcontroller.update = async (req, res) => {

    let { key, value } = req.body;
    process.env[key] = value;

    let result = ''

    for (let i = 0; i < envars.length; i++) {
        if (!!process.env[envars[i]]){
            result += `${envars[i]}=${process.env[envars[i]]}\n`;
        }
    }

    fs.writeFile('./.env', result, function (err) {
        if (err) return console.log(err);
      });
    return res.status(200).json({ message: 'Credencial del servicio guardada correctamente.' });
}

module.exports = cloudcontroller;