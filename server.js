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

// socket acknowledges if a user has connected or disconnected
const server = app.listen(PORT, () => {
  console.log('connected to ' + PORT);
});

// need to get user information
// get user
// app.get()

// socket installation for server-side
const io = require('socket.io')(server);

// need to authenticate user and give user a specific id to identiy which score it owns
// somewhere in here needs to call get user to get user information
// requires AUTH - 0 and user schema identification to be finished to proceed

io.on('connection', function(socket) {
  console.log('a user connected!');
  socket.on('count', function(counter) {
    socket.broadcast.emit('count', counter)
    console.log('this is the count ' + counter)
  })
  socket.on('disconnect', function(socket) {
    console.log('a user disconnected!');
  })
})

// users are able to communicate with each other through the game


module.exports = app;
