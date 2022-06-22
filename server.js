import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import {Server} from 'socket.io'
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(process.cwd()+ '/login.html');
  });

app.get('/chat', (req, res) => {
    res.sendFile(process.cwd()+ '/index.html');
  });

io.on('connection', (socket) => {

socket.on('add username', (username) => {
      socket.username = username;
      console.log(username + " is connected")
      io.emit('user notification',username)
    });

socket.on('chat message', (data) => {
      console.log('recieved: '+ data.username + data.msg);
      io.emit('chat message', data);
    });

  });


  server.listen(3000, () => {
    console.log('listening on *:3000');
  });