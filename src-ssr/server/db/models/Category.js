const mongoose = require('../index');
const schema = require('../schema/Category');

module.exports = mongoose.model('Category', schema);
