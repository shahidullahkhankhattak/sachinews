
const express = require('express');
const bodyParser = require('body-parser');
// controllers
const authController = require('../../../controllers/authController');
// validators
const { authenticateValidator } = require('../../../validators/authValidators');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// router.get('/admin/register', authController.registerAdmin);
router.post('/login', authenticateValidator, authController.authenticate);

module.exports = router;
