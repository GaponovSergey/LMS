
import { PushSubscribers } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import errorHandler from "../../models/errorHandler.js";
import webpush from "web-push"


export default async function subscribePush(req, res, next) {
    try {

        if (!req.body ) {
            throw new ValidationError("Поля не заполнены");
        }

        if (!req.body.pushSubscription) {
            return next();
        }
        console.log(req.body);

        const isSubscriberExist = await PushSubscribers.findOne({where: {id: req.session.user.account.id}});
        

        if (isSubscriberExist) {
            await PushSubscribers.update({
                subscription: JSON.stringify(req.body.pushSubscription)
            }, {
                where: {
                    id: req.session.user.account.id
                },
                transaction: req.transaction || null
            })
        } else {
            await PushSubscribers.create({
                id: req.session.user.account.id,
                subscription: JSON.stringify(req.body.pushSubscription)
            }, {
                transaction: req.transaction || null
            })
        }
        
        

        await webpush.sendNotification(req.body.pushSubscription, JSON.stringify({title: "hello world"}), {
            vapidDetails: {
            subject: "mailto:tihoe-nebo@ya.ru", 
            publicKey: process.env.VAPID_PUBLIC_KEY, 
            privateKey: process.env.VAPID_PRIVATE_KEY
        }})

        next();
 
    } catch(err) {
        errorHandler(req, res, err)
    }
}