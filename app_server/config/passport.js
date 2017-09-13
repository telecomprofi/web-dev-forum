'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Profile = mongoose.model('Profile');

//======================================
// Administrator initialization
//======================================

// Save admin and his profile in database
let admin = new User();

let adminName = 'Jon';
let adminSurname = 'Snow';
let adminEmail = 'admin@forum.ua';
let adminPassword = 'Password1';
let adminRole = 'Admin';

admin.name = adminName;
admin.surname = adminSurname;
admin.email = adminEmail;
admin.setPassword(adminPassword);
admin.role = adminRole;

User.findOne({ email: admin.email }, (err, existingAdmin) => {
  if (err) {
    return;
  }

  if (!existingAdmin) {
    admin.save((err, admin, next) => {
      if (err) {
        return next(err);
      }
    }).then((admin) => {

      // Create a profile for the administrator
      let adminProfile = new Profile();

      let adminNickname = 'admin';
      let adminBio = 'Administrator';
      let adminLocation = 'Winterfell';

      adminProfile.user = admin._id;
      adminProfile.nickname = adminNickname;
      adminProfile.bio = adminBio;
      adminProfile.location = adminLocation;
      adminProfile.setImage(admin.email);

      adminProfile.save((err, newAdminProfile, next) => {
        if (err) {
          return next(err);
        }
        
        admin.profile = newAdminProfile._id;
        
        // Save reference to the profile for the admin
        admin.save((err, admin, next) => {
          if (err) {
            return next(err);
          }
        });
      });
    }).catch((err) => {
      console.log(err);
    });
  
  }

});

//======================================
// Passport Local Strategy
//======================================

const localOptions = { 
  usernameField: 'email',
  session: false
};

// Setting up local strategy
passport.use(new LocalStrategy(localOptions,
  function(username, password, done) {
  
    User.findOne({email: username}, (err, user) => {
      if (err) {
        return done(err);
      }
      
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      
      return done(null, user);
    });
  }
));

//======================================
// Passport JWT Strategy
//======================================

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SECRET
};

// Setting up JWT login strategy
passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
  
    User.findById(payload._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false, {
          message: 'User is not found.'
        });
      }
    });
  })
);
