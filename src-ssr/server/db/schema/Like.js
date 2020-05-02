const mongoose = require('../index');

const { Schema } = mongoose;
const schema = new Schema({
  story: {
    type: Schema.Types.ObjectId,
    ref: 'SourceLink',
  },
  address: String,
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
});

module.exports = schema;
