
const http = require('http');
const socketio = require('socket.io');
const cors = require('./cors');
const apiRoutes = require('./api/routes');
const bindSocketEvents = require('./sockets');
const SitemapController = require('./controllers/sitemapController');
const RobotsController = require('./controllers/robotsController');
const SitemapValidator = require('./validators/sitemapValidator');


const port = process.env.PORT || 8081;

const bindSocketIo = (app) => {
  const server = http.createServer(app);
  const socket = socketio.listen(server);
  socket.origins((_origin, callback) => {
    callback(null, true);
  });
  server.listen(port).on('error', (err) => {
    console.log(err);
  });
  bindSocketEvents(socket);
};

module.exports = function ({ app }) {
  if (process.env.NODE_ENV === 'development') {
    bindSocketIo(app);
  }
  app.use(cors);
  app.use('/api/v1', apiRoutes);
  app.get('/:lang/sitemap.xml', [SitemapValidator.validate], SitemapController.index);
  app.get('/robots.txt', RobotsController.robotsTxt);
};
