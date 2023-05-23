const express = require('express');
const ctrl = require('../controllers/contacts.js');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use('/', (_, response, next) => {
	response.set('Allow', 'GET, POST, PUT, DELETE');
	next();
});

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.checkObjectId(), ctrl.getSingle);

router.post('/', ctrl.createContact);

router.put('/:id', ctrl.checkObjectId(), ctrl.updateContact);

router.delete('/:id', ctrl.checkObjectId(), ctrl.deleteContact);

module.exports = router;
