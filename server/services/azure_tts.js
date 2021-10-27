const sdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require('fs');

const synthesizeSpeech = (text, file = "example") => {
    const speechConfig = sdk.SpeechConfig.fromSubscription("c77079e007624291b7cfd20b1e7d3cbd", "southcentralus");
    speechConfig.speechSynthesisLanguage = "es-CO";
    speechConfig.speechSynthesisVoiceName = "es-CO-SalomeNeural";
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);
    console.log(text);
    // await synthesizer.speakSsmlAsync(
    synthesizer.speakTextAsync(
        text,
        result => {
            synthesizer.close();
            if (result) {
                fs.appendFileSync(`./temp/${file}.wav`, new Buffer(result.audioData));
                // return fs.createReadStream('./temp/' + file + '.wav');
            }
        },
        error => {
            console.log(error);
            synthesizer.close();
        });
}

function ssml(text, style = "cheerful" ){
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