const mongoose = require('../index');

const { Schema } = mongoose;
const sourceSchema = new Schema({
  name: String,
  slug: String,
  website: String,
  lang: String,
  color: String,
  active: { type: Boolean, default: true },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

module.exports = sourceSchema;
