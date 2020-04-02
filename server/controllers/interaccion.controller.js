const interaccion = require('../models/interaccion');
const interaccioncontroller = {};

interaccioncontroller.getList = async (req, res) => {
    const interacciones = await interaccion.find();
    res.status(200).json(interacciones);
}

interaccioncontroller.details = async (req, res) => {
    const interaccion = await interaccion.findById(req.params.id);
    res.status(200).json(interaccion);
}

interaccioncontroller.create = async (req, res) => {
    const nuevointeraccion = new interaccion(req.body);
    await nuevointeraccion.save();
    res.status(200).json({
        status: 'interaccion guardado'
    });
}

interaccioncontroller.edit = async (req, res) => {
    const { id } = req.params;
    await interaccion.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({
        status: 'interaccion guardado'
    });
}

interaccioncontroller.delete = async (req, res) => {
    const { id } = req.params;
    await interaccion.findOneAndRemove({ _id: id });
    res.status(200).json({
        mensaje: 'Tipo de bicicleta eliminado'
    });
}

module.exports = interaccioncontroller;