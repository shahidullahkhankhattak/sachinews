const mongoose = require('../index');
const schema = require('../schema/User');

module.exports = mongoose.model('User', schema);
