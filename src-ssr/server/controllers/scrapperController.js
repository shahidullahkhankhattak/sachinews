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

const { crawlSource, crawlAll } = crawler;

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
    const stories = await crawlSource(sourceId, res);
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

module.exports.crawlAll = async function (req, res) {
  try {
    const stories = await crawlAll();
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
}