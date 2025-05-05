
import { DataError } from "../../models/Errors.js";
import { Task } from "../../models/sequelize.js";


export default async function getTask(req, res) {
    try {

        const task = await Task.findOne({
            where: {
                id: +req.params.taskId
            }
        });

        
        if (!task) {
            throw new DataError("Элемент не найден")
        }

        res.json(task);

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}