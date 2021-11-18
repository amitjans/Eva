const express = require('express');
const path = require('path');
const router = express.Router();
var multer  = require('multer');

const img = require('../controllers/images.controller');

const storage = multer.diskStorage({
	destination: path.join(__dirname, '../../public/images'),
	filename: (req, file, cb) => {
		cb(null, file.originalname.replace(/ /gi, '_'));
	}
});

const upload = multer({ 
    storage, 
    dest: path.join(__dirname, 'public', 'images'),
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

router.get('/', img.getList);
router.post('/', upload, (req, res) => {
	res.status(200).send('subido');
})
router.delete('/:id', img.delete);

module.exports = router;