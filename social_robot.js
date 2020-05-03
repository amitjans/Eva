'use strict';

const fs = require('fs');
/* Cognitive services modules */
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

/* Hardware modules */
//var Speaker = require('speaker');
var Sound = require('aplay');

/*additional node modules */
var assert = require('assert');
const temp = require('temp').track();
var wav = require('wav');
const spawn = require('child_process').spawn;

const record = require('node-record-lpcm16');
const speech = require('@google-cloud/speech');

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
  constructor(configuration, credentials) {
    this.configuration = {};
    this._isPlaying = false;
    this.configurationParameters.forEach(function (param) {
      if (configuration != undefined && configuration[param] != undefined) {
        this.configuration[param] = configuration[param];
      }
      else {
        this.configuration[param] = this.defaultConfiguration[param];
      }
    }, this);
    if (credentials != undefined && credentials.hasOwnProperty('tts')) {
      var creds = credentials['tts'];
      this._createServiceAPI('tts', creds);
    }
    log = '';
    time = Date.now();
    emotional = true;
  }

  _createServiceAPI(service, credentials) {
    console.info('> Social Robot initializing ' + service + ' service');
    assert(credentials, "no credentials found for the " + service + " service");
    switch (service) {
      case 'tts':
        assert(credentials.hasOwnProperty('apikey'), "credentials for the " + service + " service missing 'apikey'");
        assert(credentials.hasOwnProperty('url'), "credentials for the " + service + " service missing 'url'");
        this._tts = new TextToSpeechV1({
          authenticator: new IamAuthenticator({ apikey: credentials.apikey }),
          url: credentials.url
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

    if(!self._isPlaying){
      self._isPlaying = true;
      return new Promise(function(resolve, reject){
        var player = new Sound();
        player.on('complete',function(){
          console.info('> audio playback finished!!');
          self._isPlaying = false;
          if (ctrl) {
            self.ledsanimstop();            
          }
          resolve(soundFile);
        });

        player.on('error', function(){
          console.error('> an audio playback error has ocurred');
          reject();
        });
        if (ctrl || !!anim) {
          self.ledsanim((anim || 'hablaT_v2'));
        }
        player.play(soundFile);
      });
    }  
    else{
      console.log("> Speaker in use, try playing audio later.");
    }
  }
  
  movement(type){
    port.write(type);
  }

  ledsanim(value){
    ledsanimation = spawn('./leds/' + value);
  }

  ledsanimstop(){
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
          if (data.results[0].alternatives[0]){
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
  if(record)
    record.stop();
}

setEmotional(value){
  emotional = value;
}

emotions (emotion, level, leds, speed) {
  if (!emotional) {
    return;
  }

  var json = { anim: emotion, bcolor: '', speed: (speed || 2.0) };
  send.eyes(json);
  switch (emotion) {
      case 'ini':
          if (leds){
            var animation = spawn('./leds/base');
          }
          if (lastlevel >= 1) {
            this.movement('c');
          }
          break;
      case 'sad':
          if (leds) {
            var animation = spawn('./leds/sad_v2');
          }
          if (level >= 1) {
            this.movement('d');
          }
          if (level >= 2) {
            this.movement('s');
          }
          break;
      case 'anger':
          if (leds) {
            var animation = spawn('./leds/anger_v2');
          }
          if (level >= 1) {
              this.movement('a');
          }
          if (level >= 2) {
              
          }
          break;
      case 'joy':
          if (leds) {
            var animation = spawn('./leds/joy_v2');
          }
          if (level >= 1) {
            this.movement('u');
          }
          if (level >= 2) {
              
          }
          break;
      case 'surprise':
          if (leds) {
            var animation = spawn('./leds/joy_v2');
          }
          if (level >= 1) {
            this.movement('u');
          }
          if (level >= 2) {
              
          }
          break;
      default:
          break;
  }
  lastlevel = level;
}

resetlog(){
  log = '';
  time = Date.now();
}

templog(who, texto) {
  log += who.autor + ': ' + texto + '\n';
  send.enviarMensaje(who, texto);
}

savelogs(nombre, temp){
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
  'name':'Eva',
  'voice':'es-LA_SofiaV3Voice',
  'ttsReconnect': true,
};

SocialRobot.prototype.configurationParameters = Object.keys(SocialRobot.prototype.defaultConfiguration);

module.exports = SocialRobot;
