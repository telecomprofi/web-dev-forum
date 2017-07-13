const express = require('express');
const userRouter = express.Router();
const ctrlUsers = require('../controllers/api/user.api');

userRouter.get('/', ctrlUsers.getUsers);
//userRouter.post('/', ctrlUsers.userCreate);
//userRouter.get('/:userId', ctrlUsers.userReadOne);
//userRouter.put('/:userId', ctrlUsers.userUpdateOne);
//userRouter.delete('/:userId', ctrlUsers.userDeleteOne);

module.exports = userRouter;
