const {ObjectId} = require('mongodb');
const Contact = require('../models/contacts.js');

const checkObjectId = (name = 'id') => (request, response, next) => {
	if (ObjectId.isValid(request.params[name])) {
		return next();
	}

	response.status(400).send('Not a valid object id.');
};

const getAll = async (request, response) => {
/*
	#swagger.description = "Get all the records."
	#swagger.responses[200] = {
		description: "The contacts.",
		schema: { $ref: "#/definitions/ContactArray" }
	}
*/
	try {
		const result = await Contact.find();
		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error);
	}
};

const getSingle = async (request, response) => {
/*
	#swagger.description = "Get a contact by id."
	#swagger.responses[200] = {
		description: "The contact.",
		schema: { $ref: "#/definitions/Contact" }
	}
*/

	try {
		const result = await Contact.findById(request.params.id);
		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error.message);
	}
};

const createContact = async (request, response) => {
	/*
		#swagger.description = "Create a new contact."
		#swagger.parameters['Contact'] = {
			in: 'body',
			required: true,
			schema: { $ref: "#/definitions/Contact" }
		}
		#swagger.responses[200] = {
			description: "The contact.",
			schema: { $ref: "#/definitions/Contact" }
		}
	*/

	try {
		const result = await Contact.create(request.body);
		response.set('Location', `/contacts/${result._id}`);
		response.status(201).json(result);
	} catch (error) {
		response.status(500).json(error.message || 'Some error occurred while creating the contact.');
	}
};

const updateContact = async (request, response) => {
	/*
		#swagger.description = "Update a contact by id."
		#swagger.parameters['Contact'] = {
			in: 'body',
			required: true,
			schema: { $ref: "#/definitions/Contact" }
		}
		#swagger.responses[200] = {
			description: "The contact.",
			schema: { $ref: "#/definitions/Contact" }
		}
	*/

	try {
		const result = await Contact.findByIdAndUpdate(request.params.id, request.body, {
			runValidators: true, new: true,
		});
		response.status(204).json(result);
	} catch (error) {
		response.status(500).json(error.message || 'Some error occurred while updating the contact.');
	}
};

const deleteContact = async (request, response) => {
	/*
		#swagger.description = "Delete a contact by id."
		#swagger.responses[200] = {
			description: "The contact.",
			schema: { $ref: "#/definitions/Contact" }
		}
	*/

	try {
		const result = await Contact.findByIdAndDelete(request.params.id);
		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error.message || 'Some error occurred while deleting the contact.');
	}
};

module.exports = {
	checkObjectId,
	getAll,
	getSingle,
	createContact,
	updateContact,
	deleteContact,
};
