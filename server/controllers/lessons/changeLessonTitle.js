
import { ValidationError, DataError } from "../../models/Errors.js";
import { Lesson } from "../../models/sequelize.js";


export default async function changeLessonTitle(req, res) {
    try {

        if (!req.body.lessonId || !req.body.title) {
            throw new ValidationError("Нет id элемента")
        }

        const lesson = await Lesson.update({title: req.body.title},
            {
                where: {
                    id: req.body.lessonId,
                    courseId: req.body.courseId
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