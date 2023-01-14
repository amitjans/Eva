import { getConnection } from '../database.js';
import * as anims from '../../leds/index.js';

export const baseLeds = async (req, res) => {
    let baseanims = [];
    for (var property in anims) {
        if (typeof anims[property] == 'function') {
            baseanims.push({ name: property, params: anims[property].params });
        }
    }
    res.status(200).json(baseanims);
}

export const getData = async (value) => await getConnection().get('led').find({ _id: value }).value();