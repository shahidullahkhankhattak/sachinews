const { body } = require('express-validator');
const Source = require('../db/models/Source');
const { sourceMsgs: { EXISTS } } = require('../responseMessages');

module.exports.createSourceValidator = [
  body('name').exists(),
  body('name').custom(async (value, { req }) => {
    const { _id } = req.body;
    const source = await Source.findOne({ name: value });
    if ((source && !_id) || (source && _id && _id !== source._id.toString())) return Promise.reject(EXISTS);
  }),
  body('website').isURL(),
  body('lang').isIn(['english', 'urdu']),
  body('color').isHexColor(),
  body('slug').isSlug(),
];

module.exports.updateSourceValidator = [
  body('_id').isMongoId(),
  ...this.createSourceValidator,
];

module.exports.deleteSourceValidator = [
  body('_id').isMongoId(),
];
