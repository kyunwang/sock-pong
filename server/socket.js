module.exports = io => {
  io.on('connection', socket => {
    socket.emit('event', ' event');
  });
};
