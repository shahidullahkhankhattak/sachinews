const mongoose = require('../index');
const schema = require('../schema/Translation');

module.exports = mongoose.model('Translation', schema);
