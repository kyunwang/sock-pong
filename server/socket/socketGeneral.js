// All general socket.io events

// On viewer leaving - remove the socket/room reference
export const onSocketDisconnect = ({ clients, isMobile, socket, userID }) => {
  socket.on('disconnect', reason => {
    if (!isMobile && clients[userID]) {
      delete clients[userID];
    }
  });
};
