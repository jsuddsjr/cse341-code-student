const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isDate = require('validator/lib/isDate');

const contactSchema = new mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {
		type: String, unique: true, lowercase: true, required: true, validate: {
			validator: isEmail,
			message: 'Invalid email address',
		},
	},
	favoriteColor: String,
	birthday: {
		type: String, validate: {
			validator: value => isDate(value, {
				format: 'MM/DD/YY',
			}), message: 'Invalid date',
		},
	},
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

