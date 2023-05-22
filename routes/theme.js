const express = require('express');
const themeController = require('../controllers/theme');
const db = require('../models');

const router = express.Router();

router.get('/:themeName', db.themeValidationRules, db.validate, themeController.getTheme);

module.exports = router;
