const userRouter = require('./user.routes');

module.exports = function (app) {
  app.use('/api/users', userRouter);
};