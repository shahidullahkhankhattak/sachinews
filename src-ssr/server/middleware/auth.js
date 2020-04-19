const jwt = require('jsonwebtoken');
const config = require('../config');
const {
  roles: {
    ADMIN,
    USER,
  },
} = require('../config/constants');
const {
  adminEvents,
  userEvents,
  LOGOUT,
} = require('../../../src/sockets/constants');

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
  }
};

module.exports.checkAuthAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { user } = jwt.verify(token, jwtSecret);
    if (user.role !== ADMIN) { throw new Error(); }
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
  }
};

module.exports.checkSocketAuth = (socket, next) => {
  try {
    const [event, { token }] = socket;
    if (adminEvents[event] || userEvents[event]) {
      const { user } = jwt.verify(token, jwtSecret);
      if (adminEvents[event] && user.role !== ADMIN) { return next(new Error(LOGOUT)); }
      if (userEvents[event] && user.role !== USER) { return next(new Error(LOGOUT)); }
    }
    return next();
  } catch (_err) {
    return next(new Error(LOGOUT));
  }
};
