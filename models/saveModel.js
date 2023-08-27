const { Schema, model } = require("mongoose");

const SavedPostSchema = new Schema(
	{
		post: {
			type: Schema.Types.ObjectId,
			ref: "Posts",
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: "Users",
		},
	},
	{ timestamps: true }
);
const SavedPostModel = model("SavedPost", SavedPostSchema);
module.exports = SavedPostModel;
