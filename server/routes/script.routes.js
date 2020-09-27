const express = require('express');
const router = express.Router();

const script = require('../controllers/script.controller');

router.get('/data/:id', script.scriptdata);

module.exports = router;