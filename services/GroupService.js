const GroupModel = require("../models/GroupModel");
const UserModel = require("../models/UserModel");

class GroupService {
	createGroup = async ({ groupName, groupDescription, groupImage, userId }) => {
		try {
			const { _id } = await UserModel.findOne({ userId });
			const group = new GroupModel({
				groupName,
				groupDescription,
				groupImage,
				admin: _id,
			});
			return await group.save();
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	};
	getGroups = async () => {
		try {
			const groups = await GroupModel.find()
				.populate("admin")
				.populate("groupMembers")
				.sort({ createdAt: -1 });
			return groups;
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	};
	joinGroup = async (groupId, { userId }) => {
		const { _id } = await UserModel.findOne({ userId });
		const group = await GroupModel.findByIdAndUpdate(
			groupId,
			{ $addToSet: { groupMembers: _id } },
			{ new: true }
		);
		return group
	};
	deleteGroup = async () => {};
	updateGroup = async () => {};
	exitGroup = async () => {};
}
module.exports = new GroupService();
