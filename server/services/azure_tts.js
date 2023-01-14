const sdk = require("microsoft-cognitiveservices-speech-sdk");
import fs from 'fs';
const temp = require('temp').track();

const synthesizeSpeech = (text, rec, file = "example") => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.TEXT_TO_SPEECH_AZURE, process.env.REGION_AZURE);
    speechConfig.speechSynthesisLanguage = social.getConf().voice.substring(0, 5);
    speechConfig.speechSynthesisVoiceName = social.getConf().voice;
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);
    return new Promise(function (resolve, reject) {
        temp.open('socialrobot', function (err, info) {
            if (err) {
                reject('error: could not open temporary file for writing at path: ' + info.path);
            }
            // await synthesizer.speakSsmlAsync(
            synthesizer.speakTextAsync(
                text,
                result => {
                    synthesizer.close();
                    if (result) {
                        let path = rec ? file : info.path;
                        fs.appendFileSync(path, new Buffer(result.audioData));
                        resolve(social.play(path));
                    }
                },
                error => {
                    console.log(error);
                    synthesizer.close();
                });
        });
    });
}

function ssml(text, style = "cheerful") {
    // <mstts:express-as style="${style}"></mstts:express-as>
    return `<speak version=\"1.0\" xmlns=\"https://www.w3.org/2001/10/synthesis\" xml:lang=\"en-US\">
    <voice name=\"${social.configuration.voice}\">
    <mstts:silence  type="Leading" value="200ms"/>
    ${text}
    </voice>
    </speak>`;
}

module.exports = {
    synthesizeSpeech
}