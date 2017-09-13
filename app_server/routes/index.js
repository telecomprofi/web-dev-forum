'use strict';

const apiRouter = require('./api.routes');

module.exports = function (app) {
  
// Set url for API group routes
  app.use('/api', apiRouter);
};