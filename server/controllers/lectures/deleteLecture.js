
import { ValidationError, DataError } from "../../models/Errors.js";
import { Lecture } from "../../models/sequelize.js";


export default async function deleteLecture(req, res) {
    try {

        if (!req.body.lectureId) {
            throw new ValidationError("Нет id урока")
        }

        const lecture = await Lecture.destroy(
            {
                where: {
                    id: req.body.lectureId,
                    authorId: req.body.authorId
                }
            }
        );

        if (!lecture) {
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