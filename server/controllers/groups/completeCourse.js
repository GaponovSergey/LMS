import { CompletedCourse, Course, Lesson, Answer, Task } from "../../models/sequelize.js";





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
        })

        await CompletedCourse.create({
            id: req.body.studentId,
            course: JSON.stringify(course),
            finalGrade: req.body.finalGrade
        })

        return next();

    } catch(err) {
        res.status(400);
        console.log(err);
        res.json({
            name: err.name,
            message: err.message
        })
    }
    
}