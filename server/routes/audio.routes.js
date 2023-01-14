import express from 'express';
import * as fs from 'fs';
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import multer from 'multer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = express.Router();

import { getList, deleteSound } from '../controllers/audio.controller.js';

const storage = multer.diskStorage({
	destination: join(__dirname, '../../sonidos'),
	filename: (req, file, cb) => {
		cb(null, file.originalname.replace(/ /gi, '_'));
	}
});

const upload = multer({ 
    storage, 
    dest: join(__dirname, 'sonidos'),
    limits: {fileSize: 100000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /wav/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("El archivo debe ser un audio");
    }
}).array('file');

router.get('/', getList);
router.post('/', upload, (req, res) => {
	res.status(200).send('subido');
})
router.delete('/:id', deleteSound);

export default router;