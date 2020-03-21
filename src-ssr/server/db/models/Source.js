const mongoose = require('../index');
const sourceSchema = require('../schema/Source');

module.exports = mongoose.model('Source', sourceSchema);
