const Story = require('../db/models/Story');
const {
  serverError,
} = require('../responseMessages');
const {
  resStatuses: {
    resSuccess,
    resServerError,
  },
} = require('../config/index');

module.exports.topStories = async (req, res) => {
  try {
    const list = await Story.find().populate('source').populate('category').exec();
    res.status(resSuccess).json({
      statusCode: resSuccess,
      stories: list,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
      errors: [serverError],
    });
  }
};
