import { detectMobile, generateUniqueID } from '../../helpers.js';

import { onSocketDisconnect } from './socketGeneral.js';
import { onPlayerRegister } from './socketSubscriptions.js';

// Saving clients right here until they leave
const clients = {};

const initSocketServer = io => {
  io.on('connection', socket => {
    const userAgent = socket.handshake.headers['user-agent'];
    const isMobile = detectMobile(userAgent);
    const userID = generateUniqueID();

    const stuff = {
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

    // DEV ONLY: To check succesful connection
    socket.emit('event', 'test emit');

    // Socket events
    onPlayerRegister(stuff);

    // General events
    onSocketDisconnect(stuff);
  });
};

export default initSocketServer;
