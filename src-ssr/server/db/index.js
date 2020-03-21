const mongoose = require('mongoose');
const config = require('../config');

const { db: { connectUrl } } = config;
mongoose.connect(connectUrl, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
