
import { ValidationError, DataError } from "../../models/Errors.js";
import { Course, Lesson, Task } from "../../models/sequelize.js";


export default async function getNavigator(req, res) {
    try {

        if (typeof +req.query.courseId != "number") {
            throw new ValidationError("Некорректный id курса")
        }

        const course = await Course.findOne({
            where: {
                id: req.query.courseId
            }, 
            attributes: ["id", "authorId"],           
            include: {
                model: Lesson,
                attributes: ["id", "title"],
                
                include: [{
                    model: Task,
                    attributes: ["id", "lessonId", "title"]
                    
                }],
                order: [Task, "id", "ASC"]
            },
            order: [[Lesson, "id", "ASC"], ], });

        console.log("navigator");
        console.log(course.toJSON());

        if (!course) {
            throw new DataError("Курс не найден")
        }

        console.log(course);
        res.json(course);

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}