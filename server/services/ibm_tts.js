import fs from 'fs';
const temp = require('temp').track();

const synthesizeSpeech = (message, rec, file = "example") => {
    var utterance = {
        text: "<break time=\"1s\"/>" + message,
        voice: social.getConf().voice,
        accept: 'audio/wav'
    };
    return new Promise(function (resolve, reject) {
        temp.open('socialrobot', function (err, info) {
            if (err) {
                reject('error: could not open temporary file for writing at path: ' + info.path);
            }
            social._tts
                .synthesize(utterance)
                .then(response => {
                    const audio = response.result;
                    return social._tts.repairWavHeaderStream(audio);
                })
                .then(repairedFile => {
                    let path = rec ? file : info.path;
                    fs.writeFileSync(path, repairedFile);
                    resolve(social.play(path));
                })
                .catch(err => {
                    console.log(err);
                });
        });
    })
};

module.exports = {
    synthesizeSpeech
}