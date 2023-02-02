const { getConnection } = require('../database');
const { v4 } = require('uuid');
const commoncontroller = {};

commoncontroller.getList = (req, res) => {
    res.status(200).json(getConnection().get(req.query.db).value());
}

commoncontroller.details = (req, res) => {
    res.status(200).json(getConnection().get(req.query.db).find({ _id: req.params.id }).value());
}

commoncontroller.getThis = async (value, db) => getConnection().get(db).find({ _id: value }).value();

commoncontroller.create = async (req, res) => {
    let obj = { ...req.body, _id: v4() };
    getConnection().get(req.query.db).push(obj).write();
    res.status(200).json({ status: 'Ok', obj: obj });
}

commoncontroller.createLocal = async (db, item) => {
    let obj = { ...item, _id: v4() };
    await getConnection().get(db).push(obj).write();
    return obj;
}

commoncontroller.edit = async (req, res) => {
    const result = await getConnection().get(req.query.db).find({ _id: req.params.id }).assign(req.body).write();
    res.status(200).json({ status: 'Ok' });
}

commoncontroller.updateLocal = async (db, item) => {
    const result = await getConnection().get(db).find({ _id: item._id }).assign(item).write();
    res.status(200).json({ status: 'Ok' });
}

commoncontroller.delete = async (req, res) => {
    const result = getConnection().get(req.query.db).remove({ _id: req.params.id }).write();
    res.status(200).json({ mensaje: 'Ok' });
}

commoncontroller.deleteLocal = async (db, filter) => {
    getConnection().get(db).remove(filter).write();
}

module.exports = commoncontroller;