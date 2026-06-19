
import { GroupProfile } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import errorHandler from "../../models/errorHandler.js";


export default async function subscribeCourse(req, res, next) {
    try {

        if (!req.body.groupId) {
            return next();
        }

        console.log(req.body);
        
        await GroupProfile.update({subscribed: req.body.subscribed || true}, {
            where: {
                userId: req.session.user.account.id,
                groupId: req.body.groupId
            },
            transaction: req.transaction || null
        })

        next()
 
    } catch(err) {
        errorHandler(req, res, err)
    }
}