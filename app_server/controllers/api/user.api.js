const mongoose = require('mongoose');
const User = mongoose.model('User');

const util = require('../utilities/helper');

module.exports.getUsers = function(req, res) {
  User.find({}, function (error, users) {
      if (!error){
        util.sendJsonResponse(res, 200, users);
      } else {
        util.sendJsonResponse(res, 400, error);
      }
  });
};
