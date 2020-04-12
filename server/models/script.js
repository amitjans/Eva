const mongoose = require('mongoose');
const { Schema } = mongoose;
const ScriptSchema = new Schema({
    nombre: { type: String, required: true },
    data: { type: String, require: true }
});

module.exports = mongoose.model('script', ScriptSchema);