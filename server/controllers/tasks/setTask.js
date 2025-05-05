import { Task } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function setTask(req, res) {
        
    try {

        if ( !req.body.courseId) {
            throw new ValidationError("Поля не заполнены")
        }
 
        const {title = null, description = null, courseId, content = null} = req.body;
        const task = {
            title, description, content, courseId,
            authorId: req.session.user.id
        };

        await Task.create(task).catch( err => {
            throw new DataError(`Создать элемент не удалось: ${err.message}`)
        });
  
        res.sendStatus(201);

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}