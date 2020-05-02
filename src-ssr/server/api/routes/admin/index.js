
const express = require('express');
const bodyParser = require('body-parser');
// controllers
const SourceController = require('../../../controllers/sourceController');
const CategoryController = require('../../../controllers/categoryController');
const SourceLinkController = require('../../../controllers/sourceLinkController');
const SelectorController = require('../../../controllers/selectorController');
const LanguageController = require('../../../controllers/languageController');
const TranslationController = require('../../../controllers/translationController');

// middlewares
const { checkAuthAdmin } = require('../../../middleware/auth');
// validators
const SourceValidator = require('../../../validators/sourceValidators');
const CategoryValidator = require('../../../validators/categoryValidators');
const SourceLinkValidator = require('../../../validators/sourceLinkValidator');
const selectorValidator = require('../../../validators/selectorValidators');
const languageValidator = require('../../../validators/languageValidator');
const translationValidator = require('../../../validators/translationValidators');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(checkAuthAdmin);

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

// source link routes crud
router.route('/source-link/:source?')
  .get(SourceLinkController.index)
  .post([SourceLinkValidator.create], SourceLinkController.create)
  .put([SourceLinkValidator.update], SourceLinkController.update)
  .delete([SourceLinkValidator.delete], SourceLinkController.destroy);

// selectors routes crud
router.route('/selector/:source?')
  .get(SelectorController.index)
  .post([selectorValidator.create], SelectorController.create)
  .put([selectorValidator.update], SelectorController.update)
  .delete([selectorValidator.delete], SelectorController.destroy);

// languages routes crud
router.route('/language')
  .get(LanguageController.index)
  .post([languageValidator.create], LanguageController.create)
  .put([languageValidator.update], LanguageController.update)
  .delete([languageValidator.delete], LanguageController.destroy);

// translations routes crud
router.route('/translation')
  .get(TranslationController.index)
  .post([translationValidator.create], TranslationController.create)
  .put([translationValidator.update], TranslationController.update)
  .delete([translationValidator.delete], TranslationController.destroy);

module.exports = router;
