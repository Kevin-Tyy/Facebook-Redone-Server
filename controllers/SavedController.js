const SavedService = require("../services/SavedService");
class SavedController {
	savePost = async (req, res) => {
		try {
			const createdSaved = await SavedService.savePost(req.body);
			{
				createdSaved
					? res.send({
							msg: "Post has been saved to your collection",
							success: true,
					  })
					: res.send({ msg: "Saved not added", success: false });
			}
		} catch (error) {
			console.log(error);
			res.send({
				msg: "Something went wrong, Check your internet connection and try again",
				success: false,
			});
		}
	};

	getSaved = async (req, res) => {
		try {
			const savedPosts = await SavedService.getSavedPosts(req.params);
			{
				savedPosts
					? res.send({
							msg: "Saved Posts retrieved",
							success: true,
							posts: savedPosts,
					  })
					: res.send({
							msg: "Stories not retrieved",
							success: false,
					  });
			}
		} catch (error) {
			console.log(error);
			res.send({
				msg: "Something went wrong, Check your internet connection and try again",
				success: false,
			});
		}
	};
	deleteSavedPosts = async (req, res) => {
		try {
			const deletedPost = await SavedService.deleteSavedPost(req.params);
			{
				deletedPost
					? res.send({
							msg: "Post unsaved from your collection",
							success: true,
					  })
					: res.send({ msg: "Process gone wrong, Retry", success: false });
			}
		} catch (error) {
			console.log(error);
			res.send({
				msg: "Something went wrong, Check your internet connection and try again",
				success: false,
			});
		}
	};
}
module.exports = new SavedController();
