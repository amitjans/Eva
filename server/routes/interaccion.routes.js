const express = require('express');
const router = express.Router();

const interaccion = require('../controllers/interaccion.controller');

router.delete('/rec/:id', interaccion.deleterec);

module.exports = router;