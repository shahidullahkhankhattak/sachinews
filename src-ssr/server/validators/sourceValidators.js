const { body } = require('express-validator');
const Source = require('../db/models/Source');
const Language = require('../db/models/Language');
const { sourceMsgs: { EXISTS, INVALID_LANGUAGE } } = require('../responseMessages');

module.exports.create = [
  body('name').exists(),
  body('name').custom(async (value, { req }) => {
    const { _id } = req.body;
    const item = await Source.findOne({ name: value });
    if ((item && !_id) || (item && _id && _id !== item._id.toString())) return Promise.reject(EXISTS);
  }),
  body('website').isURL(),
  body('lang').exists(),
  body('lang').custom(async (value) => {
    const item = await Language.findOne({ _id: value });
    if (!item) {
      return Promise.reject(INVALID_LANGUAGE);
    }
  }),
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
