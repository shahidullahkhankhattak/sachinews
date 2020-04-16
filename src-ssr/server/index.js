
const http = require('http');
const socketio = require('socket.io');
const cors = require('./cors');
const apiRoutes = require('./api/routes');
const bindSocketEvents = require('./socket');

module.exports = function ({ app }) {
  if (process.env.NODE_ENV === 'development') {
    const server = http.createServer(app);
    const socket = socketio.listen(server);
    socket.origins((_origin, callback) => {
      callback(null, true);
    });
    try {
      bindSocketEvents(socket);
    } catch (ex) {
      console.log(ex);
    }
  }
  app.use(cors);
  app.use('/api/v1', apiRoutes);
};
