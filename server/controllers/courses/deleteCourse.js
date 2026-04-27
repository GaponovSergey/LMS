
import { ValidationError, DataError } from "../../models/Errors.js";
import { Applicant, ContentFile, Course, File, Group, GroupProfile, Lesson, Task, TaskAccess, Content } from "../../models/sequelize.js";


export default async function deleteCourse(req, res, next) {
    try {

        if (!req.body.courseId) {
            throw new ValidationError("Нет id курса")
        }

        const filesToRemove = await File.findAll({
            where: {
                courseId: req.body.courseId
            },
            attributes: ["storeId"]
        });

        req.body.files = {
            toRemove: filesToRemove.map( file => file.storeId)
        };

        const course = await Course.destroy(
            {
                where: {
                    id: req.body.courseId,
                    authorId: req.session.user.id
                }
            }
        );

        if (!course) {
            throw new DataError("Курс не найден")
        }

        const checking = [
            await Lesson.findAll({raw: true}),
            await Task.findAll({raw: true}),
            await Content.findAll({raw: true}),
            await TaskAccess.findAll({raw: true}),
            await Lesson.findAll({raw: true}),
            await ContentFile.findAll({raw: true}),
            await Group.findAll({raw: true}),
            await Applicant.findAll({raw: true}),
            await GroupProfile.findAll({raw: true}),
            await File.findAll({raw: true}),
        ];

        console.log("checkingdelete")
        console.log(...checking)

        req.body.res = checking;

        if (req.body.files.toRemove.length) return next();

        

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        });
    }
}