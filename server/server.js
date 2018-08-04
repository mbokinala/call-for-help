const express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server running')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/request', (req, res) => {
  res.sendFile(__dirname + '/request.html');
});

app.get('/help.mp3', (req, res) => {
  res.sendFile(__dirname + '/help.mp3');
});

io.sockets.on('connection', (socket) => {
  connections.push(socket);
  console.log('Connected : %s sockets connected', connections.length);

  //Disconnect
  socket.on('disconnect', (socket) => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });

  socket.on('need help', (data) => {
    console.log('Request received');
    io.sockets.emit('need help');
  })
});
