const express = require('express');
const userController = require('./controllers/user.controller');


const userRouter = express.Router();

userRouter.post('/', userController.create);
userRouter.get('/', userController.getAllUser);
userRouter.get('/:custId', userController.deleteByCustID);
userRouter.get('/login/auth',userController.auth);
userRouter.post('/login', userController.loginFunction);


const routes = (app) => {

  app.use('/user', userRouter);

  app.get('/', (req, res) => {
    return res.send({ message: "User Service Up!"});
  }) 
}

module.exports = routes;