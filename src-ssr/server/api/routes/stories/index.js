
const express = require('express');
const bodyParser = require('body-parser');
const storiesController = require('../../../controllers/storiesController');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/get-stories', storiesController.getStories);
router.get('/get-story/:slug', storiesController.getStory);
module.exports = router;
