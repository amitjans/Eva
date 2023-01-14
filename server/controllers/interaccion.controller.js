import { getConnection } from '../database.js';
import { v4 } from 'uuid';
import fs from 'fs';

export const createThis = async (nombre, data) => {
    getConnection().get('interaccion').push({ _id: v4(), nombre: nombre, data: data }).write();
}

export const deleterec = async (req, res) => {
    const { id } = req.params;
    fs.readdirSync('./temp/').filter(f => f.includes(id)).map(f => fs.unlinkSync('./temp/' + f));
    res.status(200).json({ mensaje: 'Audio eliminado' });
}