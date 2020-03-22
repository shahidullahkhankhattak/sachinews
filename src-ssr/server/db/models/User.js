const mongoose = require('../index');
const userSchema = require('../schema/User');

const User = mongoose.model('User', userSchema);

module.exports = User;
