const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const SavedPostModel = require("../models/saveModel");
class SavedPostService {
	savePost = async ({ userId, postId }) => {
		try {
			const { _id } = await UserModel.findOne({ userId: userId });
			const post = await PostModel.findOne({ postId: postId });
			const savedPost = new SavedPostModel({
				creator: _id,
				post: post._id,
			});
			await PostModel.findByIdAndUpdate(post._id, {
				$push: { saves: _id },
			});
			await savedPost.save();
			return savedPost;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to create story");
		}
	};
	getSavedPosts = async ({ userId }) => {
		try {
			const { _id } = await UserModel.findOne({ userId });
			const posts = await SavedPostModel.find({ creator: _id })
				.populate("creator")
				.populate({
					path: "post",
					populate: {
						path: "creator",
						model: "Users",
					},
				})
				.populate({
					path: "post",
					populate: {
						path: "repostedBy",
						model: "Users",
					},
				})
				.sort({ createdAt: -1 });
			return posts;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to get stories");
		}
	};
	deleteSavedPost = async ({ postId, userId }) => {
		try {
			const { _id } = await UserModel.findOne({ userId: userId });
			const originalPost = await PostModel.findOne({ postId: postId });
			const post = await SavedPostModel.findOneAndDelete({
				post: originalPost._id,
			});
			await PostModel.findByIdAndUpdate(originalPost._id, {
				$pull: { saves: _id },
			});
			return post;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to save post");
		}
	};
}
module.exports = new SavedPostService();
