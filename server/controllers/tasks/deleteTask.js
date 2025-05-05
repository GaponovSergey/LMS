
import { ValidationError, DataError } from "../../models/Errors.js";
import { Task } from "../../models/sequelize.js";


export default async function deleteTask(req, res) {
    try {

        if (!req.body.taskId) {
            throw new ValidationError("Нет id урока")
        }

        const task = await Task.destroy(
            {
                where: {
                    id: req.body.taskId,
                    authorId: req.body.authorId
                }
            }
        );

        if (!task) {
            throw new DataError("Курс не найден")
        }

        res.sendStatus(200);

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}