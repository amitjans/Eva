const express = require('express');
const router = express.Router();

const mov = require('../controllers/mov.controller');

router.get('/', mov.getCodes);

module.exports = router;