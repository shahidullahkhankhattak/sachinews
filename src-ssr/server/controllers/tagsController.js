const fs = require('fs');
const Story = require('../db/models/Story');
const { searchTags } = require('../utils/tags');
const {
  resStatuses: {
    resSuccess,
  },
} = require('../config/index');

module.exports.assignTags = async function (req, res) {
  const Stories = await Story.find({});
  Stories.forEach(async (story) => {
    const { body } = story;
    const tagsKeywords = JSON.parse(fs.readFileSync('keywords/tagsKeywords.json').toString('utf-8'));
    const tags = [];
    Object.keys(tagsKeywords).forEach((key) => {
      const value = tagsKeywords[key];
      value.forEach((keyword) => {
        if (searchTags(keyword, body)) {
          tags.push(key);
        }
      });
    });
    story.tags = tags;
    await story.save();
  });

  res.status(resSuccess).json({
    statusCode: resSuccess,
    message: 'tags for all stories have been updated',
  });
};
