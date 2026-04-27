
import { ValidationError, DataError } from "../../models/Errors.js";
import { Course } from "../../models/sequelize.js";


export default async function changeAccess(req, res) {
    try {

        const course = await Course.update({access: req.body.access},{
            where: {
                id: req.body.courseId
            }
        });

        console.log("changeAccess");
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