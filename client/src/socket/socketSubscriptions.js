import { SOCKET_ACTIONS } from '../../../general/socketConsts';

export const subscribeToClientRegister = (socket, callback) => {
  socket.on(SOCKET_ACTIONS.REGISTER_CLIENT, uniqueID => callback(uniqueID));
};

export const subscribeToPlayerRegister = (socket, callback) => {
  socket.on(SOCKET_ACTIONS.RESULT_REGISTER_PLAYER, data => callback(data));
};

// export const subscribeToPlayerRegister = (socket, callback) => {
//   // socket.on('subscribe-player-register', data => callback(data));
//   socket.on('subscribe-player-register', data => callback(data));
// };

// export const subscribeToPlayerExit = (socket, callback) => {} ??
// export const subscribeToAudienceRegister = (socket, callback) => {};

// simple template *wink wink*
// export const subscribeTo = (socket, callback) => {
//   socket.on('eventTosubscribeTo', data => callback(data));
// };
