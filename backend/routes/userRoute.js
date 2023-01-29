const userController = require('../controller/userController.js');


const userRouter = require('express').Router();


userRouter.post('/register', userController.addUser);
userRouter.get('/', userController.getAllUser);
userRouter.get('/:id', userController.getSingleUser)
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;