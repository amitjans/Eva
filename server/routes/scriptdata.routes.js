const express = require('express');
const router = express.Router();

const scriptdata = require('../controllers/scriptdata.controller');

router.get('/', scriptdata.getList);
router.get('/:id', scriptdata.details);
router.post('/', scriptdata.create);
router.put('/:id', scriptdata.edit);
router.delete('/:id', scriptdata.delete);

module.exports = router;