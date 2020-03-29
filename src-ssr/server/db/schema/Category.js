const mongoose = require('../index');

const { Schema } = mongoose;
const categorySchema = new Schema({
  name: String,
  slug: String,
  icon: String,
  active: { type: Boolean, default: true },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

module.exports = categorySchema;
