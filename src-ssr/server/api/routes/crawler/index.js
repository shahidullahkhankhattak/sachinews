const express = require('express');
const bodyParser = require('body-parser');
const scrapperValidators = require('../../../validators/scrapperValidators');
const scrapperController = require('../../../controllers/scrapperController');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.route('/source/:source')
  .get([scrapperValidators.crawlSource], scrapperController.crawlSource);
router.route('/all')
  .get(scrapperController.crawlAll);

module.exports = router;
