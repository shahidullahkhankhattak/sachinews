const mongoose = require('../index');
const schema = require('../schema/SourceLink');

module.exports = mongoose.model('SourceLink', schema);
