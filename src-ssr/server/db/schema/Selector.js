const mongoose = require('../index');

const { Schema } = mongoose;
const schema = new Schema({
  source: String,
  name: String,
  selector: String,
  type: String,
  filter: String,
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

module.exports = schema;
