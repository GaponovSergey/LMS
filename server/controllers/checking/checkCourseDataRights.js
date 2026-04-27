
import { Course } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";



export default async function checkCourseDataRights(req, res, next) {
    try {

        if(!req.session?.user) throw new ValidationError("Пользователь не авторизован");

        const isAuthor = await Course.findOne({
            where:{
                id: req.params.courseId,
                authorId: req.session.user.id
            }
        });

        if(!isAuthor) throw new DataError("Получить данные невозможно");

       
        next();
 
    } catch(err) {
        res.status(400);
        console.log(err);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}