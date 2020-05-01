const express = require('express');
const bodyParser = require('body-parser');
const storiesRoutes = require('../stories');
const SourceController = require('../../../controllers/sourceController');
const CategoryController = require('../../../controllers/categoryController');
const LanguageController = require('../../../controllers/languageController');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use('/stories', storiesRoutes);
router.route('/source')
  .get(SourceController.index);
router.route('/category')
  .get(CategoryController.index);
router.route('/language')
  .get(LanguageController.index);

module.exports = router;
