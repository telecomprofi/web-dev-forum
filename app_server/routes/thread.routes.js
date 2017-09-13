'use strict';

const express = require('express');
const threadRouter = express.Router();
const ctrlThreads = require('../controllers/api/thread.api');
const ctrlAuth = require('../controllers/api/auth.api');

const passport = require('passport');
const passportService = require('../config/passport');

// Middleware to require auth
const requireAuth = passport.authenticate('jwt', { session: false });

const ROLE_ADMIN = require('../config/constants').ROLE_ADMIN;


//threadRouter.get('/', ctrlThreads.getThreads);

threadRouter.post('/:topicId/threads', requireAuth, ctrlAuth.userRestriction(), ctrlThreads.threadsCreate);

threadRouter.get('/:topicId/threads/:threadId', ctrlThreads.threadsReadOne);

threadRouter.put('/:topicId/threads/:threadId', requireAuth, ctrlAuth.userRestriction(), ctrlThreads.threadsUpdateOne);

threadRouter.put('/:topicId/threads/:threadId/mark', requireAuth, ctrlAuth.userRestriction(), ctrlThreads.threadsUpdateOneWithMark);

threadRouter.delete('/:topicId/threads/:threadId', requireAuth, ctrlAuth.userRestriction(), ctrlAuth.roleAuthorization(ROLE_ADMIN), ctrlThreads.threadsRemoveOne);

module.exports = threadRouter;
