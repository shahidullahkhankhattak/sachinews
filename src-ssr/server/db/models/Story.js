const mongoose = require('../index');
const schema = require('../schema/Story');

module.exports = mongoose.model('Story', schema);
