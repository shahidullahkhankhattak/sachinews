const adminRoutes = require('./admin');

module.exports = function ({ app }) {
  adminRoutes({ app });
};
