const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use('/', require('./swagger.js'));
router.use('/contacts', require('./contacts.js'));

module.exports = router;
