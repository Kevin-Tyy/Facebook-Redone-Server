const mongoose = require("mongoose");
const GroupMediaSchema = new mongoose.Schema(
	{
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Users",
		},
		text: {
			type: String,
			required: true,
		},
		groupId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Groups",
		},
		image: {
			type: String,
		},
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

				textContent: { type: String },
				createdAt: { type: Date },
				commentId: { type: String },
			},
		],
	},
	{ timestamps: true }
);

// GroupSchema.index({ createdAt: 1 }, { expires: '1'  });

const GroupMediaModel = mongoose.model("GroupMedia", GroupMediaSchema);
module.exports = GroupMediaModel;
