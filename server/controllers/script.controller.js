const script = require('../models/script');
const scriptcontroller = {};

scriptcontroller.getList = async (req, res) => {
    const scripts = await script.find();
    res.status(200).json(scripts);
}

scriptcontroller.details = async (req, res) => {
    const scripts = await script.findById(req.params.id);
    console.log(scripts);
    res.status(200).json(scripts);
}

scriptcontroller.create = async (req, res) => {
    const nuevoscript = new script();
    nuevoscript.nombre = req.body.nombre;
    nuevoscript.data = JSON.stringify(req.body.data);
    await nuevoscript.save();
    res.status(200).json({
        status: 'interaccion guardado'
    });
}

scriptcontroller.edit = async (req, res) => {
    const { id } = req.params;
    await script.findByIdAndUpdate(id, { nombre: req.body.nombre, data: JSON.stringify(req.body.data) }, { new: true });
    res.status(200).json({
        status: 'interaccion guardado'
    });
}

scriptcontroller.delete = async (req, res) => {
    const { id } = req.params;
    await script.findOneAndRemove({ _id: id });
    res.status(200).json({
        mensaje: 'Tipo de bicicleta eliminado'
    });
}

module.exports = scriptcontroller;