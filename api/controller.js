const request = require('request');
const db = require('./db/schema');

exports.createUser = function (req, res) {

};

exports.createGroup = function (req, res) {

};

exports.createHistory = function (req, res) {

};

var getBearer = function(cb) {
  var options = { method: 'POST',
  url: 'https://api.yelp.com/oauth2/token',
  headers: 
   { 'postman-token': 'c465c84a-3343-1ece-227e-07bd5a1d10b8',
     'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded' },
  form: 
   { client_id: '9JNu_Qv6gcSDeJfRp0QeJw',
     client_secret: '7PgGA0q6SORkr8xaB1Be568k648NrVK5B0ACV65ZcXpcW4bRfYr2ADphGkXZ4YYV',
     grant_type: 'client_credentials' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  cb(body);
});
}


exports.getBars = function (req, res) {
 var cb = function(token) {
  var bearer = JSON.parse(token).access_token;
   var options = { method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    qs: 
    { term: 'bars',
      category_filter: 'bars',
      location: '90024',
      sort_by: 'rating',
      limit: '50' },
    headers: 
    { 'postman-token': '93676d7e-657a-46fd-71fc-a9b2fcf909a5',
      'cache-control': 'no-cache',
      authorization: 'Bearer '+bearer } };
      console.log(options.headers);
  request( options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
    res.end();
    return;
  });
}
getBearer(cb);
}



exports.getClubs = function (req, res) {
 var cb = function(token) {
  var bearer = JSON.parse(token).access_token;
   var options = { method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    qs: 
    { term: 'clubs',
      category_filter: 'danceclubs',
      location: '90024',
      sort_by: 'rating',
      limit: '50' },
    headers: 
    { 'postman-token': '93676d7e-657a-46fd-71fc-a9b2fcf909a5',
      'cache-control': 'no-cache',
      authorization: 'Bearer '+bearer } };
      console.log(options.headers);
  request( options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
    res.end();
    return;
  });
}
getBearer(cb);
}

exports.getActivity = function (req, res) {
 var cb = function(token) {
  var bearer = JSON.parse(token).access_token;
   var options = { method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    qs: 
    { term: req.body.term,
      category_filter: req.body.filter,
      location: req.body.zip,
      sort_by: 'rating',
      limit: '50' },
    headers: 
    { 'postman-token': '93676d7e-657a-46fd-71fc-a9b2fcf909a5',
      'cache-control': 'no-cache',
      authorization: 'Bearer '+ bearer } };
      console.log(options.headers);
  request( options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
    res.end();
    return;
  });
}
getBearer(cb);
}




