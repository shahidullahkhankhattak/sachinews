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
      offset, perPage, category, source, search, lang, trending,
    } = req.query;
    const address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const filter = {};
    const sort = {
    };
    if (trending) { sort.likes = -1; } else sort.created_date = -1;
    if (category) filter['category.slug'] = category;
    if (source) filter['source.slug'] = source;
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }
    if (lang) {
      filter['source.lang'] = Story.ObjectId(lang);
    }

    const { stories, total } = await Story.findWithInfo(filter, sort, offset, perPage, address);
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
    const address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const [story] = await Story.findOneWithAllInfo({ slug }, address);
    res.status(resSuccess).json({
      statusCode: resSuccess,
      story,
    });
  } catch (ex) {
    console.log(ex);
    res.status(resServerError).json({
      statusCode: resServerError,
      errors: [serverError],
    });
  }
};
