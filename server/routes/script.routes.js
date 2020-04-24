const express = require('express');
const router = express.Router();

const script = require('../controllers/script.controller');

router.get('/', script.getList);
router.get('/data/:id', script.scriptdata);
router.get('/:id', script.details);
router.post('/', script.create);
router.put('/:id', script.edit);
router.delete('/:id', script.delete);

module.exports = router;