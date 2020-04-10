
const express = require('express');
const bodyParser = require('body-parser');
// controllers
const SourceController = require('../../../controllers/sourceController');
const CategoryController = require('../../../controllers/categoryController');
const SourceLinkController = require('../../../controllers/sourceLinkController');

// middlewares
const { checkAuth } = require('../../../middleware/auth');
// validators
const SourceValidator = require('../../../validators/sourceValidators');
const CategoryValidator = require('../../../validators/categoryValidators');
const SourceLinkValidator = require('../../../validators/sourceLinkValidator');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(checkAuth);

// source routes crud
router.route('/source')
  .get(SourceController.index)
  .post([SourceValidator.create], SourceController.create)
  .put([SourceValidator.update], SourceController.update)
  .delete([SourceValidator.delete], SourceController.destroy);

// category routes crud
router.route('/category')
  .get(CategoryController.index)
  .post([CategoryValidator.create], CategoryController.create)
  .put([CategoryValidator.update], CategoryController.update)
  .delete([CategoryValidator.delete], CategoryController.destroy);

// category routes crud
router.route('/source_link/:source?')
  .get(SourceLinkController.index)
  .post([SourceLinkValidator.create], SourceLinkController.create)
  .put([SourceLinkValidator.update], SourceLinkController.update)
  .delete([SourceLinkValidator.delete], SourceLinkController.destroy);

module.exports = router;
