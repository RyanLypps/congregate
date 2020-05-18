const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const index = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(index);

const server = http.createServer(app);
const io = socketIO(server);

let users = [];
let connections = [];
let chatRooms = [];

io.sockets.on('connection', socket => {
  connections.push(socket);
  console.log('Connected: %s sockets connected ' + connections.length);
  // socket.join('BIGBOYS');
  // io.to('BIGBOYS').emit('sendMessage', 'HELLO IM HERE');
  
   // Disconnect
   socket.on('disconnect', data => {
    users.splice(users.indexOf(socket.username), 1);
    console.log('Disconnected: %s users connected ' + users.length);
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected ' + connections.length);
  });
  
  // Send Message
  socket.on('sendMessage', message => {
    io.sockets.emit('message', { msg: message, user: socket.username });
  });

  // New User
  socket.on('newUser', chatRoomInfo => {
    socket.username = chatRoomInfo.username;
    users.push(socket.username);
    console.log('Connected: %s users connected ' + users.length);
    updateUsernames();
  });

  // Join ChatRoom
  socket.on('joinChatRoom', chatRoomName => {
    chatRooms.push(chatRoomName);
    console.log(`Connected to room ${chatRoomName.chatRoom}`);
    socket.join(`${chatRoomName.chatRoom}`);
    io.to(`${chatRoomName.chatRoom}`).emit('sendMessage', `Welcome to room ${chatRoomName.chatRoom}`);

  });

  // Gets Users that are Online
  let updateUsernames = () => {
    io.sockets.emit('getUsers', users);
  }
});

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

// module.exports = app;