const mongoose = require('../index');

const { Schema } = mongoose;
const schema = new Schema({
  title: String,
  description: String,
  media: String,
  body: String,
  slug: String,
  url: String,
  tags: String,
  author: String,
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
  source: {
    type: Schema.Types.ObjectId,
    ref: 'Source',
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
});

module.exports = schema;
