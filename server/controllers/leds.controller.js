const { getConnection } = require('../database');
const anims = require('../../leds/');
const ledscontroller = {};

ledscontroller.index = async (req, res) => {
    let baseanims = [];
    for (var property in anims) {
        if (typeof anims[property] == 'function') {
            baseanims.push({ name: property, params: anims[property].params });
        }
    }
    res.status(200).json(baseanims);
}

ledscontroller.getData = async (value) => await getConnection().get('led').find({ _id: value }).value();

module.exports = ledscontroller;