
import { GroupProfile } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function acceptApplicant(req, res, next) {
    try {

        const {groupId, userId} = req.body;
        
        await GroupProfile.create({
            groupId, userId  
        }).catch((err)=> {
            throw new DataError(`Найти заявку не удалось: ${err.message}`)
        });

        res.status(201);
        next();
         
    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}