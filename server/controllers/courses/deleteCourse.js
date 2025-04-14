
import { ValidationError, DataError } from "../../models/Errors.js";
import { Course } from "../../models/sequelize.js";


export default async function deleteCourse(req, res) {
    try {

        if (!req.body.courseId) {
            throw new ValidationError("Нет id курса")
        }

        const course = await Course.destroy(
            {
                where: {
                    id: req.body.courseId,
                    authorId: req.body.authorId
                }
            }
        );

        if (!course) {
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