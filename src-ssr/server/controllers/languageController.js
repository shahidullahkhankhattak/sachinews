const { validationResult } = require('express-validator');
const Language = require('../db/models/Language');
const {
  serverError,
  languageMsgs: {
    CREATED,
    UPDATED,
    DELETED,
  },
} = require('../responseMessages');
const {
  resStatuses: {
    resSuccess,
    resServerError,
    resUnprocessibleEntity,
  },
} = require('../config/index');


module.exports.index = async function (_req, res) {
  try {
    const list = await Language.find();
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
    const item = await Language.create(req.body);
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
    const item = await Language.findOneAndUpdate({ _id }, req.body, { useFindAndModify: false, new: true }).exec();
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
    const { _id } = req.body;
    await Language.deleteOne({ _id });
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
