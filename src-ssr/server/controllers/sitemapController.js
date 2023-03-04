const { SitemapStream } = require('sitemap');
const { createGzip } = require('zlib');
const { validationResult } = require('express-validator');
const { sitemap: { hostname } } = require('../config/index');
const {
  resStatuses: {
    resUnprocessibleEntity,
  },
} = require('../config/index');
const Language = require('../db/models/Language');
const Category = require('../db/models/Category');
const Source = require('../db/models/Source');
const Country = require('../db/models/Country');
const Story = require('../db/models/Story');

module.exports.index = async function (req, res) {
  const validator = validationResult(req);
  if (!validator.isEmpty()) {
    return res.status(resUnprocessibleEntity)
      .json({
        statusCode: resUnprocessibleEntity,
        errors: validator.errors,
      });
  }
  const { lang } = req.params;
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');
  try {
    const smStream = new SitemapStream({ hostname });
    const pipeline = smStream.pipe(createGzip());
    const [language] = await Language.find({ iso: lang });
    const categories = await Category.find({});
    const sources = await Source.find({ lang: Story.ObjectId(language._id) });
    const countries = await Country.find({});
    const stories = await Story.find({ source: { $in: sources.map((source) => Story.ObjectId(source._id)) } }).limit(49000).exec();
    smStream.write({ url: `/${lang}/`, changefreq: 'hourly', priority: 1 });
    smStream.write({ url: `/${lang}/trending`, changefreq: 'hourly', priority: 1 });
    categories.forEach((category) => {
      smStream.write({ url: `/${lang}/category/${category.slug}`, changefreq: 'hourly', priority: 0.9 });
    });
    sources.forEach((source) => {
      smStream.write({ url: `/${lang}/source/${source.slug}`, changefreq: 'hourly', priority: 0.9 });
    });
    countries.forEach((country) => {
      smStream.write({ url: `/${lang}/country/${country.iso}`, changefreq: 'hourly', priority: 0.9 });
    });
    stories.forEach((story) => {
      smStream.write({ url: `/${lang}/story/${story._id}/`, changefreq: 'monthly', priority: 1 });
    });
    smStream.end();
    pipeline.pipe(res).on('error', (e) => { throw e; });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};
