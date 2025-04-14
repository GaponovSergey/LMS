
import { Course } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function setCourse(req, res) {
    try {

        if (!req.body || !req.body.title || !req.body.description) {
            throw new ValidationError("Поля не заполнены");
        }

        const course = await Course.create({
            title: req.body.title,
            description: req.body.description,
            authorId: req.session.user.id
        }).catch((err)=> {
            throw new DataError(`Создать курс не удалось: ${err.message}`)
        });

        res.status(201);
        res.json(course);
 
    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}