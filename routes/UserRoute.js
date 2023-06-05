const { Router } = require("express");
const UserController = require("../controllers/UserController");
const UserRouter = Router();

UserRouter.post("/register", UserController.registerUser);
UserRouter.post("/login", UserController.loginUser);
	

UserRouter.route("/accounts/verify").post(UserController.verifyUser);
UserRouter.route("/accounts/edit").put(UserController.updateUser);

UserRouter.route("/:userId")
	.get(UserController.viewProfile)
	.delete(UserController.deleteUser);
    
UserRouter.route("/:userId/friends").get(UserController.fetchFriends);

module.exports = UserRouter;
