'use strict';

const express = require('express');
const topicRouter = express.Router();
const ctrlTopics = require('../controllers/api/topic.api');
const ctrlAuth = require('../controllers/api/auth.api');

const passport = require('passport');
const passportService = require('../config/passport');

// Middleware to require auth
const requireAuth = passport.authenticate('jwt', { session: false });

const ROLE_ADMIN = require('../config/constants').ROLE_ADMIN;


topicRouter.get('/', ctrlTopics.getTopics);

topicRouter.get('/titles', ctrlTopics.getTopicsTitles);

topicRouter.post('/', requireAuth, ctrlAuth.roleAuthorization(ROLE_ADMIN), ctrlTopics.topicsCreate);

topicRouter.get('/:topicId', ctrlTopics.topicsReadOne);

topicRouter.put('/:topicId', requireAuth, ctrlAuth.roleAuthorization(ROLE_ADMIN), ctrlTopics.topicsUpdateOne);

topicRouter.delete('/:topicId', requireAuth, ctrlAuth.roleAuthorization(ROLE_ADMIN), ctrlTopics.topicsRemoveOne);

module.exports = topicRouter;
