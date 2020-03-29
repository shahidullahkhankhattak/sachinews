const { body } = require('express-validator');
const Category = require('../db/models/Category');
const { categoryMsgs: { EXISTS } } = require('../responseMessages');

module.exports.createCategoryValidator = [
  body('name').exists(),
  body('name').custom(async (value, { req }) => {
    const { _id } = req.body;
    const category = await Category.findOne({ name: value });
    if ((category && !_id) || (category && _id && _id !== category._id.toString())) return Promise.reject(EXISTS);
  }),
  body('slug').isSlug(),
  body('icon').exists(),
];

module.exports.updateCategoryValidator = [
  body('_id').isMongoId(),
  ...this.createCategoryValidator,
];

module.exports.deleteCategoryValidator = [
  body('_id').isMongoId(),
];
