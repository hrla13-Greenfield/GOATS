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
  console.log(`connected to ${PORT}`);
});

const io = require('socket.io')(server);

const rooms = {};

// standard user connection through browser
io.on('connection', (socket) => {
  console.log('a user connected!');
  socket.on('disconnect', (socket) => {
    console.log('a user disconnected!');
<<<<<<< HEAD
  });
  socket.on('init-game', (info) => {
    socket.broadcast.emit('init-game', info);
    console.log(`this is opponent ${info}`);
  });
  socket.on('init-game2', (info) => {
    socket.broadcast.emit('init-game2', info);
    console.log(`this is something ${info}`);
  });
  socket.on('count', (counter) => {
    socket.broadcast.emit('count', counter);
    console.log(`this is the count ${counter}`);
  });
});
=======
  })
  socket.on('count', function(counter) {
    socket.broadcast.emit('count', counter)
    console.log('this is the count ' + counter)
  })
  // socket.on('new-user', function(user) {
  //   var user = {
  //     userid: this.id,
  //     userScore: 0
  //   }
  //   rooms[this.id] = user,
  //   console.log("this is rooms", rooms);
  // })
  // socket.on('count', function(count) {
  //   user.userScore = count
  //   console.log("this is user score ", user.userScore)
  // })

})
>>>>>>> added rating, need to finish

module.exports = app;
