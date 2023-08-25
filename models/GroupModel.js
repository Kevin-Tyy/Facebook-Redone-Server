const mongoose = require("mongoose");
const GroupSchema = new mongoose.Schema(
	{
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Users",
		},
		groupName: {
			type: String,
			required: true,
		},
		groupMembers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Users",
			},
		],
		groupImage: {
			type : String,
		},
		groupDescription: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// GroupSchema.index({ createdAt: 1 }, { expires: '1'  });

const GroupModel = mongoose.model("Group", GroupSchema);
module.exports = GroupModel;
