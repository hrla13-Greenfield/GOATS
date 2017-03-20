const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const myRouter = require(`${__dirname}/api/router.js`);
const app = express();
const cors = require('cors');

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(express.static('./output'));
app.use('/api', myRouter);
app.use(cors());

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
     // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/output/index.html`);
});
const server = app.listen(port, () => {
  console.log(`connected to ${port}`);
});

const io = require('socket.io')(server);

const rooms = {};

// standard user connection through browser
io.on('connection', (socket) => {
  console.log('a user connected!');
  socket.on('disconnect', (socket) => {
    console.log('a user disconnected!');
  });
  socket.on('init-game', (info) => {
    socket.broadcast.emit('init-game', info);
    console.log(`this is opponent ${info}`);
  });
  socket.on('init-game2', (info) => {
    socket.broadcast.emit('init-game2', info);
    console.log(`this is something ${info}`);
  });
  socket.on('ready-up', (ready) => {
    socket.broadcast.emit('ready-up', ready);
    console.log(`this is the ready ${ready}`);
  });
  socket.on('count', (counter) => {
    socket.broadcast.emit('count', counter);
    console.log(`this is the count ${counter}`);
  });
  socket.on('end', (data) => {
    socket.disconnect();
  });
});


module.exports = app;
