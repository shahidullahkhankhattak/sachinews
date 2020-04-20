const eventConstants = require('../../../../src/sockets/constants');
const Scrapper = require('../../controllers/scrapper');

const {
  adminEvents: {
    ADMIN_SCRAP_TEST,
  },
} = eventConstants;

module.exports = (socket) => {
  socket.on(ADMIN_SCRAP_TEST, (data) => {
    Scrapper.test(data, socket);
  });
};
