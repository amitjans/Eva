'use strict';

/* Cognitive services modules */
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
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

var send = require('./app');
var logs = require('./log');
var log = '';
var time = 0;
var emotional = true;

var lastlevel = 0;
var ledsanimation = spawn('./leds/stop');

class SocialRobot {
  constructor() {
    this.configuration = { attentionWord: 'Eva', name: 'Eva', voice: 'es-LA_SofiaV3Voice', ttsReconnect: true };
    this._isPlaying = false;
    if (!!process.env.TEXT_TO_SPEECH_APIKEY) {
      this._createServiceAPI('tts');
    }
    log = '';
    time = Date.now();
    emotional = true;
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
            console.log('audio.wav written with a corrected wav header');
            console.info('SocialRobot speaking: ' + message);
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

  /**
   * 
   * @param {String} soundFile to play
   */
  play(soundFile, anim, ctrl = true) {
    // capture 'this' context
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
          self.ledsanim((anim || 'hablaT_v2'));
        }
        player.play(soundFile);
      });
    }
    else {
      console.log("> Speaker in use, try playing audio later.");
    }
  }

  getVoice() {
    return this.configuration.voice;
  }

  setVoice(voice) {
    this.configuration.voice = voice;
  }

  movement(type, onestep = false) {
    if (!emotional) {
      return;
    }
    if (onestep) {
      switch (type) {
        case 'u':
          type = 't';
          break;
        case 'd':
          type = 'g';
          break;
        case 'l':
          type = 'f';
          break;
        case 'r':
          type = 'h';
          break;
        default:
          break;
      }
    }
    port.write(type);
  }

  ledsanim(value) {
    ledsanimation = spawn('./leds/' + value);
  }

  ledsanimstop() {
    ledsanimation.stdin.pause();
    ledsanimation.kill();
    ledsanimation = spawn('./leds/stop');
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

  sendAudioGoogleSpeechtoText2(callback) {
    let speakAnimation = spawn('./leds/escuchaT');
    return new Promise(function (resolve, reject) {

      const sampleRateHertz = 16000;
      const client = new speech.SpeechClient();

      const request = {
        config: {
          encoding: 'LINEAR16',
          sampleRateHertz: sampleRateHertz,
          languageCode: 'es-MX',
        },
        interimResults: false,
      };

      const recognizeStream = client
        .streamingRecognize(request)
        .on('error', console.error)
        .on('data', function (data) {
          console.log(data.result);
          if (data.results[0].alternatives[0]) {
            speakAnimation.kill();
            let stopAnimation = spawn('./leds/stop');
            resolve(data.results[0].alternatives[0].transcript);
          } else {
            speakAnimation.kill();
            let stopAnimation = spawn('./leds/stop');
            resolve('la que tu quieras');
          }
        }
        );

      record
        .start({
          sampleRateHertz: sampleRateHertz,
          threshold: 0,
          // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
          verbose: false,
          recordProgram: 'arecord', // Try also "arecord" or "sox"
          silence: '1.0',
        })
        .on('error', console.error)
        .pipe(recognizeStream);
    });
  }

  stopListening() {
    if (record)
      record.stop();
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

    var json = { anim: emotion, bcolor: '', speed: (speed || 2.0) };
    send.eyes(json);
    switch (emotion) {
      case 'ini':
        if (leds) {
          this.ledsanimstop();
        }
        if (lastlevel >= 1) {
          this.movement('c');
        }
        break;
      case 'sad':
        if (leds || level >= 2) {
          this.ledsanim('sad_v2');
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
          this.ledsanim('anger_v2');
        }
        if (level >= 1) {
          this.movement('a');
        }
        break;
      case 'joy':
        if (leds || level >= 2) {
          this.ledsanim('joy_v2');
        }
        if (level >= 1) {
          this.movement('U');
        }
        break;
      case 'surprise':
        if (leds) {
          var animation = spawn('./leds/joy_v2');
        }
        if (level >= 1) {
          this.movement('U');
        }
        break;
      default:
        break;
    }
    lastlevel = level;
  }

  resetlog() {
    log = '';
    time = Date.now();
  }

  templog(who, texto) {
    log += who.autor + ': ' + texto + '\n';
    send.enviarMensaje(who, texto);
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
