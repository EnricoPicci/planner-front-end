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
/* set Avatars */
var avatars = [
  {name: 'Architetto',
  age: 37,
  status: statuses[0],
  image: 'assets/images/Architetto.png',
  goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', age: 50, value: 100000}, 
          {name: 'Auto', icon: 'motori/motori.png', age: 60, value: 20000}]},
  {name: 'Cuoco',
  age: 31,
  status: statuses[1],
  image: 'assets/images/Cuoco.png',
  goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', age: 50, value: 100000}, 
          {name: 'Auto', icon: 'motori/motori.png', age: 60, value: 20000}]},
  {name: 'Commesso',
  age: 21,
  status: statuses[1],
  image: 'assets/images/Commesso.png',
  goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', age: 50, value: 100000}, 
          {name: 'Auto', icon: 'motori/motori.png', age: 60, value: 20000}]},
  {name: 'Manager',
  age: 41,
  status: statuses[0],
  image: 'assets/images/Manager.png',
  goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', age: 50, value: 100000}, 
          {name: 'Auto', icon: 'motori/motori.png', age: 55, value: 10000}, 
          {name: 'Auto', icon: 'motori/motori.png', age: 60, value: 20000}, 
          {name: 'Auto', icon: 'motori/motori.png', age: 65, value: 30000}]},
  {name: 'Elettricista',
  age: 39,
  status: statuses[0],
  image: 'assets/images/Elettricista.png',
  goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', age: 50, value: 100000}, 
          {name: 'Auto', icon: 'motori/motori.png', age: 60, value: 20000}]},
  {name: 'Consulente',
  age: 49,
  status: statuses[0],
  image: 'assets/images/Consulente.png',
  goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', age: 50, value: 100000}, 
          {name: 'Auto', icon: 'motori/motori.png', age: 60, value: 20000}]}
];

/* crete hash to store profiles and a variable to store next profile ID */
var storedProfiles = {};
var nextProfileID = 0;

/* generate random numbers */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

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
  var data = {};
  data.results = avatars;
  res.send(data);
});
/* POST request to get Avatar list for a certain profile. */
router.post('/avatars4profile', function(req, res, next) {
  var profile = req.body;
  console.log('profile to retrieve list of avatars', profile);
  var data = {};
  if (profile.age < 35) {
    data.results = avatars.filter(avatar => avatar.age <= 40);
  } else {
    data.results = avatars.filter(avatar => avatar.age > 40);
  }
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

/* GET goal type list. */
router.get('/goaltypelist', function(req, res, next) {
  var goaltypes = [
    {code: '1', name: 'Immobili', icon: 'proprieta/immobili.png', age: 50, value: 100000}, 
    {code: '2', name: 'Motori', icon: 'motori/motori.png', age: 60, value: 20000}, 
    {code: '3', name: 'Viaggi', icon: 'viaggi/viaggi.png'}, 
    {code: '4', name: 'Anniversari', icon: 'famiglia/famiglia.png'}, 
    {code: '5', name: 'Collezioni', icon: 'collezioni/collezioni.png'}
  ];
  var data = {};
  data.results = goaltypes;
  res.send(data);
});

/* POST projection. */
router.post('/projection', function(req, res, next) {
  var profile = req.body;
  console.log('profile for projection', profile);
  var profileAge = parseInt(profile.age);
  var years = 100 - profileAge;
  var incoming = [];
  var outgoing = [];
  var saving = [];

  var randomNumber = getRandomArbitrary(20, 40);
  
  for (var i = 0; i < years; i++) {
    year = i + profileAge;
    var yearlyIncoming = {
      'name': year,
      'value': Math.sin(i/randomNumber)*50
    };
    incoming.push(yearlyIncoming);
    var yearlyOutgoing = {
      'name': year,
      'value': Math.cos(i/(randomNumber*1.5))*20
    };
    outgoing.push(yearlyOutgoing);
    var yearlySaving = {
      'name': year,
      'value': Math.tan(i/(randomNumber*3))*50
    };
    saving.push(yearlySaving);
  }
  var projection = [
    {
      "name": "Entrate",
      "series": incoming
    },
  
    {
      "name": "Uscite",
      "series": outgoing
    },
  
    {
      "name": "Risparmi",
      "series": saving
    }
  ];
  var data = {};
  data.results = projection;
  res.send(data);
});

module.exports = router;
