import { Content, ContentFile, Lesson, Task, TaskAccess } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";

export default async function deleteContent(req, res) {
    try {

        if (!req.body.contentId) {
            throw new ValidationError("нет содержания")
        } 

        const lesson = await Lesson.findOne({where: {
            contentId: req.body.contentId
        }, raw: true})

        let tasks = await Task.findAll({where: {
            lessonId: lesson.id
        }})

        tasks = tasks.map( task => task.id);

        
        
        const result = await Content.destroy({
            where: {
                id: req.body.contentId
            }
        });
        
        if (!result) throw new DataError("контент не обнаружен");

        const accesses = await TaskAccess.findAll({where: {
            taskId: tasks
        }, raw: true})

        console.log("accesses ")
        console.log(accesses )

        res.sendStatus(200)

    } catch(err) {
        res.status(400);
        console.log(err)
        res.json({
            name: err.name,
            message: err.message
        });
    }
    
}