const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');


module.exports = function (app) {
  app.use('/api/users', userRouter);
  app.use('/api/auth', authRouter);
};