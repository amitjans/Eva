const { getConnection } = require('../database');
const { v4 } = require('uuid');
const voicecontroller = {};

voicecontroller.getList = (req, res) => {
    res.status(200).json(getConnection().get('voice').value());
}

voicecontroller.details = (req, res) => {
    res.status(200).json(getConnection().get('voice').find({ _id: req.params.id }).value());
}

voicecontroller.create = async (req, res) => {
    const nuevoscript = Object.assign({ _id: v4()}, req.body);
    getConnection().get('voice').push(nuevoscript).write();
    res.status(200).json({
        status: 'script guardado'
    });
}

voicecontroller.edit = async (req, res) => {
    const result = await getConnection().get('voice').find({ _id: req.params.id }).assign(req.body).write();
    res.status(200).json({
        status: 'voice guardada'
    });
}

voicecontroller.delete = async (req, res) => {
    const result = getConnection().get('voice').remove({ _id: req.params.id }).write();
    res.status(200).json({
        mensaje: 'voice eliminada'
    });
}

module.exports = voicecontroller;