const mongoose = require('../index');

const { Schema } = mongoose;
const schema = new Schema({
  name: String,
  slug: String,
  website: String,
  lang: {
    type: Schema.Types.ObjectId,
    ref: 'Language',
  },
  color: String,
  logo: String,
  active: { type: Boolean, default: true },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
  sourceLinks: [{
    type: Schema.Types.ObjectId,
    ref: 'SourceLink',
  }],
  selectors: [{
    type: Schema.Types.ObjectId,
    ref: 'Selector',
  }],
});

module.exports = schema;
