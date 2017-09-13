'use strict';

const express = require('express');
const apiRouter = express.Router();

const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const profileRouter = require('./profile.routes');
const topicRouter = require('./topic.routes');
const threadRouter = require('./thread.routes');
const answerRouter = require('./answer.routes');

// Set auth routes as subgroup/middleware to apiRoutes
apiRouter.use('/auth', authRouter);

// Set user routes as subgroup/middleware to apiRoutes
apiRouter.use('/users', userRouter);

// Set profile routes as subgroup/middleware to apiRoutes
apiRouter.use('/profiles', profileRouter);

// Set topic routes as subgroup/middleware to apiRoutes
apiRouter.use('/topics', topicRouter);

// Set thread routes as subgroup/middleware to apiRoutes
apiRouter.use('/topic', threadRouter);

// Set thread routes as subgroup/middleware to apiRoutes
apiRouter.use('/threads', answerRouter);

module.exports = apiRouter;
