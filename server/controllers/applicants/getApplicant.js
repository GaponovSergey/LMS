
import { Applicant } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function getApplicant(req, res) {
    try {

        const courseId = req.params.courseId;
        const userId = req.session.user.id;
        
        const data = await Applicant.findOne({
            where: { courseId, userId } 
        }).catch((err)=> {
            throw new DataError(`Найти заявку не удалось: ${err.message}`)
        });

        const appliedStatus = data ? "pending" : null;

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