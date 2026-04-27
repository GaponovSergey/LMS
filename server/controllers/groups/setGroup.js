
import { Group, TaskAccess } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function setGroup(req, res) {
    try {

        if (!req.body || !req.body.groupName || !req.body.courseId || !req.body.accesses) {
            throw new ValidationError("Поля не заполнены");
        }
        console.log(req.body);
        const group = await Group.create({
            groupName: req.body.groupName,
            courseId: req.body.courseId,
        }).catch((err)=> {
            throw new DataError(`Создать группу не удалось: ${err.message}`)
        });

        const taskAccesses = req.body.accesses.map( task => {
            task.groupId = group.id;
            return task;
        })

        await TaskAccess.bulkCreate(taskAccesses);

        res.sendStatus(201);
 
    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}