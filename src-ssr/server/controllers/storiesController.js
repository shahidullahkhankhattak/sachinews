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

module.exports.getStories = async (req, res) => {
  try {
    const {
      offset, perPage, category, source, search,
    } = req.query;
    const filter = {};

    if (category) filter['category.slug'] = category;
    if (source) filter['source.slug'] = source;
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    const { stories, total } = await Story.withSourceAndCategory(filter, offset, perPage);
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

module.exports.getStory = async (req, res) => {
  try {
    const { slug } = req.params;
    const story = await Story.findOne({ slug }).populate('source').populate('category').exec();
    res.status(resSuccess).json({
      statusCode: resSuccess,
      story,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
      errors: [serverError],
    });
  }
};
