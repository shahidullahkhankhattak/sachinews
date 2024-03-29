const { body } = require('express-validator');
const SourceLink = require('../db/models/SourceLink');
const Source = require('../db/models/Source');
const Country = require('../db/models/Country');
const Category = require('../db/models/Category');
const {
  sourceLinksMsgs: {
    EXISTS, INVALID_SOURCE, INVALID_COUNTRY, INVALID_CATEGORY, INVALID_BOTH,
  },
} = require('../responseMessages');

module.exports.create = [
  body('source').exists(),
  body('source').custom(async (value) => {
    const item = await Source.findOne({ _id: value });
    if (!item) {
      return Promise.reject(INVALID_SOURCE);
    }
  }),
  body('url').exists(),
  body('url').custom(async (value, { req }) => {
    const { _id } = req.body;
    const item = await SourceLink.findOne({ url: value });
    if ((item && !_id) || (item && _id && _id !== item._id.toString())) return Promise.reject(EXISTS);
  }),
  body('url').isURL(),
  body('encoding').isIn(['xml', 'html']),
  body('category').custom(async (value) => {
    if (!value) return;
    const item = await Category.findOne({ _id: value });
    if (!item) {
      return Promise.reject(INVALID_CATEGORY);
    }
  }),
  body('country').custom(async (value) => {
    if (!value) return;
    const item = await Country.findOne({ _id: value });
    if (!item) {
      return Promise.reject(INVALID_COUNTRY);
    }
  }),
  body().custom(async (value) => {
    if (!value.category && !value.country) {
      return Promise.reject(INVALID_BOTH);
    }
  }),
];

module.exports.update = [
  body('_id').isMongoId(),
  ...this.create,
];

module.exports.delete = [
  body('_id').isMongoId(),
];
