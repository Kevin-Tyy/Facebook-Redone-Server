const NotificationModel = require("../models/Notifications");
const UserModel = require("../models/UserModel");
class NotificationManager {
	addNotification = async (req, res) => {
		try {
			const { message, dateTime, link, users, userId } = req.body;
			const { _id } = await UserModel.findOne({ userId });
			if (users.length < 1) {
				const users = await UserModel.find();
				const usersToNotify = [];
				const userArray = users.filter((user) => user.userId !== userId);
				console.log(userArray);
				userArray.forEach((user) => {
					usersToNotify.push(user._id);
				});
				console.log(usersToNotify);
				const notification = new NotificationModel({
					creator: _id,
					message,
					dateTime,
					link,
					users: usersToNotify,
				});
				return await notification.save();
			} else {
				const notification = new NotificationModel({
					creator: _id,
					message,
					dateTime,
					link,
					users: users,
				});
				return await notification.save();
			}
		} catch (error) {
			console.error(error);
		}
	};
	getNotifications = async (req, res) => {
		try {
			const { userId } = req.params;
			const { _id } = await UserModel.findOne({ userId });
			const allNotifications = await NotificationModel.find()
				.populate("creator")
				.sort({ createdAt: -1 });

			const notifications = allNotifications.filter((notification) =>
				notification.users.includes(_id)
			);
			res.status(200).json({ notifications });
		} catch (error) {
			console.log(error);
		}
	};
}
module.exports = new NotificationManager();
