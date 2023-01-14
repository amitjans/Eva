import fs from 'fs';

export const getList = async (req, res) => {
    let files = await fs.promises.readdir('./public/images/');
    res.status(200).json(files.map(item => { return { nombre: item, ext: item.split('.')[1].toUpperCase() }} ));
}

export const deleteImagen = async (req, res) => {
    const { id } = req.params;
    fs.unlink('./public/images/' + id, (err) => {
        if (err) throw err;
        res.status(200).json({ mensaje: 'Imagen eliminada' });
    });
}