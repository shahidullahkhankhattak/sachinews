const { validationResult } = require('express-validator');
const Category = require('../db/models/Category');
const {
  categoryMsgs: {
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
    const categories = await Category.find();
    res.status(resSuccess).json({
      statusCode: resSuccess,
      list: categories,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
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
    const category = await Category.create(req.body);
    res.status(resSuccess).json({
      statusCode: resSuccess,
      successMessage: CREATED,
      item: category,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
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
    const category = await Category.findOneAndUpdate({ _id }, req.body);
    res.status(resSuccess).json({
      statusCode: resSuccess,
      successMessage: UPDATED,
      item: category,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
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
    await Category.deleteOne({ _id });
    res.status(resSuccess).json({
      statusCode: resSuccess,
      successMessage: DELETED,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
    });
  }
};
