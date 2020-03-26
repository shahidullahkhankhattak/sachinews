const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./admin');
const authRoutes = require('./auth');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(authRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
