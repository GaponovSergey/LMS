
import { Applicant } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function deleteApplicant(req, res) {
    try {

        const courseId = req.params.courseId;
        const userId = req?.body.userId || req.session.user.id;

        console.log("deleteapplicant"); console.log(userId, courseId)
        
        await Applicant.destroy({
            where: { courseId, userId } 
        }).catch((err)=> {
            throw new DataError(`Удалить заявку не удалось: ${err.message}`)
        });

        const appliedStatus = null;

        res.status(201);
        res.json({ appliedStatus });
         
    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}