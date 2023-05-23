const {ObjectId} = require('mongodb');
const mongodb = require('../db/connect.js');
const Contact = require('../models/contacts.js');

const getAll = async (request, response) => {
	try {
		const result = await Contact.find();
		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error);
	}
};

const getSingle = async (request, response) => {
	const userId = new ObjectId(request.params.id);
	const result = await mongodb.getDb().db().collection('contacts').find({_id: userId});
	result.toArray().then(lists => {
		response.setHeader('Content-Type', 'application/json');
		response.status(200).json(lists[0]);
	});
};

const createContact = async (request, response) => {
	const contact = {
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		email: request.body.email,
		favoriteColor: request.body.favoriteColor,
		birthday: request.body.birthday,
	};
	const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);
	if (result.acknowledged) {
		response.status(201).json(result);
	} else {
		response.status(500).json(result.error || 'Some error occurred while creating the contact.');
	}
};

const updateContact = async (request, response) => {
	const userId = new ObjectId(request.params.id);
	// Be aware of updateOne if you only want to update specific fields
	const contact = {
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		email: request.body.email,
		favoriteColor: request.body.favoriteColor,
		birthday: request.body.birthday,
	};
	const result = await mongodb
		.getDb()
		.db()
		.collection('contacts')
		.replaceOne({_id: userId}, contact);
	console.log(result);
	if (result.modifiedCount > 0) {
		response.status(204).send();
	} else {
		response.status(500).json(result.error || 'Some error occurred while updating the contact.');
	}
};

const deleteContact = async (request, response) => {
	const userId = new ObjectId(request.params.id);
	const result = await mongodb.getDb().db().collection('contacts').remove({_id: userId}, true);
	console.log(result);
	if (result.deletedCount > 0) {
		response.status(204).send();
	} else {
		response.status(500).json(result.error || 'Some error occurred while deleting the contact.');
	}
};

module.exports = {
	getAll,
	getSingle,
	createContact,
	updateContact,
	deleteContact,
};
