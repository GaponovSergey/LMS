
import { GroupProfile } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function changeGroup(req, res) {
    try {

        if (!req.body || !req.body.oldGroupId || !req.body.newGroupId || !req.body.userId) {
            throw new ValidationError("Поля не заполнены");
        }
        console.log(req.body);
        const group = await GroupProfile.update({groupId: req.body.newGroupId},{
            where: {
                userId: req.body.userId, 
                groupId: req.body.oldGroupId
            }
        }).catch((err)=> {
            throw new DataError(`Поменять группу не удалось: ${err.message}`)
        });

        res.status(201);
        res.json(group);
 
    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}