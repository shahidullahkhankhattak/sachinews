module.exports = {
  db: {
    connectUrl: 'mongodb://localhost:27017/sachinews',
  },
  jwt: {
    expireSessionTime: 86400, // 1 day
    secret: 'sachi news is awesome',
  },
  bcrypt: {
    salt: 10,
  },
  resStatuses: {
    // success
    resSuccess: 200,
    // forbidden
    resForBidden: 403,
    // bad request
    resBadRequest: 400,
    // server error
    resServerError: 500,
    // unproccesible entity,
    resUnprocessibleEntity: 422,
    // unauthenticated
    resUnAuthenticated: 401,
    // conflict (alrady exists)
    resConflict: 409,
    // server was unable to complete the request completely
    resIncomplete: 417,
  },
  sitemap: {
    hostname: 'http://www.sachinews.com',
  },
};
