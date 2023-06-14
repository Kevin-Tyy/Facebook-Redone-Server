const StoryService = require("../services/StoryService");
const { storyValidation } = require("../validation/PostValidation");
class StoryController {
	createStory = async (req, res) => {
		const { error } = storyValidation.validate(req.body);
		if (error) {
			res.send({ msg: error.details[0].message, success: false });
		} else {
			try {
				const createdStory = await StoryService.createStory(req.body);
				{
					createdStory
						? res.send({
								msg: "Story added successfully",
								data: createdStory,
								success: true,
						  })
						: res.send({ msg: "Story not added", success: false });
				}
			} catch (error) {
				console.log(error);
				res.send({
					msg: "Something went wrong, Check your internet connection and try again",
					success: false,
				});
			}
		}
	};

	getStories = async (req, res) => {
		try {
			const stories = await StoryService.getStories();
			{
				stories
					? res.send({
							msg: "Stories retrieved",
							success: true,
							stories: stories,
					  })
					: res.send({
							msg: "Stories not retrieved",
							success: false,
							stories: stories,
					  });
			}
		} catch (error) {
			res.send({
				msg: "Something went wrong, Check your internet connection and try again",
				success: false,
				stories: stories,
			});
		}
	};
}
module.exports = new StoryController();
