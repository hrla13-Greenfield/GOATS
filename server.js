const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const myRouter = require(`${__dirname}/server/router.js`);
const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(express.static('./output'));
app.use('/api', myRouter);

app.listen(port, () => {
  console.log('connected to port 8000');
});


module.exports = app;
