const GroupMediaModel = require("../models/GroupMedia");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const GroupService = require("../services/GroupService");
const { v4: uuidv4 } = require("uuid");

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
		console.log(req.body);
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
	likeMedia = async (req, res) => {
		try {
			const { _id, userId } = req.body;
			const user = await UserModel.findOne({ userId: userId });
			const likedPost = await GroupMediaModel.findById({ _id });
			if (likedPost) {
				await GroupMediaModel.findOneAndUpdate(
					{ _id: _id },
					{ $addToSet: { likes: user?._id } },
					{ new: true }
				);
				return res.send({ msg: "Like added ", success: true, data: likedPost });
			}
			res.send({ msg: "Like not added successfully", success: false });
		} catch (error) {
			console.log(error);
			res.send({ msg: "Something went wrong", success: false });
		}
	};
	unlikeMedia = async (req, res) => {
		try {
			const { _id, userId } = req.body;
			const user = await UserModel.findOne({ userId: userId });
			const likedPost = await GroupMediaModel.findById({ _id });
			if (likedPost) {
				await GroupMediaModel.findOneAndUpdate(
					{ _id: _id },
					{ $pull: { likes: user?._id } },
					{ new: true }
				);
				return res.send({
					msg: "Post unliked",
					success: true,
					data: likedPost,
				});
			}
			res.send({ msg: "Like not removed successfully", success: false });
		} catch (error) {
			res.send({ msg: "Something went wrong", success: false });
		}
	};
	repost = async (req, res) => {
		const { _id, userId } = req.body;
		const post = await GroupMediaModel.findById({ _id });
		const user = await UserModel.findOne({ userId });
		if (!post || !user) return;

		const newPostId = uuidv4();
		try {
			const createdPost = new PostModel({
				creator: post.creator?._id,
				group: post.groupId,
				postId: newPostId,
				postText: post.text,
				postMedia: post.image,
				createdAt: Date.now(),
				isReposted: true,
				isGroupShared: true,
				repostedBy: user._id,
				repostedDate: post.createdAt,
			});
			const updateOldPost = await GroupMediaModel.findByIdAndUpdate(
				{ _id },
				{ $set: { shares: post.shares + 1 } },
				{ new: true }
			);
			await createdPost.save();
			res.json({
				msg: "Post has been shared to your timeline",
				success: true,
			});
		} catch (error) {
			console.error(error);
			throw new Error("Failed to create post");
		}
	};
}
module.exports = new GroupController();
