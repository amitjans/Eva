import express from 'express';
const router = express.Router();

import { index, update } from '../controllers/config.controller.js';

router.get('/', index);
router.put('/', update);

export default router;