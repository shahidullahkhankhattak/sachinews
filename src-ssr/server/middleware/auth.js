const jwt = require('jsonwebtoken');
const config = require('../config');
const resMessages = require('../responseMessages');

const {
  params: {
    TOKEN_EXPIRED,
  },
  tokenExpired: tokenExpiredMsg,
} = resMessages;

const {
  jwt: {
    secret: jwtSecret,
  },
  resStatuses: {
    resUnAuthenticated,
  },
} = config;

module.exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { user } = jwt.verify(token, jwtSecret);
    res.locals.user = user;
    next();
  } catch (err) {
    res.status(resUnAuthenticated).json({
      statusCode: resUnAuthenticated,
      errors: [
        {
          param: TOKEN_EXPIRED,
          msg: tokenExpiredMsg,
        },
      ],
    });
    // err
  }
};
