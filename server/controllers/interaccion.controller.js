const { getConnection } = require('../database');
const { v4 } = require('uuid');
const fs = require('fs');
const interaccioncontroller = {};

interaccioncontroller.getThis = async (value) => getConnection().get('interaccion').find({ _id: value }).value();

interaccioncontroller.createThis = async (nombre, data) => {
    getConnection().get('interaccion').push({ _id: v4(), nombre: nombre, data: data }).write();
}

interaccioncontroller.deleterec = async (req, res) => {
    const { id } = req.params;
    fs.readdirSync('./temp/').filter(f => f.includes(id)).map(f => fs.unlinkSync('./temp/' + f));
    res.status(200).json({ mensaje: 'Audio eliminado' });
}

module.exports = interaccioncontroller;