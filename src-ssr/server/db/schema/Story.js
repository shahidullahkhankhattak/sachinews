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

schema.statics.withSourceAndCategory = async function (filter, offset, perPage) {
  const lookupQuery = [{
    $lookup: {
      from: 'sources', localField: 'source', foreignField: '_id', as: 'source',
    },
  }, {
    $lookup: {
      from: 'categories', localField: 'category', foreignField: '_id', as: 'category',
    },
  }, {
    $match: filter,
  }];
  const countLookupQuery = [...lookupQuery];
  countLookupQuery.push({
    $count: 'total',
  });
  if (offset && perPage) {
    lookupQuery.push({
      $skip: parseInt(offset, 10),
    }, {
      $limit: parseInt(perPage, 10),
    });
  }
  const [{ total } = {}] = await this.aggregate(countLookupQuery);
  const stories = await this.aggregate(lookupQuery);
  return { stories, total: total || 0 };
};

module.exports = schema;
