
import { DeferredNotifications } from "../../models/sequelize.js";
import errorHandler from "../../models/errorHandler.js";
import { notificationEmitter } from "../../models/initNotificationTimer.js";


export default async function addNotifications(req, res, next) {
    try {

        if (!req.body.notifications.length) {
            return next()
        }

        const data = req.body.notifications.map( (notification)=> {
            const {time, title, body, data} = notification;
            return {
                taskId: req.body.taskId,
                time,
                notification: JSON.stringify({
                    title, body, data
                })
            }
        })

        await DeferredNotifications.bulkCreate( data, {transaction: req.transaction || null});

        

        
        notificationEmitter.emit("startNotificationsTimer");

        next();

        

    } catch(err) {
        errorHandler(req, res, err);
    }
}