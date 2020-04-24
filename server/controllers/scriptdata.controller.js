const scriptdata = require('../models/scriptdata');
const script = require('../models/script');
const scriptdatacontroller = {};

scriptdatacontroller.getList = async (req, res) => res.status(200).json(await scriptdata.find().populate('script'));

scriptdatacontroller.details = async (req, res) => res.status(200).json(await scriptdata.findById(req.params.id).populate('script'));

scriptdatacontroller.create = async (req, res) => {
    const temp = await script.findById(req.body.script);
    const obj = new scriptdata(req.body);
    obj.script = temp;
    await obj.save();
    temp.data.push(obj);
    await temp.save();
    res.status(201).json({
        status: 'scriptdata guardada'
    });
}

scriptdatacontroller.edit = async (req, res) => {
    const { id } = req.params;
    var obj = await scriptdata.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({
        status: 'scriptdata actualizado'
    });
}

scriptdatacontroller.delete = async (req, res) => {
    const { id } = req.params;
    var temp = await scriptdata.findOneAndRemove({ _id: id });
    const s = await script.findById(temp.script._id);
    var i = s.data.indexOf(temp);
    s.data.splice(i, 1);
    await s.save();
    res.status(200).json({
        mensaje: 'scriptdata eliminado'
    });
}

module.exports = scriptdatacontroller;