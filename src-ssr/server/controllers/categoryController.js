const { validationResult } = require('express-validator');
const Category = require('../db/models/Category');
const SourceLink = require('../db/models/SourceLink');
const Story = require('../db/models/Story');

const {
  serverError,
  categoryMsgs: {
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
    const categories = await Category.find();
    res.status(resSuccess).json({
      statusCode: resSuccess,
      list: categories,
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
    const item = await Category.create(req.body);
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
    const item = await Category.findOneAndUpdate({ _id }, req.body, { useFindAndModify: false, new: true }).exec();
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
      const linksCount = await SourceLink.countDocuments({
        category: _id,
      });
      const storiesCount = await Story.countDocuments({
        category: _id,
      });
      if (linksCount || storiesCount) {
        return res.status(resIncomplete).json({
          statusCode: resIncomplete,
          confirmObj: { ...req.body, confirm: true },
          errors: [haveNumChildren({ linksCount, storiesCount })],
        });
      }
    }
    await Category.findOneAndDelete({ _id });
    if (confirm) {
      await SourceLink.deleteMany({ category: _id });
      await Story.deleteMany({ category: _id });
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
