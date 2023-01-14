import express from 'express';
const router = express.Router();

import { create, deleteObj, details, edit, getList } from '../controllers/common.controller.js';

router.get('/', getList);
router.get('/:id', details);
router.post('/', create);
router.put('/:id', edit);
router.delete('/:id', deleteObj);

export default router;