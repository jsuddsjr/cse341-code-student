const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

/** @type {mongoose.Mongoose} */
let _db

/**
 * @callback InitDbCallback
 * @param {Error} err
 * @param {MongoClient} db
 * @returns {void}
 */

/**
 * Initializes the database connection
 * @param {InitDbCallback} callback
 * @returns {void}
 * @throws {Error}
 */
const initDb = (callback) => {
	if (_db) {
		console.log('Db is already initialized!')
		return callback(null, _db)
	}

	mongoose.connect(process.env.MONGODB_URI).then(
		(value) => {
			_db = value
			callback(null, _db)
		},
		(error) => {
			callback(error)
		},
	)
}

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
