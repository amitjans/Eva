const fs = require('fs');
const record = require('node-record-lpcm16');

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
  const params = {
    audio: fs.createReadStream('./test.wav'),
    contentType: 'audio/wav',
    model: langcode || social.getConf().listen.watson
  };
  return social._stt.recognize(params)
    .then(response => {
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