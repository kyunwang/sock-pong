export const subscribeToClientRegister = (socket, callback) => {
  socket.on('register-client', uniqueID => callback(uniqueID));
};

export const subscribeToPlayerRegister = (socket, callback) => {
  // socket.on('subscribe-player-register', data => callback(data));
  socket.on('result-register-player', data => callback(data));
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
