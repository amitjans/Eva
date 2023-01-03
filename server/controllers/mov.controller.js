const { getConnection } = require('../database');
const movcontroller = {};

movcontroller.getCodes = async (req, res) => {
    let temp = await social.movement('h');
    res.status(200).json(JSON.parse(temp));
}

movcontroller.getByCode = async (value) => await getConnection().get('mov').find({ codigo: value }).value();

module.exports = movcontroller;