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

// app.get('/', function(req, res){
//     res.send('./src/containers/Login/login.jsx')
// });

// socket installation for server-side
const io = require('socket.io')(server);

// connection established once page is loaded
io.on('connection', function(socket) {
  console.log('a user connected!');
  socket.on('user', function(user) {
    console.log("this is a user? ", user)
  })
  socket.on('count', function(counter) {
    socket.broadcast.emit('count', counter)
    console.log('this is the count ' + counter)
  })
  socket.on('disconnect', function(socket) {
    console.log('a user disconnected!');
  })
})

module.exports = app;
