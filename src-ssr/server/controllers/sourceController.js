const { validationResult } = require('express-validator');
const Source = require('../db/models/Source');
const SourceLink = require('../db/models/SourceLink');
const Selector = require('../db/models/Selector');
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
    const list = await Source.find();
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
      const linksCount = await SourceLink.estimatedDocumentCount({
        source: _id,
      });
      const selectorsCount = await Selector.estimatedDocumentCount({
        source: _id,
      });
      if (linksCount || selectorsCount) {
        return res.status(resIncomplete).json({
          statusCode: resIncomplete,
          confirmObj: { ...req.body, confirm: true },
          errors: [haveNumChildren({ linksCount, selectorsCount })],
        });
      }
    }
    await Source.deleteOne({ _id });
    if (confirm) {
      await SourceLink.deleteMany({ source: _id });
      await Selector.deleteMany({ source: _id });
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
