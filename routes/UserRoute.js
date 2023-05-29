const { Router } = require("express");
const UserController = require('../controllers/UserController')
const UserRouter = Router();

UserRouter.post("/register", UserController.registerUser);
UserRouter.post("/login", UserController.loginUser);


module.exports = UserRouter;
