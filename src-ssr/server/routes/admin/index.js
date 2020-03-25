
const express = require('express');
const bodyParser = require('body-parser');
// controllers
const authController = require('../../controllers/authController');
// validators
const authValidators = require('../../validators/authValidators');
// middlewares
const { checkAuth } = require('../../middleware/auth');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// router.get('/admin/register', authController.registerAdmin);
router.post('/login', authValidators.authenticateValidator, authController.authenticate);
router.use('/admin/source', checkAuth)
  .post((_req, res) => {
    res.send('hahaha');
  });
module.exports = function ({ app }) {
  app.use(router);
};
