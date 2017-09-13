'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//======================================
// Answer Schema
//======================================

const answerSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  responseText: {
    type: String,
    required: true
  },
  thread: {
    type: Schema.Types.ObjectId,
    ref: 'Thread'
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  dislikes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  rating: {
    type: Number,
    default: 0
  },
  isUseful: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Answer', answerSchema);
