
import { ValidationError, DataError } from "../../models/Errors.js";
import { Lesson } from "../../models/sequelize.js";


export default async function deleteLesson(req, res) {
    try {

        if (!req.body.lessonId) {
            throw new ValidationError("Нет id урока")
        }

        const lesson = await Lesson.destroy(
            {
                where: {
                    id: req.body.lessonId,
                    authorId: req.body.authorId
                }
            }
        );

        if (!lesson) {
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