const bcrypt = require('bcrypt');
const mongooseHidden = require('mongoose-hidden')();
const mongoose = require('../index');

const { Schema } = mongoose;
const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  password: { type: String, hideJSON: true },
  auth_token: String,
  auth_secret: String,
  uuid: String,
  role: { type: String, enum: ['admin', 'user'] },
  active: { type: Boolean, default: true },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) return false;
  const isAuthenticated = user.comparePassword(password);
  if (isAuthenticated) return user;
  return false;
};

userSchema.plugin(mongooseHidden);
module.exports = userSchema;
