const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./admin');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const crawlerRoutes = require('./crawler');

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


module.exports = router;
