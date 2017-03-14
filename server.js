const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const myRouter = require(`${__dirname}/api/router.js`);
const app = express();

const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(express.static('./output'));
app.use('/api', myRouter);

app.listen(PORT, () => {
  console.log('connected to ' + PORT);
});


module.exports = app;
