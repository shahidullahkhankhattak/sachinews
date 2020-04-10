const { body } = require('express-validator');
const Category = require('../db/models/Category');
const { categoryMsgs: { EXISTS } } = require('../responseMessages');

module.exports.create = [
  body('name').exists(),
  body('name').custom(async (value, { req }) => {
    const { _id } = req.body;
    const item = await Category.findOne({ name: value });
    if ((item && !_id) || (item && _id && _id !== item._id.toString())) return Promise.reject(EXISTS);
  }),
  body('slug').isSlug(),
  body('icon').exists(),
];

module.exports.update = [
  body('_id').isMongoId(),
  ...this.create,
];

module.exports.delete = [
  body('_id').isMongoId(),
];
