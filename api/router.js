const myRouter = require('express').Router();
const controller = require('./controller');
const fs = require('fs');
const Mustache  = require('mustache');


myRouter.route('/users')
  .get((req, res) => {
    controller.returnUserData(req, res);
  })
  .post((req, res) => {
    controller.createUser(req, res);
  });

myRouter.route('/users/history')
 .post((req, res) => {
   controller.createHistory(req, res);
 });
myRouter.route('/users/groups')
  .get((req, res) => {
    
  })
  .post((req, res) => {
    controller.addToGroup(req, res);
  })
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
