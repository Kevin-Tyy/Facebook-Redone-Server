const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const { v4: uuidv4 } = require("uuid");
const cloudUpload = require("../middleware/cloudUpload");
class PostService {
	createPost = async (userId, postData) => {
		try {
			const { postText , postMedia } = postData;
			let taggedUsernames;
			let taggedUsers;
			let taggedpeople;
			let imageUploadResponse;
			let tags = postText.match(/@(\w+)/g);
			const postId = uuidv4();
			if(postMedia){
				imageUploadResponse = await cloudUpload(postMedia);
			}
			if(tags){
				taggedUsernames = tags.map((user) => user.slice(1));
				taggedUsers = await UserModel.find({
					username: { $in: taggedUsernames },
				});
				taggedpeople = taggedUsers.map((user) => user._id);
				console.log(taggedpeople)
			}
 			const { _id } = await UserModel.findOne({ userId : userId })
			const createdPost = new PostModel({
				creatorId: _id,
				postId: postId,
				postText: postText,
				postMedia : imageUploadResponse?.secure_url,
				taggedpeople : taggedpeople
			});


			await createdPost.save();
			return createdPost;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to create post");
		}
	};
	deletePost = async (userId, postId) => {
		try {
			const postData = await PostModel.findOne({ postId: postId });
			if (postData) {
				const { creatorId } = postData;

				if (creatorId == userId) {
					const deletedPost = await PostModel.findOneAndDelete({
						postId: postId,
					});
					return deletedPost;
				}
			}
		} catch (error) {
			throw new Error("Failed to delete post");
		}
	};
	getPostsByUserId = async (userId) => {
		try {
			const posts = await PostModel.find({ creatorId: userId });
			if (posts) {
				return posts;
			}
		} catch (error) {
			throw new Error("Failed to retrieve posts");
		}
	};
	getAllPosts = async () => {
		try {
			const posts = await PostModel.find().sort({ createdAt: -1 });
			if (posts) {
				return posts;
			}
		} catch (error) {
			throw new Error("Failed to retrieve posts");
		}
	};
	addLike = async (postId, userId) => {
		try {
			const likedPost = await PostModel.findOne({ postId: postId });
			if (likedPost) {
				const likedPeople = await PostModel.findOneAndUpdate(
					{ postId: postId },
					{ $addToSet: { likedPeople: userId } },
					{ new: true }
				);
				return likedPeople;
			}
		} catch (error) {
			throw new Error("Cannot add like");
		}
	};
	fetchLikes = async () => {};
	removeLike = async (postId, userId) => {
		try {
			const likedPost = await PostModel.findOne({ postId: postId });
			if (likedPost) {
				const likedPeople = await PostModel.findOneAndUpdate(
					{ postId: postId },
					{ $pull: { likedPeople: userId } },
					{ new: true }
				);
				return likedPeople;
			}
		} catch (error) {
			throw new Error("Re");
		}
	};
	addComment = async (commentData) => {
		try {
			const { postId, userId, content } = commentData;
			const post = await PostModel.findOne({ postId: postId });
			if (post) {
				const commentId = uuidv4();

				post.comments.push({
					creatorId: userId,
					content: content,
					commentId: commentId,
				});
				const updatedPost = await post.save();
				return updatedPost;
			}
		} catch (error) {
			throw new Error("Failed to add comment");
		}
	};
	deleteComment = async (postId, commentData) => {
		try {
			const { commentId } = commentData;
			const post = await PostModel.findOne({ postId: postId });
			if (post) {
				const commentIndex = post.comments.findIndex(
					(comment) => comment.commentId === commentId
				);

				if (commentIndex !== -1) {
					post.comments.splice(commentIndex, 1);
					const updatedPost = await post.save();
					return updatedPost;
				}
			}
		} catch (error) {
			throw new Error("Request failed");
		}
	};
	getComments = async (postId) => {
		try {
			const post = await PostModel.findOne({ postId: postId });
			if (post) {
				if (post.comments) {
					return comments;
				}
			}
		} catch (error) {
			throw new Error("Request failed: ");
		}
	};
}
module.exports = new PostService();
