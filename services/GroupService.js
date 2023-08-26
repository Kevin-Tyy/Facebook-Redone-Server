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
			await group.save()
			const admin = await UserModel.findOne({ userId });
			await GroupModel.findByIdAndUpdate(
				group._id,
				{ $addToSet: { groupMembers: admin._id } },
				{ new: true }
			);
			return group;
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
		return group;
	};
	getGroupById = async ({ groupId }) => {
		const group = await GroupModel.findById(groupId)
			.populate("admin")
			.populate("groupMembers");
		return group;
	};
	deleteGroup = async (groupId) => {
		const group = await GroupModel.findByIdAndDelete(groupId)
		return group;
	};
	updateGroup = async () => {};
	exitGroup = async (groupId, { userId }) => {
		const { _id } = await UserModel.findOne({ userId });
		const group = await GroupModel.findByIdAndUpdate(
			groupId,
			{ $pull: { groupMembers: _id } },
			{ new: true }
		);
		return group;
	};
}
module.exports = new GroupService();
