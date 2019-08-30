import { Clients } from './types';

import { onSocketDisconnect } from './socketGeneral';
import {
  subscribeToPlayerRegister,
  subscribeToSendOrientation,
} from './socketSubscriptions';

import { detectMobile, generateUniqueID } from '../../../general/helpers.js';
import {
  SOCKET_GENERAL,
  SOCKET_MANAGE,
} from '../../../general/socketConsts.js';

// Saving clients right here until they leave
const clients: Clients = {};

const initSocketServer = (io: any): void => {
  io.on(SOCKET_GENERAL.CONNECTION, (socket: any) => {
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
      clients[userID] = { clientID: userID, socket, players: [] };
      socket.emit(SOCKET_MANAGE.REGISTER_CLIENT, userID);
    } else {
      socket.emit(SOCKET_MANAGE.REGISTER_PLAYER_ID, userID);
    }

    // DEV ONLY: To check succesful connection
    socket.emit('event', 'test emit');

    // Socket events
    subscribeToPlayerRegister(collection);
    subscribeToSendOrientation(collection);

    // General events
    onSocketDisconnect(collection);
  });
};

export default initSocketServer;
