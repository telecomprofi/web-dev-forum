'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

//======================================
// Profile Schema
//======================================

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  nickname: {
    type: String,
    default: ''
  },
  image: {
    small: String,
    medium: String,
    large: String
  },
  bio: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  }
},
{
  timestamps: true
});

/**
 * Creates the encoded hash for getting images with specific sizes
 * from https://www.gravatar.com
 * with saving them to the database
 * @param {String} email
 * @returns void
 */
profileSchema.methods.setImage = function(email){
  const gravatarURL = 'https://www.gravatar.com/avatar';

  let strForHash = email.toLowerCase();
  let hash = crypto.createHash('md5').update(strForHash).digest("hex");
  
  this.image.small = `${gravatarURL}/${hash}?s=25&d=identicon`;
  this.image.medium = `${gravatarURL}/${hash}?s=60&d=identicon`;
  this.image.large = `${gravatarURL}/${hash}?s=150&d=identicon`;
};

module.exports = mongoose.model('Profile', profileSchema);
