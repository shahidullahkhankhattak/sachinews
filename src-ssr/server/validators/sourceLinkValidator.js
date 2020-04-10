const { body } = require('express-validator');
const SourceLink = require('../db/models/SourceLink');
const Source = require('../db/models/Source');
const { sourceLinksMsgs: { EXISTS, INVALID_SOURCE } } = require('../responseMessages');

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
  body('category').exists(),
];

module.exports.update = [
  body('_id').isMongoId(),
  ...this.create,
];

module.exports.delete = [
  body('_id').isMongoId(),
];
