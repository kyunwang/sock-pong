import io from 'socket.io-client';
import { SOCKET_GENERAL } from '../../../general/socketConsts';

export const initSocket = ({ url, config = {} }) => {
  const socket = io(url, config);

  // Needs to be able to pass a callback
  socket.on(SOCKET_GENERAL.CONNECT, () => {
    console.log('connected');
  });

  // placeholder event
  socket.on('event', () => {
    console.log('event');
  });

  // Needs to be able to pass a callback?
  socket.on(SOCKET_GENERAL.DISCONNECT, () => {
    console.log('disconnected');
  });

  return socket;
};

export const socketEmitter = (socket, event, data) => {
  console.log(event, data);

  socket.emit(event, data);
};
