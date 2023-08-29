//a simple route to manage static notifications management 

const { Router } = require("express");
const Notifications = require("../controllers/Notifications");

const NotificationRouter = Router()
NotificationRouter.post('/', Notifications.addNotification)
NotificationRouter.get('/:userId', Notifications.getNotifications)

module.exports = NotificationRouter