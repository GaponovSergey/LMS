
import { ValidationError, DataError } from "../../models/Errors.js";
import { Course, Lesson, Content, File, Task, Group, TaskAccess } from "../../models/sequelize.js";


export default async function getCourseAsAuthor(course) {
    try {
        
        course.lessons = await Lesson.findAll({
            where: {
                courseId: course.id
            },
            include: [{
                model: Content,
                include: File
            }, {
                model: Task,
                include: [{
                    model: Content,
                    include: File
                }, {
                    model: TaskAccess,
                    as: "accesses"
                }]
            }],
            order: [[ "id", "ASC"], [Task, "id", "ASC"], ]
        });

        course.for = "author";

        console.log("getCourseAsAuthor");
        console.log(course);

        

    } catch(err) {
        throw err;
    }
}