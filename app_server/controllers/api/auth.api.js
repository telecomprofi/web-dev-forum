'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const util = require('../utilities/helper');

// Saves a unique user in the database
module.exports.register = function(req, res, next) {
  
  const email = req.body.email;
  const name = req.body.name;
  const surname = req.body.surname;
  const password = req.body.password;
  
  if (!name || !email || !password) {
    util.sendJsonResponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { 
      return next(err);
    }

    // If user is not unique, return message
    if (existingUser) {
      return res.status(422).send({ message: 'That email address is already in use.' });
    }

    // If email is unique and password was provided, create account
    let user = new User();
    
    user.email = email;
    user.name = name;
    user.surname = surname;
    user.setPassword(password);

    user.save(function(err, user) {
      if (err) { 
        return next(err); 
      }

      res.status(201).json({
        token: user.generateJwt(),
        user: user
      });
      
    });
  });
  
};

// Checks whether the user is registered in the database
module.exports.login = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  
  if (!email || !password) {
    util.sendJsonResponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  
  passport.authenticate('local', function(err, user, info) {
    let token;
    
    if (err) {
      util.sendJsonResponse(res, 404, err);
      return;
    }
    
    if (user) {
      res.status(200).json({
        token: user.generateJwt(),
        user: user
      });
      
    } else {
      util.sendJsonResponse(res, 401, info);
    }
  })(req, res);
  
};
