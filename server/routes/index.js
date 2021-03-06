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

/* get projection data  */
var projectionData = require ('./backend-grafici-response-data');
var projectionDataResponse = projectionData.projectionResponse;

/* set statuses */
var statuses = [
  {code: '1', name: 'Sposato'},
  {code: '2', name: 'Celibe'},
  {code: '3', name: 'Divorziato'}
];
/* set goal types */
var goaltypes = [
  {code: '1', name: 'Immobili', icon: 'proprieta/immobili.png', value: 200000}, 
  {code: '2', name: 'Motori', icon: 'motori/motori.png', value: 20000}, 
  {code: '3', name: 'Viaggi', icon: 'viaggi/viaggi.png', value: 5000}, 
  {code: '4', name: 'Anniversari', icon: 'famiglia/famiglia.png', value: 10000}, 
  {code: '5', name: 'Collezioni', icon: 'collezioni/collezioni.png', value: 100000}, 
  {code: 'pip',
    name: 'Piano Pensione',
    icon: 'ic_redeem_black_24dp/web/ic_redeem_black_24dp_1x.png',
    value: 0},
  {code: 'pac',
    name: 'Piano di Accumulo',
    icon: 'ic_account_balance_black_24dp/web/ic_account_balance_black_24dp_1x.png',
    value: 0},
  {code: 'life-ins',
    name: 'Protezione',
    icon: 'ic_security_black_24dp/web/ic_security_black_24dp_1x.png',
    value: 0}
];
/* set job types */
var jobs = [
  {code: '1', name: 'Architetto'},
  {code: '2', name: 'Cuoco'},
  {code: '3', name: 'Impiegato'},
  {code: '4', name: 'Commesso'},
  {code: '5', name: 'Elettricista'},
  {code: '6', name: 'Manager'},
  {code: '7', name: 'Consulente'},
];
/* set Avatars */
var propertyGoal = goaltypes.filter(goalType => goalType.code == '1')[0];
var motorGoal = goaltypes.filter(goalType => goalType.code == '2')[0];
var avatars = [
  {name: 'Architetto',
  age: '37',
  planDuration: 25,
  yearlySavings: 25000,
  status: statuses[0],
  image: 'assets/images/Architetto.png',
  goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', type: propertyGoal, age: 50, value: 100000,
            debtYearlyRate: 0, debtDuration: 0},
          {name: 'Auto', icon: 'motori/motori.png', type: motorGoal, age: 40, value: 20000}]},
  {name: 'Cuoco',
  age: '31',
  planDuration: 30,
  yearlySavings: 10000,
  status: statuses[1],
  image: 'assets/images/Cuoco.png',
  goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', type: propertyGoal, age: 40, value: 100000,
            debtYearlyRate: 0, debtDuration: 0},
          {name: 'Auto', icon: 'motori/motori.png', type: motorGoal, age: 35, value: 20000}]},
  {name: 'Commesso',
  age: '21',
  planDuration: 30,
  yearlySavings: 5000,
  status: statuses[1],
  image: 'assets/images/Commesso.png',
  goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', type: propertyGoal, age: 40, value: 200000,
            debtYearlyRate: 0, debtDuration: 0},
          {name: 'Auto', icon: 'motori/motori.png', type: motorGoal, age: 30, value: 20000}]},
  {name: 'Manager',
  age: '41',
  planDuration: 30,
  yearlySavings: 20000,
  status: statuses[0],
  image: 'assets/images/Manager.png',
  goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', type: propertyGoal, age: 50, value: 100000,
            debtYearlyRate: 0, debtDuration: 0},
          {name: 'Auto', icon: 'motori/motori.png', type: motorGoal, age: 55, value: 10000},
          {name: 'Auto', icon: 'motori/motori.png', type: motorGoal, age: 60, value: 20000},
          {name: 'Auto', icon: 'motori/motori.png', type: motorGoal, age: 65, value: 30000}]},
  {name: 'Elettricista',
  age: '39',
  planDuration: 20,
  yearlySavings: 10000,
  status: statuses[0],
  image: 'assets/images/Elettricista.png',
  goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', type: propertyGoal, age: 45, value: 100000,
            debtYearlyRate: 0, debtDuration: 0},
          {name: 'Auto', icon: 'motori/motori.png', type: motorGoal, age: 50, value: 20000}]},
  {name: 'Consulente',
  age: '49',
  planDuration: 30,
  yearlySavings: 15000,
  status: statuses[0],
  image: 'assets/images/Consulente.png',
  goals: [{name: 'Prima Casa', icon: 'proprieta/immobili.png', type: propertyGoal, age: 50, value: 100000,
            debtYearlyRate: 0, debtDuration: 0},
          {name: 'Auto', icon: 'motori/motori.png', type: motorGoal, age: 60, value: 20000}]}
];

/* crete dictionary to store profiles and a variable to store next profile ID */
var storedProfiles = {};
var nextProfileID = 0;

/* generate random numbers */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/* GET job list. */
router.get('/joblist', function(req, res, next) {
  var data = {};
  data.results = jobs;
  res.send(data);
});

/* GET avatar list. */
router.get('/avatarlist', function(req, res, next) {
  var data = {};
  data.results = avatars;
  console.log('avatars  returned', data.results);
  res.send(data);
});
/* POST request to get Avatar list for a certain profile. */
router.post('/avatars4profile', function(req, res, next) {
  var profile = req.body;
  console.log('params to retrieve list of avatars', profile);
  var data = {};
  if (profile.age < 35) {
    data.results = avatars.filter(avatar => avatar.age <= 40);
  } else {
    data.results = avatars.filter(avatar => avatar.age > 40);
  }
  console.log('avatars  returned', data.results);
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
  if (profileId === null) {
    profile.id = nextProfileID;
    nextProfileID++;
  }
  storedProfiles[profile.id] = profile;
  console.log('profile saved', JSON.stringify(profile, undefined, 2));
  var data = {};
  data.results = profile.id;
  res.send(data);
});
/* GET profile. */
router.get('/getprofile', function(req, res, next) {
  profileId = req.query.id;
  console.log('profile id requested', profileId);
  var data = {};
  data.results = storedProfiles[profileId];
  console.log('profile returned', data.results);
  res.send(data);
});
/* GET all profiles */
router.get('/getallprofiles', function(req, res, next) {
  var allProfilesArray = [];
  for(profileId in storedProfiles) {
    allProfilesArray.push(storedProfiles[profileId]);
  }
  var data = {};
  data.results = allProfilesArray;
  res.send(data);
  console.log('get all saved profiles', allProfilesArray);
});


/* GET goal type list. */
router.get('/goaltypelist', function(req, res, next) {
  var data = {};
  data.results = goaltypes;
  res.send(data);
});

/* POST projection. */
router.post('/projection', function(req, res, next) {
  var profile = req.body;
  console.log('profile for projection', JSON.stringify(profile, undefined, 2));
  var data = {};
  data.results = projectionDataResponse;
  res.send(data);
});

module.exports = router;
