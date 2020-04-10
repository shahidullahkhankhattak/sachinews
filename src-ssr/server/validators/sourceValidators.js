const { body } = require('express-validator');
const Source = require('../db/models/Source');
const { sourceMsgs: { EXISTS } } = require('../responseMessages');

module.exports.create = [
  body('name').exists(),
  body('name').custom(async (value, { req }) => {
    const { _id } = req.body;
    const item = await Source.findOne({ name: value });
    if ((item && !_id) || (item && _id && _id !== item._id.toString())) return Promise.reject(EXISTS);
  }),
  body('website').isURL(),
  body('lang').isIn(['english', 'urdu']),
  body('color').isHexColor(),
  body('slug').isSlug(),
];

module.exports.update = [
  body('_id').isMongoId(),
  ...this.create,
];

module.exports.delete = [
  body('_id').isMongoId(),
];
