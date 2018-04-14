'use strict';

const mongoose = require('mongoose');
mongoose.Promise = Promise;

const dbURI = process.env.DB_URL || 'mongodb://localhost/webdevforum';
//if (process.env.NODE_ENV === 'production') {
//  dbURI = 'mongodb://nsobkovych:password@mongolab.com:33669/nsobkovych';
//  dbURI = process.env.MONGOLAB_URI;
//}
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

require('./user');
require('./profile');
require('./topic');
require('./thread');
require('./answer');
