// Easier to manage like this instead of a general function
import { SOCKET_MANAGE, SOCKET_GAME } from '../../../general/socketConsts';

export const emitRegisterPlayer = ({ socket, data }) => {
  socket.emit(SOCKET_MANAGE.REGISTER_PLAYER, data);
};

export const emitSendOrientation = ({ socket, data }) => {
  socket.emit(SOCKET_GAME.SEND_ORIENTATION, data);
};

// export const socketEmitter = (socket, event, data) => {
//   socket.emit(event, data);
// };
