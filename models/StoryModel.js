const mongoose = require("mongoose");
const StorySchema = new mongoose.Schema(
	{
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
            ref : 'Users'
		},
		storyId: {
			type: String,
			required: true,
		},
		storyMedia: {
			type: String,
			required: true,
		},
		storyCaption: {
			type: String,
			trim: true,
		},
	},
	{ timestamps: true }
);

// StorySchema.index({ createdAt: 1 }, { expires: '1'  });

const StoryModel = mongoose.model("Story", StorySchema);
module.exports = StoryModel;
