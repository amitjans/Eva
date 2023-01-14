import express from 'express';
const router = express.Router();

import { getCodes } from '../controllers/mov.controller.js';

router.get('/', getCodes);

export default router;