import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import io from 'socket.io';

import socketServer from './socket/socket.js';

const app = express();
const httpServer = http.createServer(app);
const ioServer = io.listen(httpServer, {
  transports: ['websocket', 'xhr-polling'],
});

dotenv.config({ path: '../.env' });

socketServer(ioServer);

// app.get('/', (req, res) => {
//   console.log(req.header('x-forwarded-for') || req.connection.remoteAddress);
//   res.send('<p>thats it</p>');
// });

httpServer.listen(process.env.PORT, () => {
  console.log(`Server on port: ${process.env.PORT}`);
});
