
import { Applicant, Course } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function setApplicant(req, res) {
    try {

        const courseId = req.params.courseId;

        console.log("req.session")
        console.log(req.session.user)
        const userId = req.session.user.id;

        console.log("courseId")
        console.log(courseId)
        
        await Course.findOne({
            where: {id: courseId},
            attributes: ["id"]
        }).catch((err)=> {
            throw new DataError(`Курс не найден: ${err.message}`)
        });

        const data = await Applicant.create({
            courseId, userId
        }).catch((err)=> {
            throw new DataError(`Добавить заявку не удалось: ${err.message}`)
        });

        const appliedStatus = data ? "pending" : null;

        res.status(201);
        res.json({ appliedStatus });
         
    } catch(err) {
        console.log(err)
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}