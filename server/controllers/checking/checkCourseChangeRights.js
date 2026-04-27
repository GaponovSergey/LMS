import { SessionError, ValidationError } from "../../models/Errors.js";
import { Course} from "../../models/sequelize.js";
import argon2 from "argon2";


export default async function checkCourseChangeRights(req, res, next) {
        try {

            console.log("authorid")
            console.log(req.body)
            if (!req.body.courseId) {
                throw new ValidationError("Нет данных")
            }
            
            if (!req.session.user) {
                throw new SessionError("Пользователь не авторизован");
            }
            if (req.session.user.access === 2 ) {
                const course = await Course.findOne({where: {
                    id: req.body.courseId,
                    authorId: req.session.user.id
                }}).catch((err => {throw new SessionError("Пользователь не имеет прав доступа к данному курсу")}));

                if (!course) throw new SessionError("Пользователь не имеет прав доступа к данному курсу")
            }
            if (req.session.user.access < 3 ) {
                throw new SessionError("Пользователь не имеет прав доступа");
            }

            next();

        } catch(err) {
            const {name, message} = err;
            console.log(err)
            res.status(401);
            res.json({
                name, message
            })
        }
}
