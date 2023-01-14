import express from 'express';
const router = express.Router();

import { baseLeds } from '../controllers/leds.controller.js';

router.get('/', baseLeds);

export default router;