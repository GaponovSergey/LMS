
import { Group, TaskAccess } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import errorHandler from "../../models/errorHandler.js";


export default async function setGroup(req, res, next) {
    try {

        if (!req.body || !req.body.groupName || !req.body.courseId || !req.body.accesses) {
            throw new ValidationError("Поля не заполнены");
        }
        console.log(req.body);

        const group = await Group.create({
            groupName: req.body.groupName,
            courseId: req.body.courseId,
        }, {transaction: req.transaction || null}).catch((err)=> {
            throw new DataError(`Создать группу не удалось: ${err.message}`)
        });

        const taskAccesses = req.body.accesses.map( task => {
            task.groupId = group.id;
            return task;
        })

        await TaskAccess.bulkCreate(taskAccesses, {transaction: req.transaction || null});

        next()
 
    } catch(err) {
        errorHandler(req, res, err)
    }
}