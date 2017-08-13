var express = require('express');
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening 2.');
    next(); // make sure we go to the next routes and don't stop here
});
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

/* set constants */
var statuses = [
  {code: '1', name: 'Sposato'},
  {code: '2', name: 'Celibe'},
  {code: '3', name: 'Divorziato'}
];

/* crete hash to store profiles and a variable to store next profile ID */
var storedProfiles = {};
var nextProfileID = 0;

/* GET job list. */
router.get('/joblist', function(req, res, next) {
  var jobs = [
    {code: '1', name: 'Architetto'},
    {code: '2', name: 'Cuoco'},
    {code: '3', name: 'Impiegato'},
    {code: '4', name: 'Commesso'},
    {code: '5', name: 'Elettricista'},
    {code: '6', name: 'Manager'},
    {code: '7', name: 'Consulente'},
  ];
  var data = {};
  data.results = jobs;
  res.send(data);
});

/* GET avatar list. */
router.get('/avatarlist', function(req, res, next) {
  var avatars = [
    {name: 'Architetto',
    age: '37',
    status: statuses[0],
    image: 'assets/images/Architetto.png',
    goals: [{name: 'Prima Casa', icon: 'home'}, 
            {name: 'Moto', icon: 'motorcycle'}]},
    {name: 'Cuoco',
    age: '31',
    status: statuses[1],
    image: 'assets/images/Cuoco.png',
    goals: [{name: 'Prima Casa', icon: 'home'}, 
            {name: 'Ristorante', icon: 'cutlery'}]},
    {name: 'Commesso',
    age: '21',
    status: statuses[1],
    image: 'assets/images/Commesso.png',
    goals: [{name: 'Prima Casa', icon: 'home'}, 
            {name: 'Ristorante', icon: 'cutlery'}]},
    {name: 'Manager',
    age: '41',
    status: statuses[0],
    image: 'assets/images/Manager.png',
    goals: [{name: 'Prima Casa', icon: 'home'}, 
            {name: 'Ristorante', icon: 'cutlery'}, 
            {name: 'Ristorante', icon: 'cutlery'}, 
            {name: 'Ristorante', icon: 'cutlery'}]},
    {name: 'Elettricista',
    age: '39',
    status: statuses[0],
    image: 'assets/images/Elettricista.png',
    goals: [{name: 'Prima Casa', icon: 'home'}, 
            {name: 'Ristorante', icon: 'cutlery'}]},
    {name: 'Consulente',
    age: '49',
    status: statuses[0],
    image: 'assets/images/Consulente.png',
    goals: [{name: 'Prima Casa', icon: 'home'}, 
            {name: 'Ristorante', icon: 'cutlery'}]}
  ];
  var data = {};
  data.results = avatars;
  res.send(data);
});

/* GET status list. */
router.get('/statuslist', function(req, res, next) {
  var data = {};
  data.results = statuses;
  res.send(data);
});

/* PUT to save a profile. */
/* PUT chosen over POST according to https://stackoverflow.com/questions/630453/put-vs-post-in-rest */
router.put('/saveprofile', function(req, res, next) {
  var profile = req.body;
  var profileId = profile.id;
  if (!profileId) {
    profileId = nextProfileID;
    nextProfileID++;
  }
  storedProfiles[profileId] = profile;
  console.log('stored profiles', storedProfiles);
  var data = {};
  data.results = profileId;
  res.send(data);
});
/* GET profile. */
router.get('/getprofile', function(req, res, next) {
  profileId = req.query.id;
  var data = {};
  data.results = storedProfiles[profileId];
  res.send(data);
});

module.exports = router;
