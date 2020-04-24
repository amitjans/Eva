const mongoose = require('mongoose');
const { Schema } = mongoose;
const ScriptDataSchema = new Schema({
    campo1: { type: String, required: true },
    campo2: { type: String, required: false },
    script: { type: Schema.Types.ObjectId, ref: 'script' }
});

module.exports = mongoose.model('scriptdata', ScriptDataSchema);