const fs = require('fs');
const audiocontroller = {};

audiocontroller.getList = async (req, res) => {
    var audios = [];
    fs.readdir('./sonidos/', (err, files) => {
        for (let i = 0; i < files.length; i++) {
            audios.push({ nombre: files[i].substring(0, files[i].length - 4) });
        }
        res.status(200).json(audios);
    });
}

audiocontroller.delete = async (req, res) => {
    const { id } = req.params;
    fs.unlink('./sonidos/' + id + '.wav', (err) => {
        if (err) throw err;
        res.status(200).json({ mensaje: 'Audio eliminado' });
    });
}

module.exports = audiocontroller;