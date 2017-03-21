const myRouter = require('express').Router();
const controller = require('./controller');
const fs = require('fs');
const db = require('./db/schema');

// Router catches all calls to /api endpoint and uses functions in Controller to respond appropriately

//  /api/groups .post creates a new group record
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

// Updates user's profile picture
myRouter.route('/users/picture')
  .post((req, res) => {
    controller.updatePic(req, res);
  });

//Updates user's rating on a history item
myRouter.route('/users/rating')
  .post((req, res) => {
    controller.chooseRating(req, res);
  });

//Populates store with user's information in DB
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

//Creates new group invite
myRouter.route('/users/invites')
  .post((req, res) => {
    if (req.body.type === 'acc') {
      controller.acceptRequest(req.body.reqid, req, res);
    } else if (req.body.type === 'del') {
      controller.declineRequest(req.body.reqid, req, res);
    }
  });

//Deltes item from user's history (profile page)
myRouter.route('/users/deletehistory')
  .post((req, res) => {
    controller.deletehistory(req, res);
  });

//Adds item to user's history page
myRouter.route('/users/history')
 .post((req, res) => {
   controller.createHistory(req, res);
 });

// Creates pendinginvite to add a new user to a group
myRouter.route('/users/groups')
  .post((req, res) => {
    controller.addToGroup(req, res);
  });

//Generic yelp call based on parameters passed in
myRouter.route('/getActivities')
  .get((req, res) => {
    let query = req.query;
    controller.getActivity(req, res, query);
  });

module.exports = myRouter;
