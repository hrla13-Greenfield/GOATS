const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const myRouter = require(`${__dirname}/api/router.js`);
const app = express();

const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(express.static('./output'));
app.use('/api', myRouter);


const server = app.listen(PORT, () => {
  console.log('connected to ' + PORT);
});

const io = require('socket.io')(server);

var rooms = {};
    
// standard user connection through browser
io.on('connection', function(socket) {
  console.log('a user connected!');
  socket.on('disconnect', function(socket) {
    console.log('a user disconnected!');
  })
  socket.on('count', function(counter) {
    socket.broadcast.emit('count', counter)
    console.log('this is the count ' + counter)
  })
  // socket.on('new-room', function(room) {
      //  var user = // user information from db?
  //   rooms[this.id] = user,
  //   console.log("this is rooms", rooms);
  // })
})

module.exports = app;
