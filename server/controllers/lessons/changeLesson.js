
import { ValidationError, DataError } from "../../models/Errors.js";
import { Lesson } from "../../models/sequelize.js";


export default async function changeLesson(req, res) {
    try {

        if (!req.body.lessonId) {
            throw new ValidationError("Нет id элемента")
        }

        const lesson = await Lesson.update(req.body.toChange,
            {
                where: {
                    id: req.body.lessonId,
                    authorId: req.body.authorId
                }
            }
        );

        if (!lesson) {
            throw new DataError("Элемент не найден")
        }

        res.status(201);
        res.json(await Lesson.findByPk(lesson[0]));

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}