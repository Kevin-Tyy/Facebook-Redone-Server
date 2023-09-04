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

GroupRouter.get("/:groupId", GroupController.getGroupById);
GroupRouter.post("/media", GroupController.createMedia);

GroupRouter.route("/react/like")
	.post(GroupController.likeMedia)
	.delete(GroupController.unlikeMedia);
GroupRouter.route("/share/media").post(GroupController.repost);
module.exports = GroupRouter;
