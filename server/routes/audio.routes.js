const express = require('express');
const path = require('path');
const router = express.Router();
var multer  = require('multer');

const audio = require('../controllers/audio.controller');

const storage = multer.diskStorage({
	destination: path.join(__dirname, '../../sonidos'),
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

const upload = multer({ 
    storage, 
    dest: path.join(__dirname, 'sonidos'),
    limits: {fileSize: 100000000},
    fileFilter: (req, file, cb) => {
        console.log(file);
        const filetypes = /wav/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("El archivo debe ser un audio");
    }
}).single('file');

router.get('/', audio.getList);
router.post('/', upload, (req, res) => {
    console.log(req.file);
	res.status(200).send('subido');
})
router.delete('/:id', audio.delete);

module.exports = router;