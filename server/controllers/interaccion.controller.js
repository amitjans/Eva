const { getConnection } = require('../database');
const { v4 } = require('uuid');
const fs = require('fs');
const interaccioncontroller = {};

interaccioncontroller.getList = async (req, res) => {
    res.status(200).json(getConnection().get('interaccion').value());
}

interaccioncontroller.details = async (req, res) => {
    res.status(200).json(getConnection().get('interaccion').find({ _id: req.params.id }).value());
}

interaccioncontroller.getThis = async (value) => getConnection().get('interaccion').find({ _id: value }).value();

interaccioncontroller.create = async (req, res) => {
    const obj = req.body;
    obj._id = v4();
    getConnection().get('interaccion').push(obj).write();
    res.status(201).json({
        status: 'scriptdata guardada'
    });
}

interaccioncontroller.createThis = async (nombre, data) => {
    getConnection().get('interaccion').push({ _id: v4(), nombre: nombre, data: data }).write();
}


interaccioncontroller.edit = async (req, res) => {
    const result = await getConnection().get('interaccion').find({ _id: req.params.id }).assign(req.body).write();
    res.status(200).json({
        status: 'script guardado'
    });
}

interaccioncontroller.delete = async (req, res) => {
    const result = getConnection().get('interaccion').remove({ _id: req.params.id }).write();
    res.status(200).json({
        mensaje: 'interaccion eliminada'
    });
}

interaccioncontroller.deleterec = async (req, res) => {
    const { id } = req.params;
    fs.readdirSync('./temp/').filter(f => f.includes(id)).map(f => fs.unlinkSync('./temp/' + f));
    res.status(200).json({ mensaje: 'Audio eliminado' });
}

module.exports = interaccioncontroller;