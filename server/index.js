require('dotenv');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http, {
  transports: ['websocket', 'xhr-polling'],
});

require('dotenv').config({ path: '../.env' });

const socketServer = require('./socket/socket');

socketServer(io);

// app.get('/', (req, res) => {
//   console.log(req.header('x-forwarded-for') || req.connection.remoteAddress);
//   res.send('<p>thats it</p>');
// });

http.listen(process.env.PORT, () => {
  console.log(`Server on port: ${process.env.PORT}`);
});
