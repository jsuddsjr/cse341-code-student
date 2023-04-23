require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;
const mongoURL = process.env.DB_CONNECTION;

let _db;

const initDb = callback => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }

    mongoClient.connect(mongoURL)
        .then(client => {
            _db = client;
            callback(null, _db);
        })
        .catch(err => {
            callback(err);
        });
};

const getDb = (name) => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db.db(name);
};

module.exports = {
    initDb,
    getDb
};