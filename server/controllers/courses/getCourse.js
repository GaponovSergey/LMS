
import { ValidationError, DataError } from "../../models/Errors.js";
import { Course, Lecture } from "../../models/sequelize.js";


export default async function getCourse(req, res) {
    try {

        if (typeof +req.params.courseId != "number") {
            throw new ValidationError("Некорректный id курса")
        }

        const course = await Course.findOne({
            where: {
                id: req.params.courseId
            },            
            include: {
                model: Lecture
        }});

        if (!course) {
            throw new DataError("Курс не найден")
        }

        res.json(course);

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}