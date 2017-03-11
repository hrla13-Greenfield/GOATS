const myRouter = require('express').Router();
const controller = require('./controller');

myRouter.route('/')
  .get((req, res) => {

  })
  .post((req, res) => {
  });

myRouter.route('/users')
  .get((req, res) => {

  })
  .post((req, res) => {
    controller.createUser(req, res)

  });

module.exports = myRouter;
