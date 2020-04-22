const express = require('express');
const router = express.Router();

const interaccion = require('../controllers/interaccion.controller');

router.get('/', interaccion.getList);
router.get('/:id', interaccion.details);
router.post('/', interaccion.create);
router.put('/:id', interaccion.edit);
router.delete('/:id', interaccion.delete);
router.delete('/rec/:id', interaccion.deleterec);

module.exports = router;