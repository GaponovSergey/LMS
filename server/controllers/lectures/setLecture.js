import { Lecture } from "../../models/sequelize.js";
import { ValidationError, DataError } from "../../models/Errors.js";


export default async function setLecture(req, res) {
        
    try {

        if ( !req.body.courseId) {
            throw new ValidationError("Поля не заполнены")
        }
 
        const {title = null, description = null, courseId, partId = null, content = null} = req.body;
        const lecture = {
            title, description, content, courseId, partId,
            authorId: req.session.user.id
        };

        await Lecture.create(lecture).catch( err => {
            throw new DataError(`Создать элемент не удалось: ${err.message}`)
        });
  
        res.sendStatus(201);

    } catch(err) {
        res.status(400);
        res.json({
            name: err.name,
            message: err.message
        })
    }
}