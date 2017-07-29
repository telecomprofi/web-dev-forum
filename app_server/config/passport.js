const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = mongoose.model('User');

const localOptions = { 
  usernameField: 'email',
  session: false
};

// Save admin in database
let admin = new User();

let adminName = 'admin';
let adminEmail = 'admin@forum.ua';
let adminPassword = 'password';

admin.name = adminName;
admin.email = adminEmail;
admin.setPassword(adminPassword);

User.findOne({ email: admin.email }, function(err, existingAdmin) {
  if (err) { 
    return next(err);
  }

  if (!existingAdmin) {
    admin.save(function(err, admin) {
      if (err) {
        return next(err);
      }
    });
  }

});

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
    }
  )}
));
