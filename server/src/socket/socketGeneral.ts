// All general socket.io events
import { SOCKET_GENERAL } from '../../../general/socketConsts.js';
import { Params } from './types';

// On viewer leaving - remove the socket/room reference
export const onSocketDisconnect = ({
  clients,
  isMobile,
  socket,
  userID,
}: Params) => {
  socket.on(SOCKET_GENERAL.DISCONNECT, (reason: string) => {
    const client = clients[userID];
    if (!isMobile && client) {
      delete clients[userID];
    } else if (isMobile && client) {
      // socket.emit('')
    }
  });
};
