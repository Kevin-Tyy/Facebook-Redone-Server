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
			const groups = await GroupService.getGroups()
			res.json(groups);
		} catch (error) {
			res.status(500).json({ msg: "Something went wrong" });
		}
	};
	joinGroup = async () => {};
	deleteGroup = async () => {};
	updateGroup = async () => {};
	exitGroup = async () => {};
}
module.exports = new GroupController();
