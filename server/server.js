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

// require('./io/io.js')(server);

io.on('connection', socket => {
  console.log('connected');
  // socket.emit('message', 'welcome')

  socket.on('sendMessage', message => {
    console.log('Ryan: ' + message);
    io.emit('message', message)
  })
});

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

// module.exports = app;