const { body } = require('express-validator');

module.exports.createSourceValidator = [
  body('name').exists(),
  body('website').isURL(),
  body('lang').isIn(['english', 'urdu']),
  body('color').isHexColor(),
  body('slug').isSlug(),
];

module.exports.updateDeleteSourceValidator = [
  body('_id').isMongoId(),
];
