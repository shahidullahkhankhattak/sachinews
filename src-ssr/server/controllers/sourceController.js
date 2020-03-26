const { validationResult } = require('express-validator');
const Source = require('../db/models/Source');
const {
  sourceMsgs: {
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
    const sources = await Source.find();
    res.status(resSuccess).json({
      statusCode: resSuccess,
      sources,
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
    const source = await Source.create(req.body);
    res.status(resSuccess).json({
      statusCode: resSuccess,
      successMessage: CREATED,
      source,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
    });
  }
};

module.exports.update = async function (req, res) {
  try {
    const { _id } = req.body;
    const source = await Source.findOneAndUpdate({ _id }, req.body);
    res.status(resSuccess).json({
      statusCode: resSuccess,
      successMessage: UPDATED,
      source,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
    });
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const { _id } = req.body;
    await Source.deleteOne({ _id });
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
