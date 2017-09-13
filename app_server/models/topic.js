'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//======================================
// Topic Schema
//======================================

const topicSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  threads: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thread'
    }
  ]
},
{
  timestamps: true
});

module.exports = mongoose.model('Topic', topicSchema);
