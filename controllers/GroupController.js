const GroupService = require("../services/GroupService");

class GroupController {
	createGroup = async (req, res) => {
		try {
			const group = await GroupService.createGroup(req.body);
			group && res.json({ msg: "Group created!" });
		} catch (error) {
			res.status(500).json({ msg: "Something went wrong" });
		}
	};
	getGroups = async (req, res) => {
		try {
			const groups = await GroupService.getGroups();
			res.json(groups);
		} catch (error) {
			res.status(500).json({ msg: "Something went wrong" });
		}
	};
	joinGroup = async (req, res) => {
		try {
			const { groupId } = req.params;
			const group = await GroupService.joinGroup(groupId, req.body);
			group
				? res.status(200).json({ msg: "Joined Group" })
				: res.status(404).json({ msg: "Error joining Group" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ msg: "Something went wrong" });
		}
	};
	getGroupById = async (req, res) => {
		try {
			const group = await GroupService.getGroupById(req.params);
			group
				? res.status(200).json(group)
				: res.status(400).json({ msg: "Could not find group" });
		} catch (error) {
			console.error(error);
			res.json({ msg: "Something went wrong " });
		}
	};
	deleteGroup = async (req, res) => {
		try {
			const { groupId } = req.params;
			const group = await GroupService.deleteGroup(groupId);
			group
				? res.status(200).json({ msg: "Group deleted" })
				: res.status(400).json({ msg: "Could not delete group" });
		} catch (error) {
			res.status(500).json({ msg: "Something went wrong" });
		}
	};
	updateGroup = async () => {};
	exitGroup = async (req, res) => {
		try {
			const { groupId } = req.params;
			const group = await GroupService.exitGroup(groupId, req.body);
			group
				? res.status(200).json({ msg: "Left Group" })
				: res.status(404).json({ msg: "Error leaving Group" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ msg: "Something went wrong" });
		}
	};
	createMedia = async (req, res) => {
		console.log(req.body)
		try {
			const { userId, groupId } = req.body;
			const createdPost = await GroupService.createMedia(
				userId,
				groupId,
				req.body
			);
			res.send({
				msg: "Post created successfully",
				post: createdPost,
				success: true,
			});
		} catch (error) {
			console.log(error);
			res.send({
				msg: "Something went wrong, Check your internet connection or try again later",
				success: false,
			});
		}
	};
}
module.exports = new GroupController();
