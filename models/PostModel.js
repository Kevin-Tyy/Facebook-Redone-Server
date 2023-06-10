const { string, ref } = require("joi");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		creatorId: {
			type : mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "users",
		},
		postText: { type: String },
		postMedia: { type: String },

		taggedpeople: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
			},
		],
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
			},
		],
		comments: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "comments",
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
