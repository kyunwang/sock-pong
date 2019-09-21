import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import https from 'https';
import io from 'socket.io';

import socketServer from './socket/socket';
console.log(__dirname);

const options = {
  key: fs.readFileSync(__dirname + '/../../certs/localhost+3-key.pem'),
  cert: fs.readFileSync(__dirname + '/../../certs/localhost+3.pem'),
}


const app = express();
const httpServer = https.createServer(options, app);
const ioServer = io.listen(httpServer, {
  transports: ['websocket', 'xhr-polling'],
});

dotenv.config({path: '../.env'});

socketServer(ioServer);

app.get('/', (req, res) => {
  console.log(req.header('x-forwarded-for') || req.connection.remoteAddress);
  res.send('<p>you found a page </p>');
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server on port: ${process.env.PORT}`);
});
