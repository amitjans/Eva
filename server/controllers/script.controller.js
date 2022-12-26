const { getConnection } = require('../database');
const scriptcontroller = {};

scriptcontroller.scriptdata = async (req, res) => {
    const result = await getConnection().get('scriptdata').filter({ script: req.params.id }).value();
    res.status(200).json(result);
}

scriptcontroller.get = async (value) => await getConnection().get('script').find({ _id: value }).value();

scriptcontroller.getData = async (value) => await getConnection().get('scriptdata').filter({ script: value }).value();

module.exports = scriptcontroller;