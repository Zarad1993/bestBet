// query and controller testers

/*
This code
-- Creates "50 fake users" records
-- Give users default traits
*/

var Users    = require('../config/db').Users;
var userCtrl = require('../controllers/userController.js');

var firstNames = ['joe','bob','jon','al','kim','joan','julie','bee','ann','beth'];
var lastNames = ['a','b','c','d','e','f','g','h','i','j'];

var createFakeUsers = function(num) {
  var y = num-1;
  var numberArray = new Array(num+1).join('1').split('');
  numberArray.forEach(function(v,x){
    var user = {};
    user.name = firstNames[x%10] +' '+ lastNames[y%10];
    user.userName = 'User' + x;
    user.password = 'a';
    userCtrl.findUser(user.userName).then(function(oldUser){
      if(!oldUser){
        userCtrl.addUser(user).then(function(newUser){
          user.userId = newUser.id;
          user.traitCombo = [Math.floor(Math.random()*3+1),Math.floor(Math.random()*3+4),Math.floor(Math.random()*3+7)].join('');
          userCtrl.setUserTraits(user);
        });
      }
    });
    y--;
  })
};

function createTest () {
  var user = {};
  user.name = 'H';
  user.userName = 'H';
  user.password = 'h';
  userCtrl.addUser(user).then(function(newUser){
    user.userId = newUser.id;
    user.traitCombo = [Math.floor(Math.random()*3+1),Math.floor(Math.random()*3+4),Math.floor(Math.random()*3+7)].join('');
    userCtrl.setUserTraits(user);
  });
};

createTest();
createFakeUsers(50);
