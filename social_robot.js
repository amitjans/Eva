'use strict';

/* Cognitive services modules */
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

/* Google cloud speech */
const speech = require('@google-cloud/speech');

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const uuid = require('uuid');

/* Hardware modules */
var Sound = require('aplay');

/*additional node modules */
const fs = require('fs');
const envconfig = require('dotenv').config();
var assert = require('assert');
const temp = require('temp').track();
var wav = require('wav');
const spawn = require('child_process').spawn;

const record = require('node-record-lpcm16');

const SerialPort = require('serialport')
const port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 9600
})

var { eyes, enviarMensaje } = require('./app');
var logs = require('./log');
var log = '';
var time = 0;
var emotional = true;

// var ledsanimation = spawn('./leds/stop');
var ledsanimation = require('./leds/');
const { json } = require('express');
var ledsanim = null;


class SocialRobot {
  constructor() {
    // { attentionWord: 'Eva', name: 'Eva', voice: 'es-LA_SofiaV3Voice', ttsReconnect: true };
    this.configuration = JSON.parse(fs.readFileSync('config.json'));
    this._isPlaying = false;
    if (!!process.env.TEXT_TO_SPEECH_APIKEY) {
      this._createServiceAPI('tts');
    }
    if (!!process.env.SPEECH_TO_TEXT_APIKEY) {
      this._createServiceAPI('stt');
    }
    log = '';
    time = Date.now();
    emotional = true;
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
  speak(message, anim, ctrl) {

    if (!this._tts) {
      throw new Error('SocialRobot is not configured to speak.');
    }
    if (message == undefined) {
      throw new Error('SocialRobot tried to speak a null message.');
    }

    var utterance = {
      text: message,
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
            fs.writeFileSync(info.path, repairedFile);
            resolve(self.play(info.path, anim, ctrl))
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  }

  rec(message, file) {
    var utterance = {
      text: message,
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
            fs.writeFileSync('./temp/' + file + '.wav', repairedFile);
            resolve();
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  }

  async translate(text, target, source) {
    if (!this._translator && !!process.env.TRANSLATOR_APIKEY) {
      this._translator = new LanguageTranslatorV3({
        version: '2018-05-01',
        authenticator: new IamAuthenticator({
          apikey: process.env.TRANSLATOR_APIKEY,
        }),
        serviceUrl: process.env.TRANSLATOR_URL,
      });
    } else if (!process.env.TRANSLATOR_APIKEY) { return text }

    if(!source) {
      source = await this._translator.identify({ text: text })
      .then(identifiedLanguages => identifiedLanguages.result.languages[0].language)
      .catch(err => { console.log('error:', err); });
    }
    return await this._translator.translate({ text: text, source: source, target: target })
      .then(response => response.result.translations[0].translation)
      .catch(err => { console.log('error: ', err); });
  }

  /**
   * 
   * @param {String} soundFile to play
   */
  play(soundFile, anim, ctrl = true) {
    var self = this;

    if (!self._isPlaying) {
      self._isPlaying = true;
      return new Promise(function (resolve, reject) {
        var player = new Sound();
        player.on('complete', function () {
          console.info('> audio playback finished!!');
          self._isPlaying = false;
          if (ctrl) {
            self.ledsanimstop();
          }
          resolve(soundFile);
        });

        player.on('error', function () {
          console.error('> an audio playback error has ocurred');
          reject();
        });
        if (ctrl || !!anim) {
          self.ledsanim('escuchaT', { color1: '#6B3EE3', time: 40 });
        }
        player.play(soundFile);
      });
    }
    else {
      console.log("> Speaker in use, try playing audio later.");
    }
  }

  getConf() {
    return this.configuration;
  }

  setConf(conf) {
    this.configuration = conf;
  }

  movement(type, onestep = false) {
    if (!emotional) {
      return;
    }
    var opt = { u: 't', d: 'g', l: 'f', r: 'h' };
    port.write(onestep ? opt[type] : type);
  }

  async ledsanim(value, properties) {
    if (!!ledsanim) this.ledsanimstop();
    ledsanim = ledsanimation[value](properties);
  }

  async ledsanimstop() {
    clearInterval(ledsanim);
    ledsanimation.stop();
  }

  sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

  sleepanim(ms) {
    var animation = spawn('./leds/countdown');
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

  async listen(service, langcode, callback){
    if (service == 'watson') {
      return await this.listenWatson(langcode, callback);
    } else {
      return await this.listenGoogle(langcode, callback);
    }
  }

  listenGoogle(langcode, callback) {
    const self = this;
    self.ledsanimstop();
    self.ledsanim('escuchaT', { color1: '#3FEC04', time: 40 });

    const sampleRateHertz = 16000;
    const client = new speech.SpeechClient();

    const request = {
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: sampleRateHertz,
        languageCode: langcode || 'es-MX',
      },
      interimResults: false,
    };

    return new Promise(function (resolve, reject) {
      const recognizeStream = client
        .streamingRecognize(request)
        .on('error', console.error)
        .on('data', function (data) {
          self.ledsanimstop();
          if (data.results[0].alternatives[0]) {
            resolve(data.results[0].alternatives[0].transcript);
          } else {
            resolve('error');
          }
        }
        );

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
    this.ledsanimstop();
    this.ledsanim('escuchaT', { color1: '#3FEC04', time: 40 });
    const file = fs.createWriteStream('./test.wav', { encoding: 'binary' });

    this.recording = record
      .record({
        sampleRateHertz: 16000,
        threshold: 0,
        recordProgram: 'rec',
        silence: '1.0'
      });
    this.recording.stream().on('error', console.error).pipe(file);
    await this.sleep(3000);
    this.recording.stop();
    file.end();
    const params = {
      audio: fs.createReadStream('./test.wav'),
      contentType: 'audio/wav',
      model: langcode
    };
    return this._stt.recognize(params)
      .then(response => {
        this.ledsanimstop();
        return response.result.results[0].alternatives[0].transcript;
      })
      .catch(err => {
        console.log(err);
        this.ledsanimstop();
      });
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
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
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
    switch (emotion) {
      case 'ini':
        this.ledsanimstop();
        this.movement('c');
        break;
      case 'sad':
        if (leds || level >= 2) {
          this.ledsanim('emocionv2', { color1: '#000050', led1: 13, time: 200 });
        }
        if (level >= 1) {
          this.movement('D');
        }
        if (level >= 2) {
          this.movement('S');
        }
        break;
      case 'anger':
        if (leds || level >= 2) {
          this.ledsanim('emocionv2', { color1: '#ff0000', led1: 13, time: 200 });
        }
        if (level >= 1) {
          this.movement('a');
        }
        break;
      case 'joy':
        if (leds || level >= 2) {
          this.ledsanim('emocionv2', { color1: '#64ff00', led1: 13, time: 200 });
        }
        if (level >= 1) {
          this.movement('U');
        }
        break;
      case 'surprise':
        if (leds || level >= 2) {
          this.ledsanim('emocionv2', { color1: '#646400', led1: 13, time: 200 });
        }
        if (level >= 1) {
          this.movement('U');
        }
        break;
      default:
        break;
    }
  }

  resetlog() {
    log = '';
    time = Date.now();
  }

  templog(who, texto) {
    log += who.autor + ': ' + texto + '\n';
    enviarMensaje(who, texto);
  }

  savelogs(nombre, temp) {
    logs.logs(nombre + time, (temp || log));
    log = '';
  }

}

/**
 * SocialRobot module version 
 */

//SocialRobot.prototype.version = 'v1';
SocialRobot.prototype.defaultConfiguration = {
  'attentionWord': 'Eva',
  'name': 'Eva',
  'voice': 'es-LA_SofiaV3Voice',
  'ttsReconnect': true,
};

SocialRobot.prototype.configurationParameters = Object.keys(SocialRobot.prototype.defaultConfiguration);

module.exports = SocialRobot;
