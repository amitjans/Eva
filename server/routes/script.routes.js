import express from 'express';
const router = express.Router();

import { scriptdata } from '../controllers/script.controller.js';

router.get('/data/:id', scriptdata);

export default router;