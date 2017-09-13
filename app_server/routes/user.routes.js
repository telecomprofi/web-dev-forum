'use strict';

const express = require('express');
const userRouter = express.Router();
const ctrlUsers = require('../controllers/api/user.api');
const ctrlAuth = require('../controllers/api/auth.api');

const passport = require('passport');
const passportService = require('../config/passport');

// Middleware to require auth
const requireAuth = passport.authenticate('jwt', { session: false });

const ROLE_ADMIN = require('../config/constants').ROLE_ADMIN;


userRouter.get('/', requireAuth, ctrlAuth.roleAuthorization(ROLE_ADMIN), ctrlUsers.getUsers);

userRouter.get('/:userId', requireAuth, ctrlUsers.usersReadOne);

userRouter.put('/:userId/control', requireAuth, ctrlAuth.roleAuthorization(ROLE_ADMIN), ctrlUsers.usersUpdateOneWithControl);

module.exports = userRouter;
