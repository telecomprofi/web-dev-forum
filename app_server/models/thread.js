'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//======================================
// Thread Schema
//======================================

const threadSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: 'Topic'
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }
  ],
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
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Thread', threadSchema);
