'use strict';

const express = require('express');
const profileRouter = express.Router();
const ctrlProfiles = require('../controllers/api/profile.api');
const ctrlAuth = require('../controllers/api/auth.api');

const passport = require('passport');
const passportService = require('../config/passport');

// Middleware to require auth
const requireAuth = passport.authenticate('jwt', { session: false });

profileRouter.get('/:userId', requireAuth, ctrlProfiles.profilesReadOne);

profileRouter.get('/:userId/public', ctrlProfiles.profilesReadOnePublic);

profileRouter.put('/:userId', requireAuth, ctrlProfiles.profilesUpdateOne);

module.exports = profileRouter;