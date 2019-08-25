// All listeners on client events - e.g. socket.on(...)

exports.onPlayerRegister = ({ socket, clients }) => {
  // Only possible on a phone??
  socket.on('register-player', enteredID => {
    // check client is defined
    // if (!isMobile && clients[enteredID]) {
    //   console.log('sock pr', enteredID);
    //   return;
    // }

    const client = clients[enteredID];

    const data = {
      result: enteredID,
      message: !!client
        ? `You joined Gameroom: ${enteredID} as player`
        : `Gameroom ID: ${enteredID} doesn not exist`,
    };

    socket.emit('result-register-player', data);
  });
};
