const fs = require('fs');
const imgcontroller = {};

imgcontroller.getList = async (req, res) => {
    let files = await fs.promises.readdir('./public/images/');
    res.status(200).json(files.map(item => { return { nombre: item, ext: item.split('.')[1].toUpperCase() }} ));
}

imgcontroller.delete = async (req, res) => {
    const { id } = req.params;
    fs.unlink('./public/images/' + id, (err) => {
        if (err) throw err;
        res.status(200).json({ mensaje: 'Imagen eliminada' });
    });
}

module.exports = imgcontroller;