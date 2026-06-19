import { CronJob } from "cron";
import { DeferredNotifications, Group, GroupProfile, PushSubscribers, Task, TaskAccess,sequelize } from "./sequelize.js";
import { Op } from "sequelize";
import webpush from "web-push";
import {EventEmitter} from "node:events";


export const notificationEmitter = new EventEmitter();

class NotificationsTimer {

    constructor() {
        this.emitter.on("startNotificationsTimer", this.init.bind(this))
    }

    emitter = notificationEmitter;

    async init() {

        const now = new Date();
    
        const earliestNotification = await DeferredNotifications.findOne({
            attributes: ["time"],
            where: {
                time: {
                    [Op.gt]: (new Date( now.getTime() - 100000)).toISOString()
                }
            },
            order: [["time", "ASC"]]
        })

        console.log("earliestNotification================================")
        console.log(earliestNotification)

        if(!earliestNotification) return;

        this.earliestDate = new Date(earliestNotification.time);

        console.log(this.earliestDate)
        console.log( new Date())

        if(this.cronTimer) this.cronTimer.stop();

        const self = this;

        this.cronTimer = CronJob.from({
            cronTime: this.earliestDate,
            onTick: this.handler,
            timeZone: "UTC",
            start: true
        })

        console.log(this.cronTimer)

    }

    async getNotifications() {

        
        this.latestDate = new Date(this.earliestDate.getTime());

        const period = [
            this.earliestDate.toISOString(),
            this.latestDate.toISOString()
        ]

        const notificationsToSend = await DeferredNotifications.findAll({
            where: {
                time: {
                    [Op.between]: period
                }
            },
            raw: true
        })

        console.log("notificationsToSend")
        console.log(notificationsToSend)

        if(!notificationsToSend?.length) return null;

        const taskIds = notificationsToSend.map( ({taskId})=> taskId);

        const accessedGroups = await TaskAccess.findAll({
            where: {
                taskId: taskIds,
                access: true
            },
            attributes: ["taskId", "groupId"],
            raw: true
        })

        console.log("accessedGroups")
        console.log(accessedGroups)

        if(!accessedGroups?.length) return null;

        const groupIds = accessedGroups.map(({groupId})=> groupId);

        const subscribers = await GroupProfile.findAll({
            where: {
                groupId: groupIds,
                subscribed: true
            },
            attributes: ["groupId", "userId"],
            raw: true
        })

        console.log("subscribers")
        console.log(subscribers)

        if(!subscribers?.length) return null;

        const userIds = subscribers.map(({userId})=> userId)

        const subscriptions = await PushSubscribers.findAll({
            where: {
                id: userIds
            },
            attributes: ["id", "subscription"],
            raw: true
        })

        if(!subscriptions?.length) return null;

        console.log("subscriptions")
        console.log(subscriptions)

        const result = [];

        for (let notification of notificationsToSend) {
            const filteredGroups = accessedGroups.filter( group => group.taskId === notification.taskId);
            console.log("filteredGroups")
            console.log(filteredGroups)
            console.log(subscribers)
            if(!filteredGroups.length) continue;

            const filteredSubscribers = subscribers.filter( subscriber => {
                for(let group of filteredGroups) {
                    if (group.groupId == subscriber.groupId) return true;
                }
                return false;
            });

            console.log(filteredSubscribers)
            if (!filteredGroups.length) continue;

            const filteredSubscriptions = subscriptions.filter((subscription) => {
                for(let user of filteredSubscribers) {
                    if (user.userId == subscription.id) return true
                }
                return false;
            })
            console.log(filteredSubscriptions)

            if(!filteredSubscriptions.length) continue;

            result.push({
                ...notification,
                subscriptions: filteredSubscriptions
            })
        }

        return result
    }

    async handler() {

        try {
            console.log("==================handler================================")
            const notifications = await this.getNotifications();
            
            for (let item of notifications) {
                for await ( let subscription of item.subscriptions) {
                    await webpush.sendNotification(await JSON.parse(subscription.subscription), item.notification, {
                            vapidDetails: {
                            subject: "mailto:tihoe-nebo@ya.ru", 
                            publicKey: process.env.VAPID_PUBLIC_KEY, 
                            privateKey: process.env.VAPID_PRIVATE_KEY
                        }
                    })
                }    
            }

        }catch(err){
            console.log(err)
        }


    }
}

console.log("==========================NotificationsTimer============================")

const notificationsTimer = new NotificationsTimer();

