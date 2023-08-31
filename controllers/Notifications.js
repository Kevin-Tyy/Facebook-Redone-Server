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
	markAsRead = async (req, res) => {
		try {
			const { userId } = req.params;
			const user = await UserModel.findOne({ userId });
			const allNotifications = await NotificationModel.find();

			await Promise.all(
				allNotifications.map(async (notification) => {
					if (!notification.Seen.includes(user._id.toString())) {
						notification.Seen.push(user._id);
						await notification.save();
					}
				})
			);

			res.status(200).json({ message: "Notifications marked as read." });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "An error occurred." });
		}
	};
	removeNotifications = async (req, res) => {
		try {
			const { userId } = req.params;
			const user = await UserModel.findOne({ userId }); // Changed to findOne instead of find
			const allNotifications = await NotificationModel.find();

			const newNotifications = await Promise.all(
				allNotifications.map(async (notification) => {
					if (notification.users.includes(user._id)) {
						const updatedUsers = notification.users.filter(
							(id) => id.toString() !== user._id.toString()
						);

						await NotificationModel.findByIdAndUpdate(
							notification._id,
							{ $set: { users: updatedUsers } },
							{ new: true }
						);

						return { ...notification._doc, users: updatedUsers };
					} else {
						return notification._doc;
					}
				})
			);

			console.log(user._id);
			console.log(newNotifications);
		} catch (error) {
			console.log(error);
		}
	};
}
module.exports = new NotificationManager();
