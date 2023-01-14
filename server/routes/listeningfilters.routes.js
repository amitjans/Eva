import express from 'express';
const router = express.Router();

import { getList } from '../controllers/listeningfilters.controller.js';

router.get('/', getList);

export default router;