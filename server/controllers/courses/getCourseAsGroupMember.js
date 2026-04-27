
import { ValidationError, DataError } from "../../models/Errors.js";
import { Course, Lesson, Content, File, Task, Group, TaskAccess, Answer } from "../../models/sequelize.js";


export default async function getCourseAsGroupMember(course, userId) {
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
                    as: "accesses",
                    where: {
                        groupId: course.group.groupId,
                        access: true 
                    }
                }, {
                    model: Answer,
                    include: {
                        model: File,
                        required: false
                    },
                    where: {
                        studentId: userId
                    },
                    required: false,
                    limit: 1
                }]
            }],
            order: [[ "id", "ASC"], [Task, "id", "ASC"], ]
        });

        course.for = "student";

        console.log("getCourseAsAuthor");
        console.log(course);

        

    } catch(err) {
        
        throw err;
    }
}