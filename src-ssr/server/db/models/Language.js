const mongoose = require('../index');
const schema = require('../schema/Language');

module.exports = mongoose.model('Language', schema);
