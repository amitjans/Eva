const express = require('express');
const router = express.Router();

const filters = require('../controllers/listeningfilters.controller');

router.get('/', filters.getList);

module.exports = router;