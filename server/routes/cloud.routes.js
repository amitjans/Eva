const express = require('express');
const router = express.Router();

const cloud = require('../controllers/cloud.controller');

router.get('/', cloud.getInfo);
router.put('/', cloud.update);

module.exports = router;