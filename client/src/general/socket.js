import io from 'socket.io-client';

const initSocket = ({ url, config = {} }) => {
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
};

const subscribeTo = (socket, callback) => {
  socket.on('eventTosubscribeTo', data => callback(data));
};

export { initSocket, subscribeTo };
