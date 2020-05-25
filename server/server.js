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
let inRoom = false;

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
    usersInChatRoom.splice(usersInChatRoom.indexOf(socket.id), 1);

    // User leaves chat
    io.to(socket.room).emit('leftChat', `${socket.username} has left the chat.`);

    // Sends right users in Right in rooms
    io.to(socket.room).emit('onlineUsers', {
      users: getUsersInRightChatRooms(socket.room),
    });
    console.log(`Disconnected: %s users connected to chatrooms: ` + usersInChatRoom.length);
  });

  // Send Message
  socket.on('sendMessage', message => {
    io.to(`${socket.room}`).emit('message', { msg: message, user: socket.username });
  });

  // New User
  socket.on('newUser', chatRoomInfo => {
  
    if (usersInChatRoom.filter(users => users.id == socket.id).length == 0) {

      getUsersInRoom(chatRoomInfo.chatRoom, chatRoomInfo.username, socket.id);

      socket.username = chatRoomInfo.username;
      users.push(socket.username);
      console.log('Connected: %s users connected ' + users.length);

      socket.room = chatRoomInfo.chatRoom;
      chatRooms.push(socket.room);
      console.log(`Connected to room ${chatRoomInfo.chatRoom}`);
      socket.join(`${chatRoomInfo.chatRoom}`);

      // Sends right users in Right in rooms
      io.to(chatRoomInfo.chatRoom).emit('onlineUsers', {
        users: getUsersInRightChatRooms(chatRoomInfo.chatRoom),
      });
      // Welcomes User to Room
      io.to(socket.id).emit('welcomeToRoom', `Welcome to room ${chatRoomInfo.chatRoom}`);

      // Tells other users that new user has joined
      socket.to(`${chatRoomInfo.chatRoom}`).emit('hasJoinedRoom', `${socket.username} has joined ${chatRoomInfo.chatRoom}`);
    }
  });

  // Join ChatRoom
  // socket.on('joinChatRoom', chatRoomName => {
  //   // console.log(usersInChatRoom.filter(users => users.id == socket.id));
  //   // if (usersInChatRoom.filter(users => users.inRoom == false).length >= 1 ) {

  //     socket.room = chatRoomName.chatRoom;
  //     chatRooms.push(socket.room);
  //     console.log(`Connected to room ${chatRoomName.chatRoom}`);
  //     socket.join(`${chatRoomName.chatRoom}`);

  //     // Sends right users in Right in rooms
  //     io.to(chatRoomName.chatRoom).emit('onlineUsers', {
  //       users: getUsersInRightChatRooms(chatRoomName.chatRoom),
  //     });
  //     // Welcomes User to Room
  //     io.to(socket.id).emit('welcomeToRoom', `Welcome to room ${chatRoomName.chatRoom}`);

  //     // Tells other users that new user has joined
  //     socket.to(`${chatRoomName.chatRoom}`).emit('hasJoinedRoom', `${socket.username} has joined ${chatRoomName.chatRoom}`);
  //   // }
  // });

  let getUsersInRoom = (chatRoomName, username, id) => {
    let userInRoom = { chatRoomName, username, id, inRoom };
    usersInChatRoom.push(userInRoom);
  };

  let getUsersInRightChatRooms = (chatRoomName) => {
    return usersInChatRoom.filter(user => user.chatRoomName == chatRoomName);
  };

});

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

// module.exports = app;

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