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
  likes: { type: Number, default: 0 },
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
      $sort: sort,
    },
    {
      $lookup: {
        from: 'sources',
        localField: 'source',
        foreignField: '_id',
        as: 'source',
      },
    },
    {
      $match: filter,
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
        as: 'allLikes',
      },
    },
    {
      $addFields: {
        likes: {
          $size: '$likes',
        },
        liked: {
          $cond: {
            if: { $in: [address, '$allLikes.address'] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $unset: 'body',
    },
  ];

  const countLookupQuery = [lookupQuery[0], lookupQuery[1], lookupQuery[2], { $count: 'total' }];
  if (offset && perPage) {
    lookupQuery.splice(3, 0,
      {
        $skip: parseInt(offset, 10),
      },
      {
        $limit: parseInt(perPage, 10),
      });
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
