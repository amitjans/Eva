const { getConnection } = require('../database');
const { v4 } = require('uuid');
const scriptdatacontroller = {};

scriptdatacontroller.getList = async (req, res) => {
    res.status(200).json(getConnection().get('scriptdata').value());
}

scriptdatacontroller.details = async (req, res) => {
    res.status(200).json(getConnection().get('script').find({ _id: req.params.id }).value());
}

scriptdatacontroller.create = async (req, res) => {
    const obj = req.body;
    obj._id = v4();
    getConnection().get('scriptdata').push(obj).write();
    res.status(201).json({
        status: 'scriptdata guardada'
    });
}

scriptdatacontroller.edit = async (req, res) => {
    const result = await getConnection().get('scriptdata').find({ _id: req.params.id }).assign(req.body).write();
    res.status(200).json({
        status: 'scriptdata actualizado'
    });
}

scriptdatacontroller.delete = async (req, res) => {
    const result = getConnection().get('scriptdata').remove({ _id: req.params.id }).write();
    res.status(200).json({
        mensaje: 'scriptdata eliminado'
    });
}

module.exports = scriptdatacontroller;