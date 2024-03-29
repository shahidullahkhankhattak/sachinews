const { validationResult } = require('express-validator');
const Source = require('../db/models/Source');
const SourceLink = require('../db/models/SourceLink');
const Selector = require('../db/models/Selector');
const Story = require('../db/models/Story');
const {
  serverError,
  sourceMsgs: {
    CREATED,
    UPDATED,
    DELETED,
    haveNumChildren,
  },
} = require('../responseMessages');
const {
  resStatuses: {
    resSuccess,
    resServerError,
    resUnprocessibleEntity,
    resIncomplete,
  },
} = require('../config/index');


module.exports.index = async function (_req, res) {
  try {
    const { lang } = _req.query && _req.query;
    const query = {};
    if (lang) query.lang = lang;
    const list = await Source.find(query).populate('lang').exec();
    res.status(resSuccess).json({
      statusCode: resSuccess,
      list,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
      errors: [serverError],
    });
  }
};

module.exports.create = async function (req, res) {
  try {
    const validator = validationResult(req);
    if (!validator.isEmpty()) {
      return res.status(resUnprocessibleEntity)
        .json({
          statusCode: resUnprocessibleEntity,
          errors: validator.errors,
        });
    }
    const item = await Source.create(req.body);
    res.status(resSuccess).json({
      statusCode: resSuccess,
      successMessage: CREATED,
      item,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
      errors: [serverError],
    });
  }
};

module.exports.update = async function (req, res) {
  try {
    const validator = validationResult(req);
    if (!validator.isEmpty()) {
      return res.status(resUnprocessibleEntity)
        .json({
          statusCode: resUnprocessibleEntity,
          errors: validator.errors,
        });
    }
    const { _id } = req.body;
    const item = await Source.findOneAndUpdate({ _id }, req.body, { useFindAndModify: false, new: true }).exec();
    res.status(resSuccess).json({
      statusCode: resSuccess,
      successMessage: UPDATED,
      item,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
      errors: [serverError],
    });
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const validator = validationResult(req);
    if (!validator.isEmpty()) {
      return res.status(resUnprocessibleEntity)
        .json({
          statusCode: resUnprocessibleEntity,
          errors: validator.errors,
        });
    }
    const { _id, confirm } = req.body;
    if (!confirm) {
      const storiesCount = await Story.countDocuments({
        source: _id,
      });
      const linksCount = await SourceLink.countDocuments({
        source: _id,
      });
      const selectorsCount = await Selector.countDocuments({
        source: _id,
      });
      if (linksCount || selectorsCount || storiesCount) {
        return res.status(resIncomplete).json({
          statusCode: resIncomplete,
          confirmObj: { ...req.body, confirm: true },
          errors: [haveNumChildren({ linksCount, selectorsCount, storiesCount })],
        });
      }
    }
    await Source.findOneAndDelete({ _id });
    if (confirm) {
      await SourceLink.deleteMany({ source: _id });
      await Selector.deleteMany({ source: _id });
      await Story.deleteMany({ source: _id });
    }
    res.status(resSuccess).json({
      statusCode: resSuccess,
      successMessage: DELETED,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
      errors: [serverError],
    });
  }
};
