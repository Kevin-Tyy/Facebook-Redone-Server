const StoryModel = require("../models/StoryModel");
const { v4: uuidv4 } = require("uuid");
const cloudUpload = require("../middleware/cloudUpload");
const UserModel = require("../models/UserModel");
class StoryService {
	createStory = async (storyData) => {
		try {
			const storyId = uuidv4();
			const { userId, storyMedia, storyCaption } = storyData;

			const imagepUloadResponse = await cloudUpload(storyMedia);
			const { _id } = await UserModel.findOne({ userId: userId });
			const createdStory = new StoryModel({
				creator: _id,
				storyMedia: imagepUloadResponse?.secure_url,
				storyId: storyId,
				storyCaption : storyCaption,
			});
			console.log(createdStory);
			await createdStory.save();
			return createdStory;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to create story");
		}
	};
	getStories = async () => {
		try {
			const stories = await StoryModel.find()
				.populate("creator")
				.sort({ createdAt: -1 });
			return stories;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to get stories");
		}
	};
}
module.exports = new StoryService();
