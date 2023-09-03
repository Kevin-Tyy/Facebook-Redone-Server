const GroupModel = require("../models/GroupModel");
const UserModel = require("../models/UserModel");
const GroupMediaModel = require("../models/GroupMedia");
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
			await group.save();
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
		const groupMedia = await GroupMediaModel.find({
			groupId,
		})
			.populate("creator")
			.sort({ createdAt: -1 });
		return { group, groupMedia };
	};
	deleteGroup = async (groupId) => {
		const group = await GroupModel.findByIdAndDelete(groupId);
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
	createMedia = async (userId, groupId, media) => {
		try {
			const { image, text } = media;
			// let imageUploadResponse;
			// if (image) {
			// 	imageUploadResponse = await cloudUpload(image);
			// }
			const { _id } = await UserModel.findOne({ userId: userId });
			const createdPost = new GroupMediaModel({
				creator: _id,
				text: text,
				groupId: groupId,
				// image: imageUploadResponse?.secure_url,
				image: image,
			});

			await createdPost.save();
			return createdPost;
		} catch (error) {
			throw new Error(error);
		}
	};
}
module.exports = new GroupService();
