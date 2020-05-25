const mongoose = require('../index');

const { Schema } = mongoose;
const schema = new Schema({
  title: String,
  description: String,
  media: String,
  body: String,
  slug: String,
  url: String,
  tags: Array,
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
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
  },
});

schema.statics.ObjectId = mongoose.Types.ObjectId;

schema.statics.findWithInfo = async function (filter, sort, offset, perPage, address) {
  const lookupQuery = [
    {
      $lookup: {
        from: 'sources',
        localField: 'source',
        foreignField: '_id',
        as: 'source',
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $lookup: {
        from: 'countries',
        localField: 'country',
        foreignField: '_id',
        as: 'country',
      },
    },
    {
      $lookup: {
        from: 'likes',
        localField: '_id',
        foreignField: 'story',
        as: 'likes',
      },
    },
    {
      $match: filter,
    },
    {
      $addFields: {
        likes: {
          $size: '$likes',
        },
        liked: {
          $cond: {
            if: { $in: [address, '$likes.address'] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $sort: sort,
    },
  ];

  const countLookupQuery = [...lookupQuery];
  countLookupQuery.push({
    $count: 'total',
  });
  if (offset && perPage) {
    lookupQuery.push(
      {
        $skip: parseInt(offset, 10),
      },
      {
        $limit: parseInt(perPage, 10),
      },
    );
  }
  const [{ total } = {}] = await this.aggregate(countLookupQuery);
  const stories = await this.aggregate(lookupQuery);
  return { stories, total: total || 0 };
};

schema.statics.findOneWithAllInfo = async function (filter, address) {
  const lookupQuery = [
    {
      $lookup: {
        from: 'sources',
        localField: 'source',
        foreignField: '_id',
        as: 'source',
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $lookup: {
        from: 'countries',
        localField: 'country',
        foreignField: '_id',
        as: 'country',
      },
    },
    {
      $lookup: {
        from: 'likes',
        localField: '_id',
        foreignField: 'story',
        as: 'likes',
      },
    },
    {
      $match: filter,
    },
    {
      $addFields: {
        likes: {
          $size: '$likes',
        },
        liked: {
          $cond: {
            if: { $in: [address, '$likes.address'] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $limit: 1,
    },
  ];

  return this.aggregate(lookupQuery);
};

module.exports = schema;
