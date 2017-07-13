const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost/forum';
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
mongoose.connection.on('open', function () {
  console.log('Mongoose opened');
});

require('./user');