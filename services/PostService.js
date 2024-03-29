const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const { v4: uuidv4 } = require("uuid");
const cloudUpload = require("../middleware/cloudUpload");
class PostService {
	createPost = async (userId, postData) => {
		try {
			const { postText, postMedia } = postData;
			let taggedUsernames;
			let taggedUsers;
			let taggedpeople;
			let imageUploadResponse;
			let tags = postText.match(/@(\w+)/g);
			const postId = uuidv4();
			if (postMedia) {
				imageUploadResponse = await cloudUpload(postMedia);
			}
			if (tags) {
				taggedUsernames = tags.map((user) => user.slice(1));
				taggedUsers = await UserModel.find({
					username: { $in: taggedUsernames },
				});
				taggedpeople = taggedUsers.map((user) => user._id);
			}
			const { _id } = await UserModel.findOne({ userId: userId });
			const createdPost = new PostModel({
				creator: _id,
				postId: postId,
				postText: postText,
				postMedia: imageUploadResponse?.secure_url,
				taggedpeople: taggedpeople,
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
			console.error(error);
			throw new Error("Failed to delete post");
		}
	};
	getPostsByUserId = async (userId) => {
		try {
			const { _id } = await UserModel.findOne({ userId: userId });
			const posts = await PostModel.find({
				$or: [{ creator: _id }, { repostedBy: _id }],
			})
				.populate("creator")
				.populate("taggedpeople")
				.populate("comments")
				.populate("likes")
				.populate("repostedBy")
				.populate("saves")
				.populate("group")
				.sort({ createdAt: -1 });
			if (posts) {
				return posts;
			}
		} catch (error) {
			throw new Error("Failed to retrieve posts");
		}
	};
	getAllPosts = async () => {
		try {
			const posts = await PostModel.find()
				.populate("creator")
				.populate("taggedpeople")
				.populate("likes")
				.populate("comments")
				.populate("saves")
				.populate("repostedBy")
				.populate("group")
				.sort({ createdAt: -1 });
			if (posts) {
				return posts;
			}
		} catch (error) {
			console.log(error);
			throw new Error("Failed to retrieve posts");
		}
	};
	addLike = async (postId, userId) => {
		try {
			const { _id } = await UserModel.findOne({ userId: userId });
			const likedPost = await PostModel.findOne({ postId: postId });
			if (likedPost) {
				const likedPeople = await PostModel.findOneAndUpdate(
					{ postId: postId },
					{ $addToSet: { likes: _id } },
					{ new: true }
				);
				return likedPeople;
			}
		} catch (error) {
			console.error(error);
			throw new Error("Error adding like");
		}
	};

	removeLike = async (postId, userId) => {
		try {
			const { _id } = await UserModel.findOne({ userId: userId });
			const likedPost = await PostModel.findOne({ postId: postId });
			if (likedPost) {
				const likedPeople = await PostModel.findOneAndUpdate(
					{ postId: postId },
					{ $pull: { likes: _id } },
					{ new: true }
				);
				return likedPeople;
			}
		} catch (error) {
			console.error(error);
			throw new Error("Error removing like");
		}
	};
	addComment = async (commentData) => {
		try {
			const { postId, userId, content } = commentData;
			const { _id } = await UserModel.findOne({ userId: userId });
			const post = await PostModel.findOne({ postId: postId });
			if (post) {
				const commentId = uuidv4();

				post.comments.push({
					user: _id,
					textContent: content,
					commentId: commentId,
					createdAt: Date.now(),
				});
				const updatedPost = await post.save();
				return updatedPost;
			}
		} catch (error) {
			console.error(error);
			throw new Error("Failed to add comment");
		}
	};

	getComments = async (postId) => {
		try {
			const post = await PostModel.findOne({ postId: postId })
				.sort({ createdAt: -1 })
				.populate("comments.user");
			if (post) {
				if (post.comments) {
					return post.comments;
				}
			}
		} catch (error) {
			console.error(error);
			throw new Error("Request failed: ");
		}
	};
	rePost = async ({ postId, repostedBy }) => {
		const post = await PostModel.findOne({ postId });
		const user = await UserModel.findOne({ userId: repostedBy });
		if (!post || !user) return;
		const newPostId = uuidv4();
		try {
			const createdPost = new PostModel({
				creator: post.creator,
				postId: newPostId,
				postText: post.postText,
				postMedia: post.postMedia,
				taggedpeople: post.taggedpeople,
				createdAt: Date.now(),
				isReposted: true,
				repostedBy: user._id,
				repostedDate: post.createdAt,
			});
			const updateOldPost = await PostModel.findOneAndUpdate(
				{ postId },
				{ $set: { numberOfReposts: post.numberOfReposts + 1 } },
				{ new: true }
			);
			await createdPost.save();
			return createdPost;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to create post");
		}
	};
	addView = async (postId, userId) => {
		try {
			const { _id } = await UserModel.findOne({ userId });
			const post = await PostModel.findOne({ postId });
			if (post) {
				const viewers = await PostModel.findOneAndUpdate(
					{ postId: postId },
					{ $addToSet: { views: _id } },
					{ new: true }
				);
				return viewers;
			}
		} catch (error) {
			console.error(error);
			throw new Error("Error adding like");
		}
	};
}
module.exports = new PostService();
