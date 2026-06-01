
import { Applicant } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";
import errorHandler from "../../models/errorHandler.js";


export default async function deleteApplicant(req, res) {
    try {

        const courseId = req.params.courseId;
        const userId = req?.body.userId || req.session.user.account.id;

        console.log("deleteapplicant"); console.log(userId, courseId)
        
        await Applicant.destroy({
            where: { courseId, userId },
            transaction: req.transaction || null 
        }).catch((err)=> {
            throw new DataError(`Удалить заявку не удалось: ${err.message}`)
        });

        const appliedStatus = null;

        if (req.transaction) req.transaction.commit();

        res.status(201);
        res.json({ appliedStatus });
         
    } catch(err) {
        errorHandler(req, res, err);
    }
}