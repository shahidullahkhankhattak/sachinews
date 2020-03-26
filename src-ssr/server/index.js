
const cors = require('./cors');
const apiRoutes = require('./api/routes');

module.exports = function ({ app }) {
  app.use(cors);
  app.use('/api/v1', apiRoutes);
};
