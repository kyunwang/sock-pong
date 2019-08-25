import { detectMobile, generateUniqueID } from '../../general/helpers.js';

import { onSocketDisconnect } from './socketGeneral.js';
import { onPlayerRegister } from './socketSubscriptions.js';
import { SOCKET_GENERAL, SOCKET_ACTIONS } from '../../general/socketConsts.js';

// Saving clients right here until they leave
const clients = {};

const initSocketServer = io => {
  io.on(SOCKET_GENERAL.CONNECTION, socket => {
    const userAgent = socket.handshake.headers['user-agent'];
    const isMobile = detectMobile(userAgent);
    const userID = generateUniqueID();

    const collection = {
      clients,
      isMobile,
      socket,
      userAgent,
      userID,
    };

    // Register a game viewer - desktopish
    if (!isMobile) {
      clients[userID] = socket;
      socket.emit(SOCKET_ACTIONS.REGISTER_CLIENT, userID);
    }

    // DEV ONLY: To check succesful connection
    socket.emit('event', 'test emit');

    // Socket events
    onPlayerRegister(collection);

    // General events
    onSocketDisconnect(collection);
  });
};

export default initSocketServer;
