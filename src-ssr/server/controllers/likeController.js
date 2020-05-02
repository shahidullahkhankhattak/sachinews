const { validationResult } = require('express-validator');
const Like = require('../db/models/Like');
const {
  serverError,
} = require('../responseMessages');
const {
  resStatuses: {
    resSuccess,
    resServerError,
    resUnprocessibleEntity,
  },
} = require('../config/index');


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
    const address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.body.address = address;
    const exists = await Like.findOne(req.body);
    if (exists) {
      await Like.remove(req.body);
      return res.status(resSuccess).json({
        statusCode: resSuccess,
      });
    }
    await Like.create(req.body);
    res.status(resSuccess).json({
      statusCode: resSuccess,
    });
  } catch (ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
      errors: [serverError],
    });
  }
};
