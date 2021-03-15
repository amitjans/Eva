const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

let db;

async function createConnection() {
    const adapter = new FileAsync('db.json');
    db = await low(adapter);
    db.defaults({script: [], scriptdata: [], interaccion: [], voice: [], led: [], mov: [], woo: [], googlestt: []}).write();
}

const getConnection = () => db;

module.exports = {
    createConnection,
    getConnection
}