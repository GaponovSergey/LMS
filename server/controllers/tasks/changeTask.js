
import { ValidationError, DataError } from "../../models/Errors.js";
import { Task } from "../../models/sequelize.js";


export default async function changeTask(req, res) {
    try {

        if (!req.body.taskId) {
            throw new ValidationError("Нет id элемента")
        }

        const task = await Task.update(req.body.toChange,
            {
                where: {
                    id: req.body.taskId,
                    authorId: req.body.authorId
                }
            }
        );

        if (!task) {
            throw new DataError("Элемент не найден")
        }

        res.status(201);
        res.json(await Task.findByPk(task[0]));

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}