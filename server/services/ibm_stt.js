import fs from 'fs';
const record = require('node-record-lpcm16');
var mic = require('mic6');
var cmd = require('node-cmd');

const listenWatson = async (langcode, callback) => {
  
  social.ledsanimstop();
  social.ledsanim(social.getConf().listenled);
  const file = fs.createWriteStream('./test.wav', { encoding: 'binary' });

  social.recording = record.record(social.mic);
  await social.recording.stream().on('error', console.error).pipe(file);
  await social.sleep(3000);
  social.recording.stop();
  //await social.recordSound(3000);
  social.ledsanimstop();

  // await social.sleep(100);
  // console.log('llego a grabar');
  // const result = cmd.runSync('rec -r 16000 -b 16 ./test.wav silence 1 0.1 3% 1 3.0 3%');
  // console.log('termino de grabar' + JSON.stringify(result));
  const params = {
    audio: fs.createReadStream('./test.wav'),
    contentType: 'audio/wav',
    model: langcode || social.getConf().listen.watson
  };
  return social._stt.recognize(params)
    .then(response => {
      console.log('y dijo: ' + JSON.stringify(response));
      try {
        return response.result.results[0].alternatives[0].transcript;
      } catch (error) {
        return '';
      }
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  listenWatson
}