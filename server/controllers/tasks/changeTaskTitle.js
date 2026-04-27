
import { ValidationError, DataError } from "../../models/Errors.js";
import { Task } from "../../models/sequelize.js";


export default async function changeTaskTitle(req, res) {
    try {

        if (!req.body.taskId || !req.body.lessonId || !req.body.title) {
            throw new ValidationError("Нет id элемента")
        }

        const lesson = await Task.update({title: req.body.title},
            {
                where: {
                    id: req.body.taskId,
                    lessonId: req.body.lessonId
                }
            }
        );

        if (!lesson) {
            throw new DataError("Элемент не найден")
        }

        res.sendStatus(201);

    } catch(err) {
        res.status(400);
        console.log(err)
        res.json({
            name: err.name,
            message: err.message
        });
    }
}