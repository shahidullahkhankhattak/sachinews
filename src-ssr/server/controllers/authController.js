
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const genUUID = require('uuid-random');
const { validationResult } = require('express-validator');
const config = require('../config');
const User = require('../db/models/User');
const {
  userNotFound,
} = require('../responseMessages');

const {
  jwt: {
    secret: jwtSecret,
    expireSessionTime: jwtExpireSessionTime,
  },
  bcrypt: { salt: bcryptSalt },
  resStatuses: {
    resUnprocessibleEntity,
    resSuccess,
    resServerError,
    resConflict,
  },
} = config;


// register
module.exports.register = (req, res) => {
  const userData = {
    ...req.query,
    password: bcrypt.hashSync(req.query.password, bcryptSalt),
    auth_token: crypto.randomBytes(64).toString('hex'),
    auth_secret: crypto.randomBytes(64).toString('hex'),
    uuid: genUUID(),
    active: true,
  };

  User.create(userData).then((user) => {
    res.send(user);
  });
};


// login
module.exports.authenticate = async (req, res) => {
  try {
    const validator = validationResult(req);
    if (!validator.isEmpty()) {
      return res.status(resUnprocessibleEntity)
        .json({
          statusCode: resUnprocessibleEntity,
          errors: validator.errors,
        });
    }
    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    if (!user) {
      return res.status(resConflict).json({
        statusCode: resConflict,
        errors: [
          {
            msg: userNotFound,
          },
        ],
      });
    }
    const token = jwt.sign({ user }, jwtSecret, { expiresIn: jwtExpireSessionTime });
    res.status(resSuccess).json({
      statusCode: resSuccess,
      jwtAuth: {
        auth: true,
        token,
        user: user.toJSON(),
      },
    });
  } catch (_ex) {
    res.status(resServerError).json({
      statusCode: resServerError,
    });
  }
};
