const mongoose = require('../index');
const categorySchema = require('../schema/Category');

module.exports = mongoose.model('Category', categorySchema);
