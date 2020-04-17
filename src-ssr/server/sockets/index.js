const bindScrapTestEvents = require('./events/scrapTest');

module.exports = (io) => {
  io.on('connection', (socket) => {
    bindScrapTestEvents(socket);
  });
};
