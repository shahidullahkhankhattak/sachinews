const mongoose = require('../index');
const schema = require('../schema/Region');

module.exports = mongoose.model('Region', schema);
