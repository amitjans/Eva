const interaccion = require('../models/interaccion');
const fs = require('fs');
const interaccioncontroller = {};

interaccioncontroller.getList = async (req, res) => {
    const interacciones = await interaccion.find();
    let temp = [];
    for (let i = 0; i < interacciones.length; i++) {
        temp.push({ _id: interacciones[i]._id, nombre: interacciones[i].nombre, data: JSON.parse(interacciones[i].data) });
    }
    res.status(200).json(temp);
}

interaccioncontroller.details = async (req, res) => {
    let temp = await interaccion.findById(req.params.id);
    res.status(200).json({ _id: temp._id, nombre: temp.nombre, data: JSON.parse(temp.data) });
}

interaccioncontroller.getThis = async (value) => {
    const temp = await interaccion.findById(value);
    return { _id: temp._id, nombre: temp.nombre, data: JSON.parse(temp.data) };
}

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