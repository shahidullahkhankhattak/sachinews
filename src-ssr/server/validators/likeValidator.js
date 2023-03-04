const { body } = require('express-validator');
const Story = require('../db/models/Story');
const { likeMsgs: { INVALID_STORY } } = require('../responseMessages');

module.exports.create = [
  body('story').exists(),
  body('story').custom(async (value, { req }) => {
    const item = await Story.findOne({ _id: value });
    req.story = item;
    if (!item) { return Promise.reject(INVALID_STORY); }
  }),
];
