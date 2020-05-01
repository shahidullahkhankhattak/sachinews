const { body } = require('express-validator');
const Language = require('../db/models/Language');
const { languageMsgs: { EXISTS } } = require('../responseMessages');

module.exports.create = [
  body('name').exists(),
  body('name').custom(async (value, { req }) => {
    const { _id } = req.body;
    const item = await Language.findOne({ name: value });
    if ((item && !_id) || (item && _id && _id !== item._id.toString())) return Promise.reject(EXISTS);
  }),
  body('iso').exists(),
  body('iso').custom(async (value, { req }) => {
    const { _id } = req.body;
    const item = await Language.findOne({ iso: value });
    if ((item && !_id) || (item && _id && _id !== item._id.toString())) return Promise.reject(EXISTS);
  }),
];

module.exports.update = [
  body('_id').isMongoId(),
  ...this.create,
];

module.exports.delete = [
  body('_id').isMongoId(),
];
