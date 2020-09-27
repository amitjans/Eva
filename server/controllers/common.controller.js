const { getConnection } = require('../database');
const { v4 } = require('uuid');
const commoncontroller = {};

commoncontroller.getList = (req, res) => {
    res.status(200).json(getConnection().get(req.query.db).value());
}

commoncontroller.details = (req, res) => {
    res.status(200).json(getConnection().get(req.query.db).find({ _id: req.params.id }).value());
}

commoncontroller.create = async (req, res) => {
    getConnection().get(req.query.db).push(Object.assign({ _id: v4() }, req.body)).write();
    res.status(200).json({ status: 'Ok' });
}

commoncontroller.edit = async (req, res) => {
    const result = await getConnection().get(req.query.db).find({ _id: req.params.id }).assign(req.body).write();
    res.status(200).json({ status: 'Ok' });
}

commoncontroller.delete = async (req, res) => {
    const result = getConnection().get(req.query.db).remove({ _id: req.params.id }).write();
    res.status(200).json({ mensaje: 'Ok' });
}

module.exports = commoncontroller;