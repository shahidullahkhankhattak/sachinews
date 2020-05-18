const { validationResult } = require('express-validator');
const Source = require('../db/models/Source');
const Selector = require('../db/models/Selector');
const Language = require('../db/models/Language');
const Translation = require('../db/models/Translation');
const Category = require('../db/models/Category');
const SourceLink = require('../db/models/SourceLink');

const {
  serverError,
} = require('../responseMessages');
const {
  resStatuses: {
    resSuccess,
    resServerError,
  },
} = require('../config/index');


module.exports.index = async function (_req, res) {
  try {
    const sources = await Source.estimatedDocumentCount();
    const sourceLinks = await SourceLink.estimatedDocumentCount();
    const categories = await Category.estimatedDocumentCount();
    const selectors = await Selector.estimatedDocumentCount();
    const languages = await Language.estimatedDocumentCount();
    const translations = await Translation.estimatedDocumentCount();
    res.status(resSuccess).json({
      statusCode: resSuccess,
      details: {
        sources,
        sourceLinks,
        categories,
        selectors,
        languages,
        translations,
      },
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
      errors: [serverError],
    });
  }
};
