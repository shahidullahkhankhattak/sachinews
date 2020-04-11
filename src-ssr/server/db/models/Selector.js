const mongoose = require('../index');
const schema = require('../schema/Selector');

module.exports = mongoose.model('Selector', schema);
