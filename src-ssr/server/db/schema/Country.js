const mongoose = require('../index');

const { Schema } = mongoose;
const schema = new Schema({
  name: String,
  slug: String,
  website: String,
  iso: String,
  lang: {
    type: Schema.Types.ObjectId,
    ref: 'Language',
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: 'Region',
  },
  color: String,
  active: { type: Boolean, default: true },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

module.exports = schema;
