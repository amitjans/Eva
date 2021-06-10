const fs = require('fs');
const cloudcontroller = {};
const envars = ['TEXT_TO_SPEECH_URL', 'TEXT_TO_SPEECH_APIKEY', 'SPEECH_TO_TEXT_URL', 'SPEECH_TO_TEXT_APIKEY',
    'TRANSLATOR_URL', 'TRANSLATOR_APIKEY', 'GOOGLE_APPLICATION_CREDENTIALS', 'DIALOGFLOW_PROJECT_ID',
    'TELEGRAM_API_ID', 'TELEGRAM_API_HASH', 'TELEGRAM_SESSION']

cloudcontroller.getInfo = async (req, res) => {
    let clouds = [];
    clouds.push(cloudIsConfig('IBM Text to Speech', envars[0], envars[1]));
    clouds.push(cloudIsConfig('IBM Speech to Text', envars[2], envars[3]));
    clouds.push(cloudIsConfig('IBM Translator', envars[4], envars[5]));
    clouds.push(cloudIsConfig('Google', envars[6]));
    clouds.push(cloudIsConfig('DialogFlow', envars[6], envars[7]));
    clouds.push(cloudIsConfig('Telegram', envars[8], envars[9], envars[10]));

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
    writeFile();
    return res.status(200).json({ message: 'Credencial del servicio guardada correctamente.' });
}

cloudcontroller.setKey = async (key, value) => {
    process.env[key] = value;
    writeFile();    
}

function writeFile() {
    let result = '';
    for (const item of envars) {
        if (!!process.env[item]){
            result += `${item}=${process.env[item]}\n`;
        }
    }
    fs.writeFile('./.env', result, function (err) {
        if (err) return console.log(err);
    });
}

module.exports = cloudcontroller;