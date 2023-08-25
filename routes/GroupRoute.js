const { Router } = require("express");
const GroupController = require("../controllers/GroupController");
const GroupRouter = Router();

GroupRouter.route("/")
	.post(GroupController.createGroup)
	.get(GroupController.getGroups);
GroupRouter.route("/:groupId")
	.delete(GroupController.deleteGroup)
	.patch(GroupController.updateGroup);
GroupRouter.route("/join/:groupId")
	.post(GroupController.joinGroup)
	.delete(GroupController.exitGroup);
module.exports = GroupRouter;
