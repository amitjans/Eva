import { getConnection } from '../database.js';
import { v4 } from 'uuid';

export const getList = (req, res) => {
    res.status(200).json(getConnection().get(req.query.db).value());
}

export const details = (req, res) => {
    res.status(200).json(getConnection().get(req.query.db).find({ _id: req.params.id }).value());
}

export const getThis = async (value, db) => getConnection().get(db).find({ _id: value }).value();

export const create = async (req, res) => {
    let obj = { ...req.body, _id: v4() };
    getConnection().get(req.query.db).push(obj).write();
    res.status(200).json({ status: 'Ok' , obj: obj});
}

export const edit = async (req, res) => {
    const result = await getConnection().get(req.query.db).find({ _id: req.params.id }).assign(req.body).write();
    res.status(200).json({ status: 'Ok' });
}

export const deleteObj = async (req, res) => {
    const result = getConnection().get(req.query.db).remove({ _id: req.params.id }).write();
    res.status(200).json({ mensaje: 'Ok' });
}

export const deleteLocal = async (db, filter) => {
    getConnection().get(db).remove(filter).write();
}