
const express = require('express');
const bodyParser = require('body-parser');
// controllers
const SourceController = require('../../../controllers/sourceController');
const CategoryController = require('../../../controllers/categoryController');
const SourceLinkController = require('../../../controllers/sourceLinkController');
const SelectorController = require('../../../controllers/selectorController');
const LanguageController = require('../../../controllers/languageController');
const TranslationController = require('../../../controllers/translationController');
const CountController = require('../../../controllers/countController');
const RegionController = require('../../../controllers/regionController');
const CountryController = require('../../../controllers/countryController');

// middlewares
const { checkAuthAdmin } = require('../../../middleware/auth');
// validators
const SourceValidator = require('../../../validators/sourceValidators');
const CategoryValidator = require('../../../validators/categoryValidators');
const SourceLinkValidator = require('../../../validators/sourceLinkValidator');
const SelectorValidator = require('../../../validators/selectorValidators');
const LanguageValidator = require('../../../validators/languageValidator');
const TranslationValidator = require('../../../validators/translationValidators');
const RegionValidator = require('../../../validators/regionValidators');
const CountryValidator = require('../../../validators/countryValidator');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(checkAuthAdmin);

// count route
router.route('/counts')
  .get(CountController.index);

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
  .post([SelectorValidator.create], SelectorController.create)
  .put([SelectorValidator.update], SelectorController.update)
  .delete([SelectorValidator.delete], SelectorController.destroy);

// languages routes crud
router.route('/language')
  .get(LanguageController.index)
  .post([LanguageValidator.create], LanguageController.create)
  .put([LanguageValidator.update], LanguageController.update)
  .delete([LanguageValidator.delete], LanguageController.destroy);

// translations routes crud
router.route('/translation')
  .get(TranslationController.index)
  .post([TranslationValidator.create], TranslationController.create)
  .put([TranslationValidator.update], TranslationController.update)
  .delete([TranslationValidator.delete], TranslationController.destroy);

// region routes crud
router.route('/region')
  .get(RegionController.index)
  .post([RegionValidator.create], RegionController.create)
  .put([RegionValidator.update], RegionController.update)
  .delete([RegionValidator.delete], RegionController.destroy);

// country routes crud
router.route('/country')
  .get(CountryController.index)
  .post([CountryValidator.create], CountryController.create)
  .put([CountryValidator.update], CountryController.update)
  .delete([CountryValidator.delete], CountryController.destroy);

module.exports = router;
