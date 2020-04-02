const mongoose = require('mongoose');
const { Schema } = mongoose;
const InteraccionSchema = new Schema({
    nombre: { type: String, required: true },
    xml: { type: String, require: true }
});

module.exports = mongoose.model('interaccion', InteraccionSchema);