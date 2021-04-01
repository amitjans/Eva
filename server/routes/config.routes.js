const express = require('express');
const router = express.Router();

const config = require('../controllers/config.controller');

router.get('/', config.index);
router.put('/', config.update);

module.exports = router;