const express = require('express');
const router = express.Router();

const voice = require('../controllers/voice.controller');

router.get('/', voice.getList);
router.get('/:id', voice.details);
router.post('/', voice.create);
router.put('/:id', voice.edit);
router.delete('/:id', voice.delete);

module.exports = router;