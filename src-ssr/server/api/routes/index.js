const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./admin');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const crawlerRoutes = require('./crawler');

// controllers
const tagsController = require('../../controllers/tagsController');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// auth routes
router.use(authRoutes);
// admin routes
router.use('/admin', adminRoutes);
// user routes
router.use(userRoutes);
// crawler / scrapper routes
router.use('/scrapper', crawlerRoutes);
router.get('/assign-tags', tagsController.assignTags);

module.exports = router;
