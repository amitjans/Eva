const express = require('express');
const router = express.Router();

const common = require('../controllers/common.controller');

router.get('/', common.getList);
router.get('/:id', common.details);
router.post('/', common.create);
router.put('/:id', common.edit);
router.delete('/:id', common.delete);

module.exports = router;