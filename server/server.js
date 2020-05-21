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
let usersInChatRoom = [];

io.sockets.on('connection', socket => {
  connections.push(socket.id);
  console.log('Connected: %s sockets connected ' + connections.length);

   // Disconnect
   socket.on('disconnect', data => {
    chatRooms.splice(chatRooms.indexOf(socket.room), 1);
    console.log('Disconnected: %s chatRooms connected ' + chatRooms.length);
    users.splice(users.indexOf(socket.username), 1);
    console.log('Disconnected: %s users connected ' + users.length);
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected ' + connections.length);
  });
  
  // Send Message
  socket.on('sendMessage', message => {
    io.to(`${socket.room}`).emit('message', { msg: message, user: socket.username });
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
    socket.room = chatRoomName.chatRoom;
    chatRooms.push(socket.room);
    console.log(`Connected to room ${chatRoomName.chatRoom} chatRooms: ${chatRooms.length}`);
    socket.join(`${chatRoomName.chatRoom}`);

    // Getting socket IDS from that ChatRoom
    // io.of('/').in(`${chatRoomName.chatRoom}`).clients((error, clients) => {
    //   if (error) throw error;
    //   for(let i = 0; i < clients.length; i++) {
    //     if(socket.id == clients[i]) {  
    //       usersInChatRoom.push(socket.username);
    //         // io.sockets.emit('getUsers', clients);
    //       }
    //     }
    // });

    io.to(socket.id).emit('welcomeToRoom', `Welcome to room ${chatRoomName.chatRoom}`);
    socket.to(`${chatRoomName.chatRoom}`).emit('hasJoinedRoom', `${socket.username} has joined ${chatRoomName.chatRoom}`);
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