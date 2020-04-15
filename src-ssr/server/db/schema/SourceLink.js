const mongoose = require('../index');

const { Schema } = mongoose;
const schema = new Schema({
  source: {
    type: Schema.Types.ObjectId,
    ref: 'Source',
  },
  url: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  encoding: String,
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

module.exports = schema;
