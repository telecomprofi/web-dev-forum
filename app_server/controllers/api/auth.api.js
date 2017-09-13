'use strict';

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Profile = mongoose.model('Profile');

const util = require('../utilities/helper');

//=========================================
// Registration Route
//=========================================
module.exports.register = function(req, res) {
  
  const email = req.body.email;
  const name = req.body.name;
  const surname = req.body.surname;
  const password = req.body.password;
  
  if (!name || !surname || !email || !password) {
    util.sendJsonResponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  
  User.findOne({ email: email }, (err, existingUser, next) => {
    if (err) { 
      return next(err);
    }

    // If user is not unique, return message
    if (existingUser) {
      res.status(422).json({ message: 'That email address is already in use.' });
      return;
    }

    // If email is unique and password was provided, create account
    let user = new User();
    
    user.email = email;
    user.name = name;
    user.surname = surname;
    user.setPassword(password);

    user.save((err, newUser, next) => {
      if (err) { 
        return next(err);
      }

      // Create a profile for the new user
      let userProfile = new Profile();
      
      userProfile.user = newUser._id;
      userProfile.setImage(newUser.email);
      
      userProfile.save((err, newUserProfile, next) => {
        if (err) {
          return next(err);
        }
        
        newUser.profile = newUserProfile._id;
        
        newUser.save((err, user, next) => {
          if (err) {
            return next(err);
          }
        }).then((user) => {
          User
            .findById({_id: user._id})
            .populate({path: 'profile'})
            .exec((err, user, next) => {
              if (err) {
                return next(err);
              }
            
              res.status(201).json({
                token: user.generateJwt(),
                user: user
              });
          });
        });
        
      });
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  
};

//=========================================
// Login Route
//=========================================
module.exports.login = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  
  if (!email || !password) {
    util.sendJsonResponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  
  passport.authenticate('local', (err, user, info) => {
    let token;
    
    if (err) {
      util.sendJsonResponse(res, 404, err);
      return;
    }
    
    if (user) {
      User
        .findById({_id: user._id})
        .populate({path: 'profile'})
        .exec((err, user, next) => {
          if (err) {
            return next(err);
          }

          res.status(200).json({
            token: user.generateJwt(),
            user: user
          });
      });

    } else {
      util.sendJsonResponse(res, 401, info);
    }
  })(req, res);
  
};

//=========================================
// Authorization Middleware
//=========================================

// Role authorization check
exports.roleAuthorization = function (requiredRole) {
  return function (req, res, next) {
    const user = req.user;

    User.findById(user._id, (err, foundUser) => {
      if (err) {
        res.status(422).json({ "message": "No user was found." });
        return next(err);
      }
      
      // If user was found, check role.
      if (foundUser.role === requiredRole) {
        return next();
      }

      return res.status(401).json({ "message": "You are not authorized to view this content." });
    });
  };
};

//=========================================
// Check Permission Middleware
//=========================================

// user restriction check
exports.userRestriction = function () {
  return function (req, res, next) {
    const user = req.user;

    User.findById(user._id, (err, foundUser) => {
      if (err) {
        res.status(422).json({ "message": "No user was found." });
        return next(err);
      }
      
      // If user was found, check restriction.
      if (!foundUser.banned) {
        return next();
      }

      return res.status(403).json({ "message": "Your account is banned! You do not have permission to perform this operation." });
    });
  };
};
