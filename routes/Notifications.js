//a simple route to manage static notifications management

const { Router } = require("express");
const Notifications = require("../controllers/Notifications");

const NotificationRouter = Router();
NotificationRouter.post("/", Notifications.addNotification);
NotificationRouter.route("/:userId")
	.get(Notifications.getNotifications)
	.delete(Notifications.removeNotifications)
	.put(Notifications.markAsRead);

module.exports = NotificationRouter;
