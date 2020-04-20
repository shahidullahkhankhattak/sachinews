
const express = require('express');
const bodyParser = require('body-parser');
const storiesController = require('../../../controllers/storiesController');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/top-stories', storiesController.topStories);

module.exports = router;
