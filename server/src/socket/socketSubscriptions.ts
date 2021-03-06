// All listeners on client events - e.g. socket.on(...)
import { SOCKET_MANAGE, SOCKET_GAME } from '../../../general/socketConsts.js';
import { Params, RegisterPlayer, SendOrientation } from './types';

export const subscribeToPlayerRegister = ({ socket, clients }: Params) => {
  socket.on(
    SOCKET_MANAGE.REGISTER_PLAYER,
    ({ playerID, entryID }: RegisterPlayer) => {
      const client = clients[entryID];

      const data = {
        result: entryID,
        message: `You joined Gameroom: ${entryID} as player`,
      };

      if (!client) {
        (data.result as any) = false;
        data.message = `Gameroom: ${entryID} doesn't not exist`;
      } else if (client.players.length < 2) {
        client.players = [...client.players, { playerID, socket }];
      } else {
        data.message = `Gameroom ${entryID} already has two players`;
      }

      // Send result to requesting constroller
      socket.emit(SOCKET_MANAGE.RESULT_REGISTER_PLAYER, data);
      // To viewer
      client.socket.emit(SOCKET_MANAGE.RESULT_REGISTER_PLAYER, {
        ...data,
        playerID,
      });
    }
  );
};

export const subscribeToSendOrientation = ({ socket, clients }: Params) => {
  socket.on(
    SOCKET_GAME.SEND_ORIENTATION,
    ({ orientation, roomID, playerID }: SendOrientation) => {
      const data = {
        orientation,
        playerID,
      };
      clients[roomID].socket.emit(SOCKET_GAME.RECEIVE_ORIENTATION, data);
      // clients[roomID].players.forEach(player => {
      //   player.socket.emit(SOCKET_GAME.RECEIVE_ORIENTATION, orientation);
      // });
    }
  );
};
