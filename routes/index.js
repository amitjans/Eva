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

module.exports = router;
