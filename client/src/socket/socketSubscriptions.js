import { SOCKET_MANAGE, SOCKET_GAME } from '../../../general/socketConsts';

export const subscribeToClientRegister = (socket, callback) => {
  // Possible to do this to be able to remove the socket listener through an cb
  const cb = uniqueID => callback(uniqueID);
  socket.on(SOCKET_MANAGE.REGISTER_CLIENT, cb);
  return () => socket.removeListener(SOCKET_MANAGE.REGISTER_CLIENT, cb);
};

export const subscribeToPlayerIDRegister = (socket, callback) => {
  socket.on(SOCKET_MANAGE.REGISTER_PLAYER_ID, data => callback(data));
};

export const subscribeToPlayerRegister = (socket, callback) => {
  socket.on(SOCKET_MANAGE.RESULT_REGISTER_PLAYER, data => callback(data));
};

export const subscribeToReceiveOrientation = (socket, callback) => {
  socket.on(SOCKET_GAME.RECEIVE_ORIENTATION, data => callback(data));
};

// export const subscribeToPlayerExit = (socket, callback) => {} ??
// export const subscribeToAudienceRegister = (socket, callback) => {};

// simple template *wink wink*
// export const subscribeTo = (socket, callback) => {
//   socket.on('eventTosubscribeTo', data => callback(data));
// };
