
import { Applicant } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function getApplicants(req, res, next) {
    try {

        const courseId = req.params.courseId;
        
        const data = await Applicant.findAll({
            where: { courseId } 
        }).catch((err)=> {
            throw new DataError(`Найти заявку не удалось: ${err.message}`)
        });

        console.log("getApplicants")
        console.log(data)
        const result = data.map( item => item.userId)

        if (data.length) {
            req.body = req.body || {};
            req.body.users = result;
            next();
        } else {
            res.status(201);
            res.json([]);
        }
         
    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}