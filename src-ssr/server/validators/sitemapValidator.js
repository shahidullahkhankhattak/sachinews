const { param } = require('express-validator');
const Language = require('../db/models/Language');
const { translationMsgs: { INVALID_LANGUAGE } } = require('../responseMessages');

module.exports.validate = [
  param('lang').exists(),
  param('lang').custom(async (value) => {
    const item = await Language.findOne({ iso: value });
    if (!item) return Promise.reject(INVALID_LANGUAGE);
  }),
];
