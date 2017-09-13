'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

const util = require('../utilities/helper');

//=========================================
// Get All Users
//=========================================
module.exports.getUsers = function(req, res) {
  User
    .find({})
    .populate({
      path: 'profile',
      select: 'nickname image'
    })
    .exec((error, users) => {
      if (!error){
        util.sendJsonResponse(res, 200, users);
      } else {
        util.sendJsonResponse(res, 400, error);
      }
  });
};

//=========================================
// Get One User
//=========================================
module.exports.usersReadOne = function(req, res) {
  if (req.params && req.params.userId) {
    User
      .findById({_id: req.params.userId})
      .populate({path: 'profile'})
      .exec((error, foundUser) => {
        if (!foundUser) {
          res.status(404).json({ message: 'UserId not found.' });
          return;
        } else if (error) {
          res.status(404).json(error);
          return;
        }
        res.status(200).json({
          user: foundUser
        });
      });
  } else { 
    res.status(404).json({ message: 'No userId in request.' });
  }
};

//=========================================
// Update One User With Control
//=========================================
module.exports.usersUpdateOneWithControl = function(req, res) {
  const banned = req.body.banned;
  
  if (req.params && req.params.userId) {
    User
      .findById({_id: req.params.userId})
      .exec((error, foundUser) => {
        if (!foundUser) {
          res.status(404).json({ message: 'UserId not found.' });
          return;
        } else if (error) {
          res.status(404).json(error);
          return;
        }
      
        foundUser.banned = banned;
      
        foundUser.save((error, updatedUser) => {
           if (error) {
             res.status(404).json(error);
           } else {
             res.status(200).json(updatedUser);
           }
         });

      });
  }
  
};
