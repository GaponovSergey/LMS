import { Profile, Group, GroupProfile, File, Answer } from "../../models/sequelize.js";
import { ValidationError } from "../../models/Errors.js";
import errorHandler from "../../models/errorHandler.js";


export default async function deleteStudent(req, res, next) {

    try {

        if (!req.body.studentId) throw new ValidationError("Не указан ученик");

        const student = await Profile.findOne({
            attributes: ["id"],
            where: {
                id: req.body.studentId
            },
            include: [{
                model: Group,
                where: {
                    courseId: req.body.courseId
                },
                required: true
            }]
        })

        if (!student) throw new ValidationError("Неверные данные");

        const fileIds = await File.findAll({
            attributes: ["storeId"],
            where: {
                courseId: req.body.courseId,
                authorId: req.body.studentId
            }
        })

        await File.destroy({
            where: {
                courseId: req.body.courseId,
                authorId: req.body.studentId
            },
            transaction: req.transaction || null})

        console.log(fileIds)

        req.body.files = {
            toRemove: fileIds.map( file => file.storeId)
        }

        
        await Answer.destroy({
                where: {
                    studentId: req.body.studentId, 
                    courseId: req.body.courseId
                },
                transaction: req.transaction || null})
        

        await GroupProfile.destroy({
            where: {
                userId: req.body.studentId
            },
            transaction: req.transaction || null})

        return next();

    } catch(err) {
        errorHandler(req, res, err);
    }
    
}