const eventConstants = require('../../../../src/sockets/constants');

const {
  SCRAP_TEST,
} = eventConstants;
module.exports = (socket) => {
  socket.on(SCRAP_TEST, (data) => {
    console.log(data);
  });
};
