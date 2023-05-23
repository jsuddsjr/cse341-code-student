const express = require('express');
const contactsController = require('../controllers/contacts.js');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;
