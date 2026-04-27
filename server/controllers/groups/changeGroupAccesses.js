
import { TaskAccess } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function changeGroupAccesses(req, res) {
    try {

        if (!req.body || !req.body.accesses) {
            throw new ValidationError("Поля не заполнены");
        }
        console.log(req.body);

        const {accesses} = req.body;

        for await (let group of accesses) {
            await TaskAccess.update({access: group.access}, {
                where: {
                    groupId: group.groupId,
                    taskId: group.taskId
                }
            })
        }
        
        res.sendStatus(201);
 
    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}