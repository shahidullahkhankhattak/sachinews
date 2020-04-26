const { param } = require('express-validator');
const Source = require('../db/models/Source');
const { selectorsMsgs: { INVALID_SOURCE } } = require('../responseMessages');

module.exports.crawlSource = [
  param('source').isMongoId(),
  param('source').custom(async (value) => {
    const item = await Source.findOne({ _id: value });
    if (!item) {
      return Promise.reject(INVALID_SOURCE);
    }
  }),
];
