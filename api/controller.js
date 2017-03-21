const request = require('request');
const db = require('./db/schema');

//Stores a new user in the database
exports.createUser = function (req, res) {
  const newuser = db.User.build({
    username: req.query.username,
    current: null,
    points: '0',
    image: null,
  });
  newuser.save()
  .then((record) => {
    res.send(record);
  });
};

//Update profile picture from Profile component
exports.updatePic = function (req, res) {
  db.User.update(
    { image: req.body.url },
    { where: { id: req.body.userid } })
  .then((result) => {
    res.send(result);
  });
};

//Change rating from Profile component
exports.chooseRating = function (req, res) {
  db.UserHistory.update(
    { user_rating: req.body.rating },
    { where: { id: req.body.historyid } })
  .then((result) => {
    res.send(result);
  });
};

//Deletes a single history item from Profile page
exports.deletehistory = function (req, res) {
  console.log(req.body.historyid, "this is history id")
  db.UserHistory.destroy({ where: { id: req.body.historyid } })
  .then(() => {
    res.send("Success")
  })
  .catch(() => {
    res.sendStatus(500);
  });
};

//Create a new group, then add originating user to usergroups junction table
exports.createGroup = function (req, res) {
  const newGroup = db.Group.build({
    name: req.query.groupName,
  });
  newGroup.save().then((result) => {
    const newUserGroup = db.userGroup.build({
      GroupId: result.id,
      UserId: req.query.userID,
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
};

//Accept a request (profile page) adds the affected user to UserGroups junction table, then destroys invite record
exports.acceptRequest = function (requestID, req, res) {
  db.PendingInvites.find({ where: { id: requestID } })
  .then((result) => {
    console.log(result);
    const newMember = db.UserGroup.build({
      UserId: result.UserId,
      GroupId: result.GroupId,
    });
    newMember.save()
    .then((record) => {
      db.PendingInvites.destroy({ where: { id: requestID } });
      res.send('Success');
    })
    .catch((err) => {
      res.sendStatus(500);
    });
  });
};

//Destroys pendinginvite 
exports.declineRequest = function (requestID, req, res) {
  db.PendingInvites.destroy({ where: { id: requestID } })
  .then(() => {
    res.send('Success');
  })
  .catch((err) => {
    res.sendStatus(500);
  });
};

//Adds pendinginvite record to affected user
exports.addToGroup = function (req, res) {
  db.User.findOne({ where: { username: req.body.friendName } }).then((results) => {
    if (results) {
      const newRequest = db.PendingInvites.build({
        sentBy: req.body.userID,
        UserId: results.id,
        GroupId: req.body.groupID,
      });
      newRequest.save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      res.sendStatus(500);
    }
  })
  .catch((err) => {
    res.sendStatus(500);
  });
};

// Populates redux store with information that should be readily accessible.
// Called when page refreshes, user logs in, or change is made to DB
exports.returnUserData = function (req, res) {
  const cb = function (usergroups, userid, points, image, current) {
    db.PendingInvites.findAll({ where: { UserId: userid } })
    .then((invites) => {
      db.UserHistory.findAll({ where: { userId: userid } })
      .then((history) => {
        const finalObj = {
          history,
          invites,
          usergroups,
          userid,
          image,
          points,
          current,
        };
        res.send(finalObj);
      })
     .catch((err) => {
       res.sendStatus(500);
     });
    })
  .catch((err) => {
    res.sendStatus(500);
  });
  };

  db.User.findOne({ where: { username: req.query.username } })
  .then((results) => {
    db.UserGroup.findAll({
      where: { userId: results.id },
    })
    .then((groupIDs) => {
      const myGroups = [];
      for (let i = 0; i < groupIDs.length; i++) {
        myGroups.push(groupIDs[i].GroupId);
      }
      db.Group.findAll({
        include: [
          { model: db.User,
            through: {
              where: { GroupId: myGroups },
            } },
        ],
      })
      .then((data) => {
        cb(data, results.id, results.points, results.image, results.current);
      });
    });
  });
};

// Adds selection to user's history page
exports.createHistory = function (req, res) {
  const location = JSON.stringify(req.body.selection.location);
  const categories = JSON.stringify(req.body.selection.categories);
  const history = db.UserHistory.build({
    name: req.body.selection.name,
    url: req.body.selection.url,
    image: req.body.selection.image_url,
    address: location,
    open_hours: req.body.selection.is_closed,
    category: categories,
    phone: req.body.selection.display_phone,
    UserId: req.body.userID,
  });
  history.save()
.then(() => {
  db.User.findOne({ where: { id: req.body.userID } })
.then((result) => {
  result.update({ current: history.id });
});
})
.then(result => res.send(result));
};

//Bearer token valid for 180 days. 
// TO DO .. Create a functiont to check if bearer token is still valid and request a new token if necessary
const getBearer = function (cb) {
  cb('SdD00ggp7OHQgJemq0WJjtjf_LjFvvydOwCVxc1t3tYBCAXCShdoWNlWlOV-hGVp6l-Uvkq8PDVpX5atIxgw_MPQOdVg7qksvS3QCZOqMN_8k42TnaLBEvIQ0h3CWHYx');
  // const options = { method: 'POST',
  //   url: 'https://api.yelp.com/oauth2/token',
  //   headers:
  //   { 'postman-token': 'c465c84a-3343-1ece-227e-07bd5a1d10b8',
  //     'cache-control': 'no-cache',
  //     'content-type': 'application/x-www-form-urlencoded' },
  //   form:
  //   { client_id: '9JNu_Qv6gcSDeJfRp0QeJw',
  //     client_secret: '7PgGA0q6SORkr8xaB1Be568k648NrVK5B0ACV65ZcXpcW4bRfYr2ADphGkXZ4YYV',
  //     grant_type: 'client_credentials' } };

  // request(options, (error, response, body) => {
  //   if (error) throw new Error(error);

  //   cb(body);
};

// Generic query to access YELP api based on search terms passed in
// Offset is used to access the next 50 results on BROWSE page
exports.getActivity = function (req, res, query) {
  let offset;
  if (req.query.offset === undefined) {
    offset = 0;
  } else {
    console.log('OFFSEEEETTT', req.query.offset);
    offset = req.query.offset;
  }
  const cb = function (token) {
    const bearer = token;
    const options = { method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/search',
      qs:
      { term: query.term,
        category_filter: query.filter,
        location: query.zip,
        sort_by: 'rating',
        limit: '50',
        offset: req.query.offset,
        radius_filter: '25000',
      },
      headers:
      { 'postman-token': '93676d7e-657a-46fd-71fc-a9b2fcf909a5',
        'cache-control': 'no-cache',
        authorization: `Bearer ${bearer}` } };
    console.log(options.headers);
    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      console.log('booooooody', body);
      res.send(body);
      res.end();
    });
  };
  getBearer(cb);
};

