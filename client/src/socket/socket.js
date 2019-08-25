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

export const socketEmitter = (socket, event, data) => {
  console.log(event, data);

  socket.emit(event, data);
};
