const { body } = require('express-validator');
const Translation = require('../db/models/Translation');
const Language = require('../db/models/Language');
const { translationMsgs: { EXISTS, INVALID_LANGUAGE } } = require('../responseMessages');

module.exports.create = [
  body('lang').exists(),
  body('lang').custom(async (value) => {
    const item = await Language.findOne({ iso: value });
    if (!item) return Promise.reject(INVALID_LANGUAGE);
  }),
  body('engText').exists(),
  body('engText').custom(async (value, { req }) => {
    const { _id, lang } = req.body;
    const item = await Translation.findOne({ engText: value, lang });
    if ((item && !_id) || (item && _id && _id !== item._id.toString())) return Promise.reject(EXISTS);
  }),
  body('langText').exists(),
];

module.exports.update = [
  body('_id').isMongoId(),
  ...this.create,
];

module.exports.delete = [
  body('_id').isMongoId(),
];
