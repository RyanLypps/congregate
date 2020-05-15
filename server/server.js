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

io.sockets.on('connection', socket => {
  connections.push(socket);
  console.log('Connected: %s sockets connected ' + connections.length);
  socket.join('BIGBOYS');
  io.to('BIGBOYS').emit('sendMessage', console.log('HELLO IM HERE'));
  console.log(socket)
  
   // Disconnect
   socket.on('disconnect', data => {
    users.splice(users.indexOf(socket.username), 1);
    console.log('Disconnected: %s users connected ' + users.length);
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected ' + connections.length);
  });
  
  // Send Message
  socket.on('sendMessage', message => {
    console.log(message);
    console.log('HELLO IM TRIGGERED');
    io.sockets.emit('message', { msg: message, user: socket.username });
  });

  // New User
  socket.on('newUser', chatRoomInfo => {
    socket.username = chatRoomInfo.username;
    users.push(socket.username);
    console.log('Connected: %s users connected ' + users.length);
    updateUsernames();
  });


  // Gets Users that are Online
  let updateUsernames = () => {
    io.sockets.emit('getUsers', users);
  }

//whatever code

  // io.in('Ghosts').emit('sendMessage', 'the game will start soon');
  //   socket.join('Ghosters');
  //   io.sockets.in('Ghosters').emit('ok',  'ooooookkk');
  // socket.on('ok', data => {
  //     console.log('WORKING')
  // })

  // console.log(socket);

  // good code below

  // socket.on('chatRoomInfo', chatRoomInfo => {
  //   console.log('ChatRoomInfo: '), console.log(chatRoomInfo);
  //   users[socket.id] = chatRoomInfo.username;
  //   io.sockets.emit('chatRoomInfo', chatRoomInfo);
  // });

  // socket.on('sendMessage', message => {

  //   console.log(users[socket.id] + 'MESSAGE: '), console.log(message);
  //   let username = users[socket.id];
  //   io.sockets.emit('chatRoomInfo', { message, username });
  // });
 


});













// io.on('connection', socket => {
//   console.log('connected');
//   // socket.emit('message', 'welcome')

//   socket.on('sendMessage', message => {
//     console.log('Ryan: ' + message);
//     io.emit('message', message)
//   })
// });

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

// module.exports = app;