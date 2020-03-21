const cors = require('./cors');
const bindRouter = require('./routes');

module.exports = function ({ app }) {
  app.use(cors);
  bindRouter({ app });
};
