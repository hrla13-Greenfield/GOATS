const myRouter = require('express').Router();
const controller = require('./controller');
const fs = require('fs');
const Mustache  = require('mustache');


myRouter.route('/signin')
  .get((req, res) => {
  var view = {};
  var html = Mustache.to_html(loadLogin(), view);
  response.send(html);
});

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
