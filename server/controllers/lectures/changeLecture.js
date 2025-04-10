
import { ValidationError, DataError } from "../models/Errors.js";
import { Lecture } from "../models/sequelize.js";


export default async function changeLecture(req, res) {
    try {

        if (!req.body.lectureId) {
            throw new ValidationError("Нет id элемента")
        }

        const lecture = await Lecture.update(req.body.toChange,
            {
                where: {
                    id: req.body.courseId,
                    authorId: req.session.user.id
                }
            }
        );

        if (!lecture) {
            throw new DataError("Элемент не найден")
        }

        res.status(201);
        res.json(await Lecture.findByPk(lecture[0]));

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}