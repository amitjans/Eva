import express from 'express';
import * as fs from 'fs';
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import multer from 'multer';

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();


import { getList, deleteImagen } from '../controllers/images.controller.js';

const storage = multer.diskStorage({
	destination: join(__dirname, '../../public/images'),
	filename: (req, file, cb) => {
		cb(null, file.originalname.replace(/ /gi, '_'));
	}
});

const upload = multer({ 
    storage, 
    dest: join(__dirname, 'public', 'images'),
    limits: {fileSize: 100000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /(png|jpg|jpeg)/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("El archivo debe ser una imagen.");
    }
}).array('file');

router.get('/', getList);
router.post('/', upload, (req, res) => {
	res.status(200).send('subido');
})
router.delete('/:id', deleteImagen);

export default router;