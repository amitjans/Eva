const interaccion = require('../models/interaccion');
const fs = require('fs');
const interaccioncontroller = {};

interaccioncontroller.getList = async (req, res) => {
    const interacciones = await interaccion.find();
    res.status(200).json(interacciones);
}

interaccioncontroller.details = async (req, res) => {
    const interaccion = await interaccion.findById(req.params.id);
    console.log(interaccion);
    res.status(200).json(interaccion);
}

interaccioncontroller.getThis = async (value) => await interaccion.findById(value);

interaccioncontroller.create = async (req, res) => {
    const obj = new interaccion();
    obj.nombre = req.body.nombre;
    obj.data = JSON.stringify(req.body.data);
    await obj.save();
    res.status(200).json({
        status: 'interaccion guardado'
    });
}

interaccioncontroller.createThis = async (nombre, data) => {
    const obj = new interaccion();
    obj.nombre = nombre;
    obj.data = JSON.stringify(data);
    await obj.save();
}

interaccioncontroller.edit = async (req, res) => {
    const { id } = req.params;
    await interaccion.findByIdAndUpdate(id, { nombre: req.body.nombre, data: JSON.stringify(req.body.data) }, { new: true });
    res.status(200).json({
        status: 'interaccion guardado'
    });
}

interaccioncontroller.delete = async (req, res) => {
    const { id } = req.params;
    await interaccion.findOneAndRemove({ _id: id });
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