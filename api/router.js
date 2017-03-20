const myRouter = require('express').Router();
const controller = require('./controller');
const fs = require('fs');
const db = require('./db/schema');


myRouter.route('/groups')
  .post((req, res) => {
    const newGroup = db.Group.build({
      name: req.body.groupName,
    });
    newGroup.save().then((result) => {
      const newUserGroup = db.UserGroup.build({
        GroupId: result.id,
        UserId: req.body.userID,
      });
      newUserGroup.save().then((record) => {
        res.send('Success');
      })
      .catch((err) => {
        console.log(err, 'error!!!!');
        res.sendStatus(500);
      });
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
  });

myRouter.route('/users/picture')
  .post((req, res) => {
    controller.updatePic(req, res);
  });

myRouter.route('/users/rating')
  .post((req, res) => {
    controller.chooseRating(req, res);
  });

myRouter.route('/users')
  .get((req, res) => {
    db.User.findAll({ where: { username: req.query.username } })
    .then((result) => {
      if (result.length === 0) {
        controller.createUser(req, res);
      } else {
        controller.returnUserData(req, res);
      }
    });
  });

myRouter.route('/users/invites')
  .post((req, res) => {
    if (req.body.type === 'acc') {
      controller.acceptRequest(req.body.reqid, req, res);
    } else if (req.body.type === 'del') {
      controller.declineRequest(req.body.reqid, req, res);
    }
  });

myRouter.route('/users/deletehistory')
  .post((req, res) => {
    controller.deletehistory(req, res);
  });

myRouter.route('/users/history')
 .post((req, res) => {
   controller.createHistory(req, res);
 });

myRouter.route('/users/groups')
  .post((req, res) => {
    controller.addToGroup(req, res);
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
    let query = req.query;
    controller.getActivity(req, res, query);
  });

module.exports = myRouter;
