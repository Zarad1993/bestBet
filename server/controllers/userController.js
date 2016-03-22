var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

var models = require('../config/db');
var Users = models.Users;
var Users_Traits = models.Users_Traits;

var findUser = function(userName){
  return Users.findOne({where:{userName:userName},raw:true});
};

var addUser = function (userDetails) {
  var cipher = Promise.promisify(bcrypt.hash);
  cipher(userDetails.password, null,null).then(function(hash) {
    Users.create({userName: userDetails.userName,
                  name: userDetails.name,
                  password: hash})
         .then(function(user){
            console.log('UUUUUUUUUUU444SER:',user);
            var traitCombo = [Math.floor(Math.random()*3+1),Math.floor(Math.random()*3+4),Math.floor(Math.random()*3+7)].join('');
            var data = {userId: user.id, traitCombo: traitCombo};
            setUserTraits(data);
         })
  });
};

var checkPass = function (userName, attPassword, callback) {
  findUser(userName).then(function(user) {
    if (!user) {
      return callback(false);
    };
    bcrypt.compare(attPassword, user.password, function(err,match){
      match ? callback(match,user) : callback(match);
    })
  });
};

var getUserTraits = function(userId){
  return Users_Traits.findOne({where: {userId: userId}, raw: true, attributes: ['traitCombo']});
};

var setUserTraits = function(data){
  return Users_Traits.findOrCreate({where: {userId: data.userId}, raw: true, defaults:{traitCombo: data.traitCombo}})
              .spread(function(user, created) {
                //If user already exists, update traits
                if(!created){
                  Users_Traits.update({traitCombo: data.traitCombo}, {where: {userId: data.userId}, raw: true})
                              .then(function(result){
                                console.log('User traits updated:',result);
                              }, function(error){
                                console.log('User traits update failed:',error);
                              });
                }
              })
};

module.exports = {
  findUser: findUser,
  addUser: addUser,
  checkPass: checkPass,
  getUserTraits: getUserTraits,
  setUserTraits: setUserTraits
};
