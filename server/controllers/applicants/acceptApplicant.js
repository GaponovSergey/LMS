
import { GroupProfile } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import errorHandler from "../../models/errorHandler.js";


export default async function acceptApplicant(req, res, next) {
    try {

        const {groupId, userId} = req.body;
        
        await GroupProfile.create({
            groupId, userId  
        }, {
            transaction: req.transaction || null
        }).catch((err)=> {
            throw new DataError(`Найти заявку не удалось: ${err.message}`)
        });

        res.status(201);
        next();
         
    } catch(err) {
        errorHandler(req, res, err)
    }
}