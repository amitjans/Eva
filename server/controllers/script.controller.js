import { getConnection } from '../database.js';

export const scriptdata = async (req, res) => {
    const result = await getConnection().get('scriptdata').filter({ script: req.params.id }).value();
    res.status(200).json(result);
}

export const get = async (value) => await getConnection().get('script').find({ _id: value }).value();

export const getData = async (value) => await getConnection().get('scriptdata').filter({ script: value }).value();