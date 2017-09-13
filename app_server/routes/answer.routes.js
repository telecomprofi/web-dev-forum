'use strict';

const express = require('express');
const answerRouter = express.Router();
const ctrlAnswers = require('../controllers/api/answer.api');
const ctrlAuth = require('../controllers/api/auth.api');

const passport = require('passport');
const passportService = require('../config/passport');

// Middleware to require auth
const requireAuth = passport.authenticate('jwt', { session: false });

const ROLE_ADMIN = require('../config/constants').ROLE_ADMIN;

// Set answer routes as subgroup/middleware to apiRoutes
answerRouter.post('/:threadId/answers', requireAuth, ctrlAuth.userRestriction(), ctrlAnswers.answersCreate);

answerRouter.get('/:threadId/answers/:answerId', requireAuth, ctrlAuth.userRestriction(), ctrlAnswers.answersReadOne);

answerRouter.put('/:threadId/answers/:answerId', requireAuth, ctrlAuth.userRestriction(), ctrlAnswers.answersUpdateOne);

answerRouter.put('/:threadId/answers/:answerId/mark', requireAuth, ctrlAuth.userRestriction(), ctrlAnswers.answersUpdateOneWithMark);

answerRouter.put('/:threadId/answers/:answerId/useful', requireAuth, ctrlAuth.userRestriction(), ctrlAnswers.answersUpdateOneWithUseful);


module.exports = answerRouter;
