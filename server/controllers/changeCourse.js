
import { ValidationError, DataError } from "../models/Errors.js";
import { Course } from "../models/sequelize.js";


export default async function changeCourse(req, res) {
    try {

        if (!req.body.courseId) {
            throw new ValidationError("Нет id курса")
        }

        const course = await Course.update(req.body.toChange,
            {
                where: {
                    id: req.body.courseId,
                    authorId: req.session.user.id
                }
            }
        );

        if (!course) {
            throw new DataError("Курс не найден")
        }

        res.status(201);
        res.json(await Course.findByPk(course[0]));

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}