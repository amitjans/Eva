import express from 'express';
const router = express.Router();

import { getInfo, update } from '../controllers/cloud.controller.js';

router.get('/', getInfo);
router.put('/', update);

export default router;