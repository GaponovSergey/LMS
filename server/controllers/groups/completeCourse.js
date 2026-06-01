import { CompletedCourse, Course, Lesson, Answer, Task } from "../../models/sequelize.js";
import errorHandler from "../../models/errorHandler.js";





export default async function completeCourse(req, res, next) {

    try {

        const course = await Course.findOne({
            where: {
                id: req.body.courseId
            },
            include: [{
                model: Lesson
            }, {
                model: Answer,
                where: {
                    studentId: req.body.studentId
                },
                include: [{
                    model: Task
                }],
                required: false
            }]
        });

        await CompletedCourse.create({
            id: req.body.studentId,
            course: JSON.stringify(course),
            finalGrade: req.body.finalGrade
        }, {transaction: req.transaction || null});

        return next();

    } catch(err) {
        errorHandler(req, res, err);
    }
    
}