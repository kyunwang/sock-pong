import { SOCKET_MANAGE } from '../../../general/socketConsts';

export const subscribeToClientRegister = (socket, callback) => {
  socket.on(SOCKET_MANAGE.REGISTER_CLIENT, uniqueID => callback(uniqueID));
};

export const subscribeToPlayerIDRegister = (socket, callback) => {
  socket.on(SOCKET_MANAGE.REGISTER_PLAYER_ID, data => callback(data));
};

export const subscribeToPlayerRegister = (socket, callback) => {
  socket.on(SOCKET_MANAGE.RESULT_REGISTER_PLAYER, data => callback(data));
};

// export const subscribeToPlayerExit = (socket, callback) => {} ??
// export const subscribeToAudienceRegister = (socket, callback) => {};

// simple template *wink wink*
// export const subscribeTo = (socket, callback) => {
//   socket.on('eventTosubscribeTo', data => callback(data));
// };
