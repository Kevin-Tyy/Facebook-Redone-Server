//posts
const { cloudinary } = require("../utils/cloudinary");
const cloudUpload = async (postMedia) => {
	return await cloudinary.v2.uploader.upload(postMedia, {
		folder: "FB",
	});
};
module.exports = cloudUpload;
