import io from 'socket.io-client';

export const initSocket = ({ url, config = {} }) => {
  const socket = io(url, config);

  // Needs to be able to pass a callback
  socket.on('connect', () => {
    console.log('connected');
  });

  // placeholder event
  socket.on('event', () => {
    console.log('event');
  });

  // Needs to be able to pass a callback
  socket.on('disconnect', () => {
    console.log('disconnected');
  });

  return socket;
};

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

export const socketEmitter = (socket, event, data) => {
  console.log(event, data);

  socket.emit(event, data);
};
