const myRouter = require('express').Router();
const controller = require('./controller');

myRouter.route('/users')
  .get((req, res) => {
    controller.returnUserData(req, res);
  })
  .post((req, res) => {
    controller.createUser(req, res);
  });

myRouter.route('/getBars')
  .get((req, res) => {
    controller.getBars(req, res);
  });

myRouter.route('/getClubs')
  .get((req, res) => {
    controller.getClubs(req, res);
  });

myRouter.route('/getActivities')
  .get((req, res) => {
    var query = req.query;
    controller.getActivity(req, res, query);
  });

module.exports = myRouter;
