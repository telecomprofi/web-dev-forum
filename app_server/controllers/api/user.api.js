const mongoose = require('mongoose');
const User = mongoose.model('User');

let sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getUsers = function(req, res) {
  User.find({}, function (error, users) {
      if (!error){
        sendJsonResponse(res, 200, users);
      } else {
        sendJsonResponse(res, 400, error);
      }
  });
};
