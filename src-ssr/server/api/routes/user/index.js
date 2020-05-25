const express = require('express');
const bodyParser = require('body-parser');
const storiesRoutes = require('../stories');
const SourceController = require('../../../controllers/sourceController');
const CategoryController = require('../../../controllers/categoryController');
const CountryController = require('../../../controllers/countryController');
const LanguageController = require('../../../controllers/languageController');
const TranslationController = require('../../../controllers/translationController');
const LikeController = require('../../../controllers/likeController');

// validators
const likeValidator = require('../../../validators/likeValidator');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use('/stories', storiesRoutes);
router.route('/source')
  .get(SourceController.index);
router.route('/category')
  .get(CategoryController.index);
router.route('/country')
  .get(CountryController.index);
router.route('/language')
  .get(LanguageController.index);
router.route('/translation')
  .get(TranslationController.index);
router.route('/like')
  .post([likeValidator.create], LikeController.create);

module.exports = router;
