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

app.get('/*', function(req, res) {
  res.sendFile(__dirname+'/output/index.html')
})
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
  })
  socket.on('init-game', (info) => {
    socket.broadcast.emit('init-game', info);
    console.log(`this is opponent ${info}`);
  })
  socket.on('init-game2', (info) => {
    socket.broadcast.emit('init-game2', info);
    console.log(`this is something ${info}`);
  });
  socket.on('count', (counter) => {
    socket.broadcast.emit('count', counter);
    console.log(`this is the count ${counter}`);
  });
});



module.exports = app;
