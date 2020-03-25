const mongoose = require('mongoose');
const config = require('../config');

if (process.env.NODE_ENV === 'development') {
  Object.keys(mongoose.connection.models).forEach((key) => {
    delete mongoose.connection.models[key];
  });
}

const { db: { connectUrl } } = config;
mongoose.connect(connectUrl, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
