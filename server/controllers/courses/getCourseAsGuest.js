
import { ValidationError, DataError } from "../../models/Errors.js";
import { Lesson, Content, File, Task, sequelize } from "../../models/sequelize.js";


export default async function getCourseAsGuest(course) {
    try {
        
        const lessons = await Lesson.findAll({
            where: {
                courseId: course.id
            },
            attributes: {
                include: [[sequelize.fn("COUNT", sequelize.col("tasks.id")), "tasksCount"]]
            },
            include: [{
                model: Content,
                include: File
            }, {
                model: Task,
                attributes: []
            }],
            group: ["lesson.id", "content.id", "content->files.id", "content->files->ContentFile.contentId", "content->files->ContentFile.fileId", "tasks.id"],
            order: [[ "id", "ASC"], [Task, "id", "ASC"], ]
        });

        course.lessons = lessons;

        course.for = "guest";

        console.log("getCourseAsGuest");
        console.log(course);

        

    } catch(err) {
        throw err;
    }
}