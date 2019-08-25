const {
  generateUniqueID,
  detectMobile,
  readySocketData,
} = require('../helpers');

const { onSocketDisconnect } = require('./socketGeneral');
const { onPlayerRegister } = require('./socketSubscriptions');

// Saving clients right here until they leave
const clients = {};

module.exports = io => {
  io.on('connection', socket => {
    const userAgent = socket.handshake.headers['user-agent'];
    const isMobile = detectMobile(userAgent);
    const userID = generateUniqueID();

    const package = {
      socket,
      userAgent,
      isMobile,
      userID,
      clients,
    };

    // Register a game viewer - desktopish
    if (!isMobile) {
      clients[userID] = socket;
      socket.emit('register-client', userID);
    }

    socket.emit('event', 'test emit'); // DEV ONLY: To check succesful connection

    // Socket events
    onPlayerRegister(package);

    // General events
    onSocketDisconnect(package);
  });
};
