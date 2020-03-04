var express = require('express');
var router = express.Router();
var PlayMusic = require('playmusic');
var pm = new PlayMusic();

var _ = require('underscore');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/cara', function(req, res, next) {
  res.render('cara', { title: 'Cara de Eva' });
});
router.get('/control', function(req, res, next) {
  res.render('control', { title: 'Control de Eva' });
});

router.get('/controlAngular', function(req, res, next) {
  res.render('controlAngular', { title: 'Control de Eva' });
});

router.get('/video', function(req, res, next) {
  res.render('video', { title: 'Videos de Eva' });
});

/*router.get('/media', function(req, res, next){
	//console.log(req.query.q);
	var query = req.query.q;
	var type = req.query.type;
	pm.init({email: "dago.crusa@gmail.com", password: "spiderman85"}, function(err) {
    if(err) console.error(err);
    	// place code here
    	pm.search(query, 15, function(err, data) { // max 5 results
	         var results = data.entries.filter(function(a){
	        	a.reproduce = false;
	        	return a.type == type;
	        });
	        console.log(results);
	        var r= results;
	        if(results.length>5)
				r=results.slice(0,5);
	        res.jsonp(r);
	    }, function(message, body, err, httpResponse) {
	        console.log(message);
	    });
	})
});*/

var YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey('AIzaSyDffvIgtg347SsSSsefgwkSZfv593asdWw');

router.get('/media',function(req,res,next){
		var query = req.query.q;
    console.log('Entro a media');
		youTube.search(query, 5, function(error, results) {
		if (error) {
			console.log(error);
		}
		else{
			var resultados = [];
			_.each(results.items, function(r){
				var track = {};
				track.titulo = r.snippet.title;
				track.img = r.snippet.thumbnails.default.url;
				track.id = r.id.videoId;
				track.reproduce = false;
				resultados.push(track);
			});
			console.log(JSON.stringify(resultados, null, 2));
			res.status(200).jsonp(resultados);
		}
	});
});

/*router.get('/media/video/play', function(req,res){
	//song.track.storeId
	console.log('/media/video/play');
	//console.log(req.body);
	//tj.speak('Espero que te guste este video',4);
	//enviarVideo(evaId,req.body.youtube_video);
});*/
/*
var youtubeStream = require('youtube-audio-stream');
const Decoder = require('lame').Decoder;
const Speaker = require('speaker');
var volume = require("pcm-volume")
//var v = new volume();

decoder = new Decoder();
var speaker = new Speaker({
  channels: 2,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100     // 44,100 Hz sample rate
});
var v = new volume();

router.post('/media/music/play', function(req,res){
	console.log('/media/music/play');
	var cancion = req.body;
	if(cancion.cancionAnterior){
		console.log('hay cancion anterior');
		console.log(v);
		v.end();
	}

	console.log(cancion.id);
	decoder = new Decoder();
	speaker = new Speaker({
	  channels: 2,          // 2 channels
	  bitDepth: 16,         // 16-bit samples
	  sampleRate: 44100     // 44,100 Hz sample rate
	});
	v = new volume();

	var requestUrl = 'https://www.youtube.com/watch?v='+ cancion.id;
    v.setVolume(1.0);
    v.pipe(speaker); // pipe volume to speaker
    decoder.pipe(v); // pipe PCM data to volume
    youtubeStream(requestUrl).pipe(decoder);
    console.log(v);
	res.status(200).jsonp(cancion);

});

router.post('/media/music/stop', function(req,res){
	//song.track.storeId
	console.log('/media/music/stop');
	v.end();
	res.jsonp(req.body);
});

router.post('/media/music/pause', function(req,res){
	//song.track.storeId
	console.log('/media/music/paus');
	v.setVolume(0.15);
	res.jsonp(req.body);
});

router.post('/media/music/resume', function(req,res){
	//song.track.storeId
	console.log('/media/music/resume');
	//tj.resumeMusic();
	v.setVolume(1.0);
	res.status(200).jsonp(req.body);
});


var fs = require("fs");


router.get('/media/meditacion/play', function(req,res){
        //song.track.storeId
        console.log('/media/meditacion/play');
        //tj.resumeMusic();
        var readable = fs.createReadStream("./sonidos/meditacion-musica.mp3");
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

        res.status(200).jsonp();
});

router.get('/media/meditacion/stop', function(req,res){
        //song.track.storeId
        console.log('/media/meditacion/stop');
        v.end();
        res.status(200).jsonp();
});

*/
module.exports = router;
