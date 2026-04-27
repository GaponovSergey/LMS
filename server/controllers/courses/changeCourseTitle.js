
import { ValidationError, DataError } from "../../models/Errors.js";
import { Course } from "../../models/sequelize.js";


export default async function changeCourseTitle(req, res) {
    try {

        if (!req.body || !req.body.courseId || !req.body.title ) {
            throw new ValidationError("Поля не заполнены");
        }

        const course = await Course.update({title: req.body.title},{
            where: {
                id: req.body.courseId
            }
        });

        console.log("changeCourseTitle");
        console.log(course);

        if (!course) {
            throw new DataError("Курс не найден")
        }

        res.sendStatus(201);

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}