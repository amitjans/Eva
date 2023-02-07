const { getConnection } = require('../database');
const movcontroller = {};

movcontroller.getCodes = async (req, res) => {
    let temp = await social.movement('h');
    res.status(200).json(JSON.parse(temp));
}

module.exports = movcontroller;