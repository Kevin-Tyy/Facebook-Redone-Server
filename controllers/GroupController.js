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
	deleteGroup = async () => {};
	updateGroup = async () => {};
	exitGroup = async () => {};
}
module.exports = new GroupController();
