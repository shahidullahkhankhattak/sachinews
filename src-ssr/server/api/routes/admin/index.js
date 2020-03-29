
const express = require('express');
const bodyParser = require('body-parser');
// controllers
const sourceController = require('../../../controllers/sourceController');
const categoryController = require('../../../controllers/categoryController');
// middlewares
const { checkAuth } = require('../../../middleware/auth');
// validators
const { createSourceValidator, updateSourceValidator, deleteSourceValidator } = require('../../../validators/sourceValidators');
const { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } = require('../../../validators/categoryValidators');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(checkAuth);

// source routes crud
router.route('/source')
  .get(sourceController.index)
  .post([createSourceValidator], sourceController.create)
  .put([updateSourceValidator], sourceController.update)
  .delete([deleteSourceValidator], sourceController.destroy);

// category routes crud
router.route('/category')
  .get(categoryController.index)
  .post([createCategoryValidator], categoryController.create)
  .put([updateCategoryValidator], categoryController.update)
  .delete([deleteCategoryValidator], categoryController.destroy);

module.exports = router;
