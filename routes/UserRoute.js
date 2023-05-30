const { Router } = require("express");
const UserController = require('../controllers/UserController')
const UserRouter = Router();

UserRouter.post("/register", UserController.registerUser);
UserRouter.post("/login", UserController.loginUser);
UserRouter.post("/verification", UserController.verifyUser);
UserRouter.post("/updateprofile", UserController.updateUser);
 

module.exports = UserRouter;
