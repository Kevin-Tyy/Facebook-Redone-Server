const { string, ref } = require("joi");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		creator: {
			type : mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Users",
		},
		postText: { type: String },
		postMedia: { type: String },
		postId : { type: String },
		taggedpeople: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Users",
			},
		],
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Users",
			},
		],
		comments: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Users",
				},
				comment: {
					text: { type: String },
					createdAt: { type: String },
				},
			},
		],
	},
	{ timestamps: true }
);
const PostModel = mongoose.model("Posts", PostSchema);
module.exports = PostModel;
