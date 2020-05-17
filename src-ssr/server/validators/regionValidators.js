const { body } = require('express-validator');
const Region = require('../db/models/Region');
const { regionMsgs: { EXISTS } } = require('../responseMessages');

module.exports.create = [
  body('name').exists(),
  body('name').custom(async (value, { req }) => {
    const { _id } = req.body;
    const item = await Region.findOne({ name: value });
    if ((item && !_id) || (item && _id && _id !== item._id.toString())) return Promise.reject(EXISTS);
  }),
  body('slug').isSlug(),
];

module.exports.update = [
  body('_id').isMongoId(),
  ...this.create,
];

module.exports.delete = [
  body('_id').isMongoId(),
];
