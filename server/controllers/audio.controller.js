import fs from 'fs';
import mm from 'music-metadata';

export const getList = async (req, res) => {
    let audios = [];
    let info = {};
    let files = await fs.promises.readdir('./sonidos/');
    for (let i = 0; i < files.length; i++) {
        try {
            let data = await mm.parseFile('./sonidos/' + files[i]);
            info = { duration: new Date(data.format.duration * 1000).toISOString().substr(11, 8), ext: files[i].slice(-3).toUpperCase() };
        } catch (error) {
            console.log(`Archivo: ${files[i]}, error: ${error}`);
        }
        audios.push(Object.assign({ nombre: files[i].substring(0, files[i].length - 4) }, info));
    }
    res.status(200).json(audios);
}

export const deleteSound = async (req, res) => {
    const { id } = req.params;
    fs.unlink('./sonidos/' + id + '.wav', (err) => {
        if (err) throw err;
        res.status(200).json({ mensaje: 'Audio eliminado' });
    });
}