var fs = require("fs");
//var youtubeStream = require('youtube-audio-stream');
const Decoder = require('lame').Decoder;
const Speaker = require('speaker');
var volume = require("pcm-volume");

decoder = new Decoder();
var speaker = new Speaker({
  channels: 2,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100     // 44,100 Hz sample rate
});
var v = new volume();

module.exports = {
    reproducir: function (file) {
        var readable = fs.createReadStream(file);
        decoder = new Decoder({
            channels: 2,
            bitDepth: 16,
            sampleRate: 44100,
            bitRate: 128,
            outSampleRate: 22050,
            mode: Decoder.STEREO
        });

        speaker = new Speaker();

        v = new volume();

        v.pipe(new Speaker()); // pipe volume to speaker
        decoder.pipe(v); // pipe PCM data to volume
        readable.pipe(decoder); // pipe file input to decoder
        v.on('finish', () => {
            console.error('Termino la reproduccion');
            enviarMensaje(evaId, 'Termino la reproduccion');
        });
        //tj.stopListening();
    }
};