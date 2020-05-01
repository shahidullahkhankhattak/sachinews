const mongoose = require('../index');

const { Schema } = mongoose;
const schema = new Schema({
  name: String,
  iso: String,
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

module.exports = schema;
