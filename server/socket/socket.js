const {
  generateUniqueID,
  detectMobile,
  readySocketData,
} = require('../helpers');

const { onPlayerRegister } = require('./socketListeners');

// Saving clients right here until they leave
const clients = {};

// const listeners = [
//   {
//     event: 'subscribe-player-register',
//     callback: onPlayerRegister,
//   },
// ];

module.exports = io => {
  io.on('connection', (socket, req) => {
    const userAgent = socket.handshake.headers['user-agent'];
    const isMobile = detectMobile(userAgent);
    const userID = generateUniqueID();
    console.log(userID);

    // Register a game viewer - desktopish
    if (!isMobile) {
      clients[userID] = socket;
      socket.emit('register-client', userID);
      console.log(111);
    }

    socket.emit('event', ' event');

    // later write down io or socket depending on the event/listener
    // listeners.forEach(({ event, callback }) => {});
    io.on('subscribe-player-register', e => {
      console.log('sub pr', e);
    });
  });
};
