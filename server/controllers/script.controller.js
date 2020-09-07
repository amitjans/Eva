const { getConnection } = require('../database');
const { v4 } = require('uuid');
const scriptcontroller = {};

scriptcontroller.getList = (req, res) => {
    res.status(200).json(getConnection().get('script').value());
}

scriptcontroller.scriptdata = async (req, res) => {
    const result = await getConnection().get('scriptdata').filter({ script: req.params.id }).value();
    res.status(200).json(result);
}

scriptcontroller.getData = async (value) => await getConnection().get('scriptdata').filter({ script: value }).value();

scriptcontroller.details = (req, res) => {
    res.status(200).json(getConnection().get('script').find({ _id: req.params.id }).value());
}

scriptcontroller.create = async (req, res) => {
    const nuevoscript = { _id: v4(), nombre: req.body.nombre };
    getConnection().get('script').push(nuevoscript).write();
    res.status(200).json({
        status: 'script guardado'
    });
}

scriptcontroller.edit = async (req, res) => {
    const result = await getConnection().get('script').find({ _id: req.params.id }).assign(req.body).write();
    res.status(200).json({
        status: 'script guardado'
    });
}

scriptcontroller.delete = async (req, res) => {
    const result = getConnection().get('script').remove({ _id: req.params.id }).write();
    res.status(200).json({
        mensaje: 'script eliminado'
    });
}

module.exports = scriptcontroller;