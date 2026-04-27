
import { ValidationError, DataError } from "../../models/Errors.js";
import { Course } from "../../models/sequelize.js";


export default async function changeCourseDescription(req, res) {
    try {

        if (!req.body || !req.body.courseId || !req.body.description) {
            throw new ValidationError("Поля не заполнены");
        }

        const course = await Course.update({description: req.body.description},{
            where: {
                id: req.body.courseId
            }
        });

        console.log("changeCoursedescription");
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