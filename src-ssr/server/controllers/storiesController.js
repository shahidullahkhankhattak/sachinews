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
    const { offset, perPage } = req.query;
    let query = Story.find()
      .populate('source')
      .populate('category');
    if (offset && perPage) {
      query = query
        .skip(parseInt(offset, 10))
        .limit(parseInt(perPage, 10));
    }
    const stories = await query.exec();
    const total = await Story.estimatedDocumentCount();
    res.status(resSuccess).json({
      statusCode: resSuccess,
      stories,
      total,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
      errors: [serverError],
    });
  }
};
