const { validationResult } = require('express-validator');
const Selector = require('../db/models/Selector');
const {
  serverError,
  selectorsMsgs: {
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


module.exports.index = async function (req, res) {
  try {
    const { source } = req.params;
    const query = {};
    if (source) { query.source = source; }
    const list = await Selector.find(query);
    const autocomplete = await Selector.find({}).select({ selector: 1, _id: 0 }).distinct('selector');
    res.status(resSuccess).json({
      statusCode: resSuccess,
      list,
      autocomplete,
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
    const item = await Selector.create(req.body);
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
    const item = await Selector.findOneAndUpdate({ _id }, req.body, { useFindAndModify: false, new: true }).exec();
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
    await Selector.deleteOne({ _id });
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
