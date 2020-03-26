module.exports = {
  db: {
    connectUrl: 'mongodb://localhost:27017/addictive_bulletin',
  },
  jwt: {
    expireSessionTime: 86400, // 1 day
    secret: 'addictive bulletin is awesome',
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
  },
};
