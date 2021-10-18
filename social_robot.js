'use strict';

/* Cognitive services modules */
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

/* Google cloud speech */
const speech = require('@google-cloud/speech');

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const uuid = require('uuid');

/* Hardware modules */
var Sound = require('aplay');
var player = new Sound();

/*additional node modules */
const fs = require('fs');
const envconfig = require('dotenv').config();
var assert = require('assert');
const temp = require('temp').track();
var wav = require('wav');
const spawn = require('child_process').spawn;

const record = require('node-record-lpcm16');

const ledsanimation = require('./leds/');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 9600
})

var { eyes, enviarMensaje } = require('./app');
var logs = require('./log');
var time = 0;
var emotional = true;


class SocialRobot {
  constructor() {
    // { attentionWord: 'Eva', name: 'Eva', voice: 'es-LA_SofiaV3Voice', ttsReconnect: true };
    this.configuration = JSON.parse(fs.readFileSync('config.json'));
    this.mic = { sampleRateHertz: 16000, threshold: 0, recordProgram: 'rec', silence: '1.0' };
    this._isPlaying = false;
    if (!!process.env.TEXT_TO_SPEECH_APIKEY) {
      this._createServiceAPI('tts');
    }
    if (!!process.env.SPEECH_TO_TEXT_APIKEY) {
      this._createServiceAPI('stt');
    }
    time = Date.now();
    emotional = true;
    this.leds = null;
    ledsanimation.stop();
  }

  _createServiceAPI(service) {
    if (envconfig.error) {
      throw envconfig.error
    }
    switch (service) {
      case 'tts':
        this._tts = new TextToSpeechV1({
          authenticator: new IamAuthenticator({ apikey: process.env.TEXT_TO_SPEECH_APIKEY }),
          url: process.env.TEXT_TO_SPEECH_URL
        });
        break;
      case 'stt':
        this._stt = new SpeechToTextV1({
          authenticator: new IamAuthenticator({ apikey: process.env.SPEECH_TO_TEXT_APIKEY }),
          url: process.env.SPEECH_TO_TEXT_URL
        });
        break;
      default:
        console.log('Service does not exist.');
        break;
    }
  }

  /**
   * 
   * @param {String} message to speak 
   */
  speak(message, rec = false, file = 'example') {

    if (!this._tts) {
      throw new Error('SocialRobot is not configured to speak.');
    }
    if (message == undefined) {
      throw new Error('SocialRobot tried to speak a null message.');
    }

    var utterance = {
      text: "<break time=\"1s\"/>" + message,
      voice: this.configuration.voice,
      accept: 'audio/wav'
    };

    var self = this;
    return new Promise(function (resolve, reject) {
      temp.open('socialrobot', function (err, info) {
        if (err) {
          reject('error: could not open temporary file for writing at path: ' + info.path);
        }
        self._tts
          .synthesize(utterance)
          .then(response => {
            const audio = response.result;
            return self._tts.repairWavHeaderStream(audio);
          })
          .then(repairedFile => {
            let path = rec ? './temp/' + file + '.wav' : info.path;
            fs.writeFileSync(path, repairedFile);
            resolve(self.play(path));
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  }

  /**
   * 
   * @param {String} soundFile to play
   */
  async play(soundFile, obj = this.configuration.voiceled) {
    var self = this;
    if (self._isPlaying) {
      self._isPlaying = false;
      player.stop();
      this.ledsanimstop();
    }
    if (soundFile != 'stop') {
      player = new Sound();
      this.ledsanim(obj.base, obj.opts);
      self._isPlaying = true;
      let promise = new Promise(function (resolve, reject) {
        player.on('complete', function () {
          console.info('> audio playback finished!!');
          self._isPlaying = false;
          resolve(soundFile);
        });
        player.on('error', function () {
          console.error('> an audio playback error has ocurred');
          reject();
        });
        player.play(soundFile);
      });
      await promise;
      this.ledsanimstop();
    }
  }

  getConf() {
    return this.configuration;
  }

  setConf(conf) {
    Object.assign(this.configuration, conf);
  }

  async movement(type, onestep = false) {
    if (!emotional) {
      return;
    }
    if (type == 'h') {
      let parser =  port.pipe(new Readline());
      let temp = '';
      parser.on('data', x => temp = x);
      port.write(type);
      await new Promise(resolve => {
        const interval = setInterval(() => {
          if (temp.length > 0) {
            resolve('');
            clearInterval(interval);
          };
        }, 250);
      });
      return temp;
    } else {
      var opt = { u: 't', d: 'g', l: 'f', r: 'h' };
      port.write(onestep ? opt[type] : type);      
    }
  }

  async ledsanim(value, properties) {
    if (!!this.leds) this.ledsanimstop();
    this.leds = ledsanimation[value](properties);
  }

  async ledsanimstop() {
    clearInterval(this.leds);
    this.leds = null;
    ledsanimation.stop();
  }

  sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

  async listen(service, langcode, callback) {
    this.ledsanim(this.configuration.listenled.base, this.configuration.listenled.opts);
    let result = '';
    if (service == 'watson') {
      result = await this.listenWatson(langcode, callback);
    } else {
      result = await this.listenGoogle(langcode, callback);
    }
    this.ledsanimstop();
    return result;
  }

  listenGoogle(langcode, callback) {
    const self = this;
    const sampleRateHertz = 16000;
    const client = new speech.SpeechClient();

    const request = {
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: sampleRateHertz,
        languageCode: langcode || this.configuration.listen.codigo,
      },
      interimResults: false,
    };

    return new Promise(function (resolve, reject) {
      const recognizeStream = client
        .streamingRecognize(request)
        .on('error', console.error)
        .on('data', function (data) {
          if (data.results[0].alternatives[0]) {
            resolve(data.results[0].alternatives[0].transcript);
          } else {
            resolve('error');
          }
        });

      self.recording = record
        .record({
          sampleRateHertz: sampleRateHertz,
          threshold: 0,
          recordProgram: 'rec',
          silence: '1.0',
        });
      self.recording.stream().on('error', console.error).pipe(recognizeStream);
    });
  }

  async listenWatson(langcode, callback) {
    await this.recordSound(3000);
    this.ledsanimstop();
    const params = {
      audio: fs.createReadStream('./test.wav'),
      contentType: 'audio/wav',
      model: langcode || this.configuration.listen.watson
    };
    return this._stt.recognize(params)
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

  async recordSound(time, dir = './test.wav'){
    let localeanim = false;
    if (!this.leds) {
      this.ledsanim(this.configuration.listenled.base, this.configuration.listenled.opts);
      localeanim = true;
    }
    const file = fs.createWriteStream(dir, { encoding: 'binary' });

    this.recording = record.record(this.mic);
    this.recording.stream().on('error', console.error).pipe(file);
    await this.sleep(time);
    this.recording.stop();
    file.end();
    if (localeanim) {
      this.ledsanimstop();
    }
  }

  stopListening() {
    if (this.recording)
      this.recording.stop();
  }

  async dialogflow(input, proyect) {

    var result;
    const sessionId = uuid.v4();

    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(proyect || process.env.DIALOGFLOW_PROJECT_ID, sessionId);

    const requestDialogflow = {
      session: sessionPath,
      queryInput: {
        text: {
          text: input,
          languageCode: 'es-419',
        },
      },
    };

    const responses = await sessionClient.detectIntent(requestDialogflow);
    console.log('Detected intent');
    result = responses[0].queryResult;
    if (result.intent) {
      console.log(`Intent: ${result.intent.displayName}`);
    } else {
      console.log(`No intent matched.`);
    }
    return result.fulfillmentText || result.queryText;
  }

  setEmotional(value) {
    emotional = value;
  }

  getEmotional() {
    return emotional;
  }

  emotions(emotion, level, leds, speed) {
    if (!emotional) {
      return;
    }
    eyes({ anim: emotion, bcolor: '', speed: (speed || 2.0) });
    this.ledsanimstop();
    switch (emotion) {
      case 'ini':
        this.movement('c');
        break;
      default:
        let value = this.configuration.emotion[emotion];
        if (leds || level >= 2) {
          this.ledsanim(value.led.base, value.led.opts);
        }
        if (level >= 1) {
          this.movement(value.mov.codigo);
        }
        break;
    }
  }

  resetlog() {
    time = Date.now().toString(36);
  }

  savelog(who, temp) {
    enviarMensaje(who, temp);
    logs.logs(time, who.autor + ': ' + temp + '\n');
  }

}

module.exports = SocialRobot;
