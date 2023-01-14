import { getConnection } from '../database.js';

export const getCodes = async (req, res) => {
    let temp = await social.movement('h');
    res.status(200).json(JSON.parse(temp));
}

export const getByCode = async (value) => await getConnection().get('mov').find({ codigo: value }).value();