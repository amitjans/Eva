const mongoose = require('mongoose');
const { Schema } = mongoose;
const ScriptSchema = new Schema({
    nombre: { type: String, required: true },
    data: [{ type: Schema.Types.ObjectId, ref: 'scriptdata' }]
});

module.exports = mongoose.model('script', ScriptSchema);