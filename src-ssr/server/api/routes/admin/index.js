
const express = require('express');
const bodyParser = require('body-parser');
// controllers
const sourceController = require('../../../controllers/sourceController');
// middlewares
const { checkAuth } = require('../../../middleware/auth');
// validators
const { createSourceValidator, updateDeleteSourceValidator } = require('../../../validators/sourceValidators');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(checkAuth);

router.route('/source')
  .get(sourceController.index)
  .post([createSourceValidator], sourceController.create)
  .put([updateDeleteSourceValidator], sourceController.update)
  .delete([updateDeleteSourceValidator], sourceController.destroy);

module.exports = router;
