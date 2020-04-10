const mongoose = require('../index');
const schema = require('../schema/Source');

module.exports = mongoose.model('Source', schema);
