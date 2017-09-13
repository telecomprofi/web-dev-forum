'use strict';

const express = require('express');
const authRouter = express.Router();
const ctrlAuth = require('../controllers/api/auth.api');

authRouter.post('/register', ctrlAuth.register);
authRouter.post('/login', ctrlAuth.login);

module.exports = authRouter;
