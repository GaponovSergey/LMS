
import { DataError } from "../../models/Errors.js";
import { Lesson } from "../../models/sequelize.js";


export default async function getLesson(req, res) {
    try {

        const lesson = await Lesson.findOne({
            where: {
                id: +req.params.lessonId
            }
        });

        
        if (!lesson) {
            throw new DataError("Элемент не найден")
        }

        res.json(lesson);

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}