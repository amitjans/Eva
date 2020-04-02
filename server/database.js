const mongoose = require('mongoose');
const URI = 'mongodb+srv://amitjans:8KNysUAqsPqco3mO@cluster0-sniue.gcp.mongodb.net/interaccion';
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('Conectado a la Base de Datos'))
    .catch(error => console.error(error));
module.exports = mongoose;