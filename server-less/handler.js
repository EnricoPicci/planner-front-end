'use strict';


/* set statuses */
var statuses = [
  {code: '1', name: 'Sposato-a'},
  {code: '2', name: 'Celibe'},
  {code: '3', name: 'Divorziato-a'}
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
  {code: '8', name: 'Free Lance'},
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
          {name: 'Auto', icon: 'motori/motori.png', type: motorGoal, age: 60, value: 20000}]},
  {name: 'Free Lance',
  age: '41',
  planDuration: 30,
  yearlySavings: 18000,
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

function buildResponse(results) {
  const data = {};
  data.results = results;
  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };
  addHeadersForCORS(response);
  return response;
}

function addHeadersForCORS(response) {
  response.headers = {
    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
  }
}

// ******************************************************************************************************************

module.exports.getJobList = (event, context, callback) => {
  var data = {};
  data.results = jobs;
  let response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };
  addHeadersForCORS(response);

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};


module.exports.getAvatarlist = (event, context, callback) => {
  var data = {};
  data.results = avatars;
  console.log('avatars  returned', data.results);
  let response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };
  addHeadersForCORS(response);

  callback(null, response);
};
module.exports.avatars4profile = (event, context, callback) => {
  var profile = JSON.parse(event.body);
  console.log('params to retrieve list of avatars', profile);
  console.log('age', profile.age);
  var data = {};
  if (profile.age < 40) {
    data.results = avatars.filter(avatar => avatar.age <= 40);
  } else {
    data.results = avatars.filter(avatar => avatar.age > 30);
  }
  console.log('avatars  returned', data.results);
  let response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };
  addHeadersForCORS(response);

  callback(null, response);
};

module.exports.getStatusList = (event, context, callback) => {
  const response = buildResponse(statuses);
  callback(null, response);
};

module.exports.saveProfile = (event, context, callback) => {
  const profile = JSON.parse(event.body);
  const profileId = profile.id;
  if (profileId === null) {
    profile.id = nextProfileID;
    nextProfileID++;
  }
  storedProfiles[profile.id] = profile;
  console.log('profile saved', JSON.stringify(profile, undefined, 2));
  const response = buildResponse(profile.id);
  callback(null, response);
};
// /* GET profile. */
// router.get('/getprofile', function(req, res, next) {
//   profileId = req.query.id;
//   console.log('profile id requested', profileId);
//   var data = {};
//   data.results = storedProfiles[profileId];
//   console.log('profile returned', data.results);
//   res.send(data);
// });
// /* GET all profiles */
// router.get('/getallprofiles', function(req, res, next) {
//   var allProfilesArray = [];
//   for(profileId in storedProfiles) {
//     allProfilesArray.push(storedProfiles[profileId]);
//   }
//   var data = {};
//   data.results = allProfilesArray;
//   res.send(data);
//   console.log('get all saved profiles', allProfilesArray);
// });
