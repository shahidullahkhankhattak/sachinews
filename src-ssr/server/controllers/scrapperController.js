const { validationResult } = require('express-validator');
const crawler = require('./scrapper');
const {
  serverError,
} = require('../responseMessages');
const {
  resStatuses: {
    resSuccess,
    resServerError,
    resUnprocessibleEntity,
  },
} = require('../config');

const { crawl } = crawler;

module.exports.crawlSource = async function (req, res) {
  try {
    const validator = validationResult(req);
    if (!validator.isEmpty()) {
      return res.status(resUnprocessibleEntity)
        .json({
          statusCode: resUnprocessibleEntity,
          errors: validator.errors,
        });
    }
    const { source: sourceId } = req.params;
    const stories = await crawl(sourceId, res);
    res.status(resSuccess).json({
      statusCode: resSuccess,
      stories,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
      errors: [serverError],
    });
  }
};
