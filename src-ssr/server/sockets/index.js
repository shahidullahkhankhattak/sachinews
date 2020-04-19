const bindScrapTestEvents = require('./events/scrapTest');
const { checkSocketAuth } = require('../middleware/auth');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.use(checkSocketAuth);
    bindScrapTestEvents(socket);
  });
};
