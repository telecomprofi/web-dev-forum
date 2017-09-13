'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Profile = mongoose.model('Profile');

//=========================================
// Get One Profile
//=========================================
module.exports.profilesReadOne = function(req, res) {
  const userId = req.user._id;

  if (req.params && req.params.userId) {
    
    if (userId.toString() !== req.params.userId) {
      res.status(403).json({ message: 'You do not have permissions to view this profile.' });
      return;
    }
    
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
      
        Profile
          .findById({_id: foundUser.profile})
          .populate(
            {
              path: 'user',
              select: 'name surname email banned createdAt'
            }
          )
          .exec((error, foundProfile) => {
            if (!foundProfile) {
              res.status(404).json({ message: 'ProfileId not found.' });
              return;
            } else if (error) {
              res.status(404).json(error);
              return;
            }

            res.status(200).json(foundProfile);
          });
      });
  } else { 
    res.status(404).json({ message: 'No userId in request.' });
  }
};

//=========================================
// Update One User With Profile
//=========================================
module.exports.profilesUpdateOne = function(req, res) {
  const userId = req.user._id;
  const name = req.body.name;
  const surname = req.body.surname;
  const password = req.body.password;
  const nickname = req.body.nickname;
  const bio = req.body.bio;
  const location = req.body.location;

  if (req.params && req.params.userId) {
    
    if (userId.toString() !== req.params.userId) {
      res.status(403).json({ message: 'You do not have permissions to update this profile.' });
      return;
    }
    
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
      
        if (!name || !surname) {
          res.status(400).json({ message: 'Name and surname required.' });
          return;
        }
        
        foundUser.name = name;
        foundUser.surname = surname;
        
        if (password) {
          foundUser.setPassword(password);
        }

        foundUser.save((error, updatedUser, next) => {
          if (error) { 
            return next(error);
          }
        }).then((updatedUser) => {
          // Update user profile
          Profile
            .findById({_id: updatedUser.profile})
            .exec((error, foundProfile) => {
              if (!foundProfile) {
                res.status(404).json({ message: 'ProfileId not found.' });
                return;
              } else if (error) {
                res.status(404).json(error);
                return;
              }

              foundProfile.nickname = nickname;
              foundProfile.bio = bio;
              foundProfile.location = location;
            
              foundProfile.save((error, updatedProfile, next) => {
                if (error) { 
                  return next(error);
                }
              }).then((updatedProfile) => {
                Profile
                  .findById({_id: updatedProfile._id})
                  .populate(
                    {
                      path: 'user',
                      select: '_id name surname email banned createdAt'
                    }
                  )
                  .exec((err, updatedProfile, next) => {
                    if (err) {
                      return next(err);
                    }

                    res.status(200).json(updatedProfile);
                });
                
              });
            });
        });

        }).catch((error) => {
        res.status(500).json(error);
    });
  } else { 
    res.status(404).json({ message: 'No userId in request.' });
  }
};

//=========================================
// Get Public Profile For Certain User
//=========================================
module.exports.profilesReadOnePublic = function(req, res) {
  let publicProfile = {};
  
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
      
        Profile
          .findById({_id: foundUser.profile})
          .populate(
            {
              path: 'user',
              select: 'name surname banned createdAt'
            }
          )
          .exec((error, foundProfile) => {
            if (!foundProfile) {
              res.status(404).json({ message: 'ProfileId not found.' });
              return;
            } else if (error) {
              res.status(404).json(error);
              return;
            }

            publicProfile.name = foundProfile.user.name;
            publicProfile.surname = foundProfile.user.surname;
            publicProfile.banned = foundProfile.user.banned;
            publicProfile.createdAt = foundProfile.user.createdAt;
            publicProfile.nickname = foundProfile.nickname;
            publicProfile.image = foundProfile.image;
            publicProfile.bio = foundProfile.bio;
            publicProfile.location = foundProfile.location;
          
            res.status(200).json(publicProfile);
          });
      });
  } else { 
    res.status(404).json({ message: 'No userId in request.' });
  }
};
