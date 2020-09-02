const script = require('../models/script');
const scriptcontroller = {};

scriptcontroller.getList = async (req, res) => {
    const scripts = await script.find();
    res.status(200).json(scripts);
}

scriptcontroller.scriptdata = async (req, res) => {
    res.status(200).json((await script.findById(req.params.id).populate('data')).data);
}

scriptcontroller.getData = async (value) => (await script.findById(value).populate('data')).data;

scriptcontroller.details = async (req, res) => {
    const scripts = await script.findById(req.params.id);
    console.log(scripts);
    res.status(200).json(scripts);
}

scriptcontroller.create = async (req, res) => {
    const nuevoscript = new script();
    nuevoscript.nombre = req.body.nombre;
    await nuevoscript.save();
    res.status(200).json({
        status: 'script guardado'
    });
}

scriptcontroller.edit = async (req, res) => {
    const { id } = req.params;
    await script.findByIdAndUpdate(id, { nombre: req.body.nombre }, { new: true });
    res.status(200).json({
        status: 'script guardado'
    });
}

scriptcontroller.delete = async (req, res) => {
    const { id } = req.params;
    await script.findOneAndRemove({ _id: id });
    res.status(200).json({
        mensaje: 'script eliminado'
    });
}

module.exports = scriptcontroller;