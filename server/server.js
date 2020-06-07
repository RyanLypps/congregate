const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const index = require('./routes/chat');
const path = require('path');
const bodyParser = require('body-parser');
const mysqlConnection = require('./connection/connection');

const chatRoutes = require('./routes/chat');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/', chatRoutes);

app.use(express.static('dist'));
app.use(index);

const server = http.createServer(app);
const io = socketIO(server);


app.get('/messenger', (req, res) => {

  res.sendFile(path.join(__dirname, '../dist/index.html'));
  
});

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

    connections.splice(connections.indexOf(socket.id), 1);
    console.log('Disconnected: %s sockets connected ' + connections.length);

    for (let i = 0; i < usersInChatRoom.length; i++) {
      if (usersInChatRoom[i].id == socket.id) {
        usersInChatRoom.splice(i, 1);
      }
    }

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
      console.log(`Connected to room ${chatRoomInfo.chatRoom}.` + ' ' + 'Amt of People in chatrooms: ' + chatRooms.length);
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

  // Leave chatroom
  socket.on('leaveChatRoom', data => {
    if (usersInChatRoom.filter(user => user.id == socket.id).length == 1) {
      let rightUser = usersInChatRoom.filter(user => user.id == socket.id);
      socket.leave(`${rightUser[0].chatRoomName}`);

      // Gets rid of user of chatroom array
      for (let i = 0; i < usersInChatRoom.length; i++) {
        if (usersInChatRoom[i].id == socket.id) {
          usersInChatRoom.splice(i, 1);
        }
      }
      console.log(`Disconnected: %s users connected to chatrooms: ` + usersInChatRoom.length);

      chatRooms.splice(chatRooms.indexOf(socket.room), 1);
      console.log('Disconnected: %s chatRooms connected ' + chatRooms.length);

      // Sends right users in Right in rooms
      io.to(socket.room).emit('onlineUsers', {
        users: getUsersInRightChatRooms(socket.room),
      });

      // User leaves chat
      io.to(socket.room).emit('leftChat', `${socket.username} has left the room.`);

      socket.room = '';
      socket.username = '';

    }
  });

  let getUsersInRoom = (chatRoomName, username, id) => {
    let userInRoom = { chatRoomName, username, id, inRoom };
    usersInChatRoom.push(userInRoom);
  };

  let getUsersInRightChatRooms = (chatRoomName) => {
    return usersInChatRoom.filter(user => user.chatRoomName == chatRoomName);
  };

  let removeUserFromChatRoom = (username) => {
    return usersInChatRoom.splice(user => user.username == username);
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