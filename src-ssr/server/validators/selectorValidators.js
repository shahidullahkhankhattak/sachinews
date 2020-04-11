const { body } = require('express-validator');
const Selector = require('../db/models/Selector');
const Source = require('../db/models/Source');
const { selectorsMsgs: { EXISTS, INVALID_SOURCE } } = require('../responseMessages');

module.exports.create = [
  body('source').exists(),
  body('source').custom(async (value) => {
    const item = await Source.findOne({ _id: value });
    if (!item) {
      return Promise.reject(INVALID_SOURCE);
    }
  }),
  body('name').exists(),
  body('name').custom(async (value, { req }) => {
    const { _id } = req.body;
    const item = await Selector.findOne({ name: value });
    if ((item && !_id) || (item && _id && _id !== item._id.toString())) return Promise.reject(EXISTS);
  }),
  body('type').isIn(['string', 'html', 'multi']),
];

module.exports.update = [
  body('_id').isMongoId(),
  ...this.create,
];

module.exports.delete = [
  body('_id').isMongoId(),
];
