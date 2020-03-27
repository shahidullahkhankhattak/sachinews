const { body } = require('express-validator');
const Source = require('../db/models/Source');
const { sourceMsgs: { EXISTS } } = require('../responseMessages');

module.exports.createSourceValidator = [
  body('name').exists(),
  body('name').custom(async (value) => {
    const source = await Source.findOne({ name: value });
    if (source) return Promise.reject(EXISTS);
  }),
  body('website').isURL(),
  body('lang').isIn(['english', 'urdu']),
  body('color').isHexColor(),
  body('slug').isSlug(),
];

module.exports.updateDeleteSourceValidator = [
  body('_id').isMongoId(),
];
