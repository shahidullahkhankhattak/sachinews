const mongoose = require('../index');
const schema = require('../schema/Country');

module.exports = mongoose.model('Country', schema);
