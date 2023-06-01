const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
	{
		creatorId: {
			type: String,
			required : true
		},
		content: {
			type: String,
			required: true,
		},
		commentId : {
			type: String,
		}
	},
	{ timestamps: true }
);

const PostSchema = new mongoose.Schema(
	{
		creatorId: {
			type: String,
			required: true,
		},
		postId: {
			type: String,
			trim: true,
			reqruired: true,
		},
		postMedia: {
			type: String,
			trim: true,
		},
		postText: {
			type: String,
			required: true,
			trim: true,
		},
        comments : [CommentSchema],
		
		taggedpeople: {
			type: [String],
		},
		likedPeople: {
			type: [String],
		},
	},
	{ timestamps: true }
);
const PostModel = mongoose.model("Posts", PostSchema);
module.exports = PostModel;
