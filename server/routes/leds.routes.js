const express = require('express');
const router = express.Router();

const leds = require('../controllers/leds.controller');

router.get('/', leds.index);

module.exports = router;