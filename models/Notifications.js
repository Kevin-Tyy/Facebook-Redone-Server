const { Schema, model } = require("mongoose");

const NotificationSchema = new Schema({
	message: {
		type: String,
		required: true,
	},
	Seen: [
		{
			type: Schema.Types.ObjectId,
			ref: "Users",
		},
	],
	dateTime: {
		type: Date,
	},
	link: {
		type: String,
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: "Users",
	},
	users: [
		{
			type: Schema.Types.ObjectId,
		},
	],
});

const NotificationModel = model("Notifications", NotificationSchema);
module.exports = NotificationModel;
