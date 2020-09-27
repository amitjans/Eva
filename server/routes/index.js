var express = require('express');
var router = express.Router();
var PlayMusic = require('playmusic');

var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
