const mongoose = require('../index');
const schema = require('../schema/Like');

module.exports = mongoose.model('Like', schema);
