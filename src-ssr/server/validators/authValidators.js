const { body } = require('express-validator');
const {
  invalidEmail,
  emptyPassword,
} = require('./messages');

module.exports.authenticateValidator = [
  body('email').isEmail().withMessage(invalidEmail),
  body('password').exists().withMessage(emptyPassword),
];
