// All listeners on client events - e.g. socket.on(...)
import { SOCKET_ACTIONS } from '../../general/socketConsts.js';

export const onPlayerRegister = ({ socket, clients }) => {
  // Only possible on a phone??
  socket.on(SOCKET_ACTIONS.REGISTER_PLAYER, enteredID => {
    // check client is defined
    // if (!isMobile && clients[enteredID]) {
    //   console.log('sock pr', enteredID);
    //   return;
    // }

    const client = clients[enteredID];

    const data = {
      result: enteredID,
      message: !!client
        ? `You joined Gameroom: ${enteredID} as player`
        : `Gameroom ID: ${enteredID} doesn not exist`,
    };

    socket.emit(SOCKET_ACTIONS.RESULT_REGISTER_PLAYER, data);
  });
};
