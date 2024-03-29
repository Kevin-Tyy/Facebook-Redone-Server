const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			trim: true,
			required: true,
			lowercase: true,
		},
		lastname: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
		},
		userId: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},
		profileimage: {
			type: String,
			trim: true,
		},
		education: {
			type: String,
			trim: true,
		},
		location: {
			type: String,
			trim: true,
		},
		bio: {
			type: String,
			trim: true,
		},
		work: {
			type: String,
			trim: true,
		},
		friendList: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Users",
			},
		],	
		coverImage : {
			type : String,
			trim: true,
		}
	},
	{ timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
